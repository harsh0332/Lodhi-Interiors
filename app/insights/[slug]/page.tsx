import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllInsights, getInsightBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildArticleSchema } from '@/lib/schema';
import { Photo, TextLink } from '@/components/editorial/Elements';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
interface Props {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return (await getAllInsights()).map((i) => ({ slug: i.frontmatter.slug }));
}
export async function generateMetadata({ params }: Props) {
  const i = await getInsightBySlug((await params).slug);
  return i
    ? buildMetadata({
        title: `${i.frontmatter.title} | Lodhi Interiors`,
        description: i.frontmatter.description,
        path: `/insights/${i.frontmatter.slug}`,
        ogImage: i.frontmatter.heroImage,
        ogType: 'article',
      })
    : {};
}
export default async function ArticlePage({ params }: Props) {
  const insight = await getInsightBySlug((await params).slug);
  if (!insight) notFound();
  const p = insight.frontmatter;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(insight)) }}
      />
      <header className="article-header wrap">
        <Link className="eyebrow" href="/insights">
          ← The journal · {p.category}
        </Link>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
        <span className="eyebrow">
          Lodhi Interiors ·{' '}
          {new Date(p.publishedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </header>
      <Photo src={p.heroImage} alt={p.title} priority className="project-cover" sizes="100vw" />
      <article className="article-body">
        {insight.content
          .split('\n\n')
          .map((part, i) =>
            part.startsWith('# ') ? null : part.startsWith('## ') ? (
              <h2 key={i}>{part.slice(3)}</h2>
            ) : (
              <p key={i}>{part}</p>
            ),
          )}
        <TextLink href="/contact">Talk to us about your space</TextLink>
      </article>
      <ClosingCTA />
    </>
  );
}
