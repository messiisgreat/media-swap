import type { Metadata } from "next";

export type SEOProps = Record<
  "title" | "description" | "url" | "imageUrl",
  string
>;

/**
 * OGP生成
 * @param Info OGP生成に必要な情報
 * @returns OGP情報
 */
export default function SeoComponent(Info: SEOProps): Metadata {
  const { title, description, url, imageUrl } = Info;
  const metadata: Metadata = {
    title: title,
    description: description,
    icons: "/favicon.ico",
    keywords: ["UtakataKyosui", "泡沫京水", "Portfolio", "ポートフォリオ"],
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: title,
      images: {
        url: imageUrl,
        width: 1200,
        height: 600,
      },
    },
  };
  return metadata;
}
