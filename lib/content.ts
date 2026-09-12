import fs from 'fs';
import path from 'path';

export type ProjectType =
  | 'residential'
  | 'luxury-home'
  | 'modular-kitchen'
  | 'office'
  | 'retail'
  | 'hospitality'
  | 'commercial';

export type ProjectScope = 'design' | 'turnkey' | 'execution';

export type ImageOrientation = 'portrait' | 'landscape' | 'square';

export interface Testimonial {
  quote: string;
  name: string;
  locality: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  orientation: ImageOrientation;
  caption?: string;
}

export interface MaterialItem {
  name: string;
  category?: string;
  image: string;
  alt: string;
}

export interface SpatialImage {
  src: string;
  alt: string;
  caption?: string;
  orientation?: ImageOrientation;
}

export interface ChallengeDecision {
  constraint: string;
  resolution: string;
}

export interface ExecutionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BeforeAfterItem {
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel?: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel?: string;
  note?: string;
}

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  locality: string;
  city: string;
  projectType: ProjectType;
  scope: ProjectScope;
  areaSqft: number;
  year: number;
  brief: string;
  concept: string;
  materials: string[];
  materialProse?: string;
  materialsDetail?: MaterialItem[];
  spatialNarrative?: string;
  spatialImages?: SpatialImage[];
  challenges: string[];
  challengesDecisions?: ChallengeDecision[];
  executionNote?: string;
  executionImages?: ExecutionImage[];
  beforeAfter?: BeforeAfterItem[];
  outcome: string;
  testimonial?: Testimonial;
  heroImage: string;
  gallery: GalleryItem[];
  featured: boolean;
  publishedAt: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InsightFrontmatter {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage: string;
  faq?: FAQItem[];
}

export interface Insight {
  frontmatter: InsightFrontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const INSIGHTS_DIR = path.join(CONTENT_DIR, 'insights');

/**
 * Lightweight, zero-dependency YAML frontmatter parser for MDX files.
 */
export function parseFrontmatter<T>(fileContent: string): { frontmatter: T; content: string } {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match || !match[1]) {
    return {
      frontmatter: {} as T,
      content: fileContent.trim(),
    };
  }

  const rawYaml = match[1];
  const content = fileContent.slice(match[0].length).trim();
  const parsed = parseYamlString(rawYaml) as unknown as T;

  return { frontmatter: parsed, content };
}

function parseYamlValue(val: string): unknown {
  const trimmed = val.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  // Unquote string if wrapped in quotes
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseYamlString(yamlText: string): Record<string, unknown> {
  const lines = yamlText.split(/\r?\n/);
  const root: Record<string, unknown> = {};

  let currentKey = '';
  let currentList: unknown[] | null = null;
  let currentSubObject: Record<string, unknown> | null = null;
  let currentListObject: Record<string, unknown> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine || rawLine.trim().startsWith('#') || rawLine.trim() === '') {
      continue;
    }

    const indent = rawLine.search(/\S|$/);
    const line = rawLine.trim();

    // Top-level key: value or top-level key:
    if (indent === 0) {
      currentList = null;
      currentSubObject = null;
      currentListObject = null;

      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const rest = line.slice(colonIdx + 1).trim();

        currentKey = key;
        if (rest === '') {
          // Could be starting an array or sub-object
          root[key] = null;
        } else {
          root[key] = parseYamlValue(rest);
        }
      }
      continue;
    }

    // Indented lines (children of currentKey)
    if (line.startsWith('- ')) {
      // It's a list item
      if (!Array.isArray(root[currentKey])) {
        currentList = [];
        root[currentKey] = currentList;
      }

      const itemContent = line.slice(2).trim();
      const itemColon = itemContent.indexOf(':');

      if (itemColon !== -1) {
        // List of objects
        const objKey = itemContent.slice(0, itemColon).trim();
        const objVal = parseYamlValue(itemContent.slice(itemColon + 1).trim());
        currentListObject = { [objKey]: objVal };
        currentList!.push(currentListObject);
      } else {
        // Scalar list
        currentListObject = null;
        currentList!.push(parseYamlValue(itemContent));
      }
      continue;
    }

    // Indented key: value pair (could belong to currentListObject or currentSubObject)
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const subKey = line.slice(0, colonIdx).trim();
      const subVal = parseYamlValue(line.slice(colonIdx + 1).trim());

      if (currentListObject) {
        currentListObject[subKey] = subVal;
      } else {
        if (
          !currentSubObject ||
          typeof root[currentKey] !== 'object' ||
          root[currentKey] === null
        ) {
          currentSubObject = {};
          root[currentKey] = currentSubObject;
        }
        currentSubObject[subKey] = subVal;
      }
    }
  }

  return root;
}

function getMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  try {
    return fs.readdirSync(dirPath).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
  } catch {
    return [];
  }
}

/**
 * Loads all projects sorted by published date descending.
 */
export async function getAllProjects(): Promise<Project[]> {
  const files = getMdxFiles(PROJECTS_DIR);
  const projects: Project[] = [];

  for (const filename of files) {
    const filePath = path.join(PROJECTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter<ProjectFrontmatter>(fileContent);
    const slug = frontmatter.slug || filename.replace(/\.mdx?$/, '');
    projects.push({
      frontmatter: {
        ...frontmatter,
        slug,
      },
      content,
    });
  }

  return projects.sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
    const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
    return dateB - dateA;
  });
}

/**
 * Loads a single project by its slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.frontmatter.slug === slug) ?? null;
}

/**
 * Loads only featured projects.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => Boolean(project.frontmatter.featured));
}

/**
 * Loads projects filtered by their ProjectType.
 */
export async function getProjectsByType(type: ProjectType): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.frontmatter.projectType === type);
}

/**
 * Loads all insights sorted by published date descending.
 */
export async function getAllInsights(): Promise<Insight[]> {
  const files = getMdxFiles(INSIGHTS_DIR);
  const insights: Insight[] = [];

  for (const filename of files) {
    const filePath = path.join(INSIGHTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter<InsightFrontmatter>(fileContent);
    const slug = frontmatter.slug || filename.replace(/\.mdx?$/, '');
    insights.push({
      frontmatter: {
        ...frontmatter,
        slug,
      },
      content,
    });
  }

  return insights.sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
    const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
    return dateB - dateA;
  });
}

/**
 * Loads a single insight by its slug.
 */
export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const insights = await getAllInsights();
  return insights.find((insight) => insight.frontmatter.slug === slug) ?? null;
}
