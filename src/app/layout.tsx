import type { Metadata } from 'next';
import './globals.css';
import { getConfig } from '@/lib/config';
export function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    metadataBase: new URL('https://sxy1499894281.github.io'),
    title: config.site.title,
    description: config.site.description,
    authors: [{ name: config.author.name }],
    alternates: { canonical: '/' },
    icons: { icon: '/assets/avatar.webp' },
    openGraph: { title: config.site.title, description: config.site.description, type: 'website', images: ['/assets/avatar.webp'] },
  };
}
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a>{children}</body></html>;
}
