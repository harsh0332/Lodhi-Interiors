import { cp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const build = path.join(root, '.next');
const browserAssets = path.join(build, 'static');
const publicAssets = path.join(root, 'public', 'site-assets');

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(name));
    else if (entry.isFile()) files.push(name);
    else throw new Error(`Unexpected non-file browser asset: ${name}`);
  }
  return files;
}

const files = await filesIn(browserAssets);
if (!files.some((file) => file.endsWith('.js')) || !files.some((file) => file.endsWith('.css'))) {
  throw new Error('Production JS/CSS is missing; refusing to publish incomplete assets.');
}
for (const file of files) {
  if ((await stat(file)).size === 0) throw new Error(`Empty browser asset: ${file}`);
}

// Copy only .next/static, never server code, manifests or environment files.
await rm(publicAssets, { recursive: true, force: true });
const publicTarget = path.join(publicAssets, '_next', 'static');
await mkdir(path.dirname(publicTarget), { recursive: true });
await cp(browserAssets, publicTarget, { recursive: true });

// A standalone server does not include these directories by default.
// Include both for hosts that publish the standalone directory as the app root.
const standalone = path.join(build, 'standalone');
await stat(path.join(standalone, 'server.js'));
await cp(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true });
await cp(browserAssets, path.join(standalone, '.next', 'static'), { recursive: true });

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
for (const file of files) {
  const relative = path.relative(browserAssets, file);
  const expected = hash(await readFile(file));
  for (const target of [
    path.join(publicTarget, relative),
    path.join(standalone, 'public', 'site-assets', '_next', 'static', relative),
    path.join(standalone, '.next', 'static', relative),
  ]) {
    if (hash(await readFile(target)) !== expected) throw new Error(`Asset copy mismatch: ${target}`);
  }
}
console.log(`Packaged and verified ${files.length} browser assets for public and standalone hosting.`);
