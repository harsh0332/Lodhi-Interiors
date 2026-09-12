import fs from 'fs';
import path from 'path';
import { getAllServices } from '../lib/services';
import { getAllProjects, getAllInsights } from '../lib/content';
import { getAllLocalities } from '../lib/locations';
import { formatMetaDescription } from '../lib/seo';

interface RouteMetadata {
  route: string;
  title: string;
  description: string;
  canonical: string;
}

async function runSeoAudit() {
  console.log('\n🔍 [SEO Gate] Running Lodhi Interiors Technical SEO Audit...\n');

  const routesToCheck: RouteMetadata[] = [];

  // 1. Static Core Pages
  routesToCheck.push({
    route: '/',
    title: 'Lodhi Interiors — Interior Design and Turnkey Execution Studio in Bhopal',
    description: formatMetaDescription(
      'Bhopal studio shaping complete luxury residential and commercial interiors from concept to turnkey execution. Founded by Soumya Lodhi, 8+ years in practice.',
    ),
    canonical: 'https://lodhiinteriors.com',
  });

  routesToCheck.push({
    route: '/services',
    title: 'Interior Design & Turnkey Services in Bhopal | Lodhi Interiors',
    description: formatMetaDescription(
      'Comprehensive interior design and turnkey execution services in Bhopal. Residential villas, modular kitchens, corporate offices, and hospitality environments.',
    ),
    canonical: 'https://lodhiinteriors.com/services',
  });

  routesToCheck.push({
    route: '/work',
    title: 'Our work — interior design projects in Bhopal | Lodhi Interiors',
    description: formatMetaDescription(
      'Portfolio of residential, luxury villa, kitchen, and commercial interior design and turnkey execution projects across Bhopal by Lodhi Interiors.',
    ),
    canonical: 'https://lodhiinteriors.com/work',
  });

  routesToCheck.push({
    route: '/studio',
    title: 'The studio — Soumya Lodhi, interior designer in Bhopal | Lodhi Interiors',
    description: formatMetaDescription(
      'Founded by Soumya Lodhi with 8+ years of practice in Bhopal. Lodhi Interiors unites architectural interior design with single-source turnkey site execution.',
    ),
    canonical: 'https://lodhiinteriors.com/studio',
  });

  routesToCheck.push({
    route: '/process',
    title: 'Our process — how an interior project runs | Lodhi Interiors',
    description: formatMetaDescription(
      'A transparent six-stage turnkey design journey from site visit to handover. Understand realistic timelines, client inputs, and execution standards in Bhopal.',
    ),
    canonical: 'https://lodhiinteriors.com/process',
  });

  routesToCheck.push({
    route: '/contact',
    title: 'Contact — start your interior project in Bhopal | Lodhi Interiors',
    description: formatMetaDescription(
      'Start your interior design or turnkey project in Bhopal with Lodhi Interiors. Connect directly with founder Soumya Lodhi via WhatsApp, phone, or inquiry form.',
    ),
    canonical: 'https://lodhiinteriors.com/contact',
  });

  routesToCheck.push({
    route: '/insights',
    title: 'Editorial Insights & Technical Essays | Lodhi Interiors Bhopal',
    description: formatMetaDescription(
      'Essays on architectural materiality, climatic performance, and single-source turnkey execution in Bhopal and Central India by Soumya Lodhi.',
    ),
    canonical: 'https://lodhiinteriors.com/insights',
  });

  routesToCheck.push({
    route: '/locations',
    title: 'Interior Design Practice Localities in Bhopal | Lodhi Interiors',
    description: formatMetaDescription(
      'Documented interior design and turnkey execution across Bhopal prime residential enclaves: Arera Colony, Shahpura, Koh-e-Fiza, Chuna Bhatti, and MP Nagar.',
    ),
    canonical: 'https://lodhiinteriors.com/locations',
  });

  // 2. Services (8)
  const services = getAllServices();
  for (const svc of services) {
    routesToCheck.push({
      route: `/services/${svc.slug}`,
      title: svc.metaTitle,
      description: formatMetaDescription(svc.metaDescription),
      canonical: `https://lodhiinteriors.com/services/${svc.slug}`,
    });
  }

  // 3. Projects (8)
  const projects = await getAllProjects();
  for (const p of projects) {
    const cleanType = p.frontmatter.projectType.replace(/-/g, ' ');
    const capitalizedType = cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
    const title = `${p.frontmatter.title} — ${capitalizedType} interior in ${p.frontmatter.locality}, Bhopal | Lodhi Interiors`;

    routesToCheck.push({
      route: `/work/${p.frontmatter.slug}`,
      title,
      description: formatMetaDescription(p.frontmatter.brief),
      canonical: `https://lodhiinteriors.com/work/${p.frontmatter.slug}`,
    });
  }

  // 4. Insights (2)
  const insights = await getAllInsights();
  for (const ins of insights) {
    const rawTitle = `${ins.frontmatter.title} | Lodhi Interiors`;
    const title = rawTitle.length > 60 ? `${rawTitle.slice(0, 57)}...` : rawTitle;

    routesToCheck.push({
      route: `/insights/${ins.frontmatter.slug}`,
      title,
      description: formatMetaDescription(ins.frontmatter.description),
      canonical: `https://lodhiinteriors.com/insights/${ins.frontmatter.slug}`,
    });
  }

  // 5. Localities (6)
  const localities = getAllLocalities();
  for (const loc of localities) {
    routesToCheck.push({
      route: `/locations/${loc.slug}`,
      title: loc.metaTitle,
      description: formatMetaDescription(loc.metaDescription),
      canonical: `https://lodhiinteriors.com/locations/${loc.slug}`,
    });
  }

  console.log(`Auditing ${routesToCheck.length} indexable routes...\n`);

  let errors = 0;
  const seenTitles = new Map<string, string>();

  console.log(
    '---------------------------------------------------------------------------------------------------------',
  );
  console.log(
    `Route`.padEnd(35) +
      `Title Len`.padEnd(12) +
      `Desc Len`.padEnd(12) +
      `Unique?`.padEnd(10) +
      `Canonical`,
  );
  console.log(
    '---------------------------------------------------------------------------------------------------------',
  );

  for (const item of routesToCheck) {
    let hasItemError = false;

    // 1. Missing title check
    if (!item.title || item.title.trim().length === 0) {
      console.error(`❌ [Missing Title] ${item.route}`);
      errors++;
      hasItemError = true;
    }

    // 2. Duplicate title check
    if (seenTitles.has(item.title)) {
      console.error(
        `❌ [Duplicate Title] "${item.title}" found on ${item.route} and ${seenTitles.get(item.title)}`,
      );
      errors++;
      hasItemError = true;
    } else {
      seenTitles.set(item.title, item.route);
    }

    // 3. Description checks (140 to 160 characters)
    const descLen = item.description ? item.description.length : 0;
    if (!item.description || descLen === 0) {
      console.error(`❌ [Missing Description] ${item.route}`);
      errors++;
      hasItemError = true;
    } else if (descLen < 140 || descLen > 160) {
      console.error(
        `❌ [Invalid Description Length] ${item.route}: ${descLen} chars (Must be between 140 and 160)`,
      );
      errors++;
      hasItemError = true;
    }

    // 4. Absolute canonical check
    if (!item.canonical.startsWith('https://')) {
      console.error(
        `❌ [Invalid Canonical] ${item.route}: ${item.canonical} must be absolute https URL`,
      );
      errors++;
      hasItemError = true;
    }

    if (!hasItemError) {
      console.log(
        `${item.route.padEnd(35)}` +
          `${item.title.length.toString().padEnd(12)}` +
          `${descLen.toString().padEnd(12)}` +
          `✅ YES`.padEnd(10) +
          `${item.canonical}`,
      );
    }
  }

  console.log(
    '---------------------------------------------------------------------------------------------------------\n',
  );

  // Check Sitemap & Robots existence
  const sitemapExists = fs.existsSync(path.join(process.cwd(), 'app', 'sitemap.ts'));
  const robotsExists = fs.existsSync(path.join(process.cwd(), 'app', 'robots.ts'));

  if (!sitemapExists) {
    console.error('❌ [Missing File] app/sitemap.ts does not exist');
    errors++;
  } else {
    console.log('✅ app/sitemap.ts dynamic generator verified.');
  }

  if (!robotsExists) {
    console.error('❌ [Missing File] app/robots.ts does not exist');
    errors++;
  } else {
    console.log('✅ app/robots.ts crawler policy verified.');
  }

  if (errors > 0) {
    console.error(`\n🚨 SEO Audit FAILED with ${errors} issue(s). Build halted.\n`);
    process.exit(1);
  }

  console.log(
    `\n✨ All ${routesToCheck.length} routes passed technical SEO validation with zero errors!\n`,
  );
}

runSeoAudit().catch((err) => {
  console.error('Fatal error during SEO audit:', err);
  process.exit(1);
});
