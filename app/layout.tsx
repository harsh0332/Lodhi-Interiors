import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Website Unavailable',
  description: 'This website has been temporarily taken offline.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Fallback if the host does not run Next middleware.
// Revert this layout together with middleware.ts to restore the site.
export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <h1>Website Unavailable</h1>
        <p>This website has been temporarily taken offline.</p>
      </body>
    </html>
  );
}
