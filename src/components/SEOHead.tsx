import { Helmet } from "react-helmet-async";
import {
  type SEOProps,
  buildMeta,
  SITE_NAME,
  SITE_ALTERNATE_NAMES,
  SITE_LEGAL_NAME,
  TWITTER_HANDLE,
  SITE_LANG,
  SITE_REGION,
} from "@/lib/seo";

export function SEOHead(props: SEOProps) {
  const meta = buildMeta(props);

  const robots = [
    meta.noindex ? "noindex" : "index",
    meta.nofollow ? "nofollow" : "follow",
    "max-snippet:-1",
    "max-image-preview:large",
    "max-video-preview:-1",
  ].join(", ");

  return (
    <Helmet>
      <html lang={SITE_LANG} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={meta.canonical} />

      {meta.keywords && <meta name="keywords" content={meta.keywords.join(", ")} />}

      {/* Brand association meta */}
      <meta name="application-name" content={SITE_NAME} />
      <meta name="author" content={`${SITE_NAME}, ${SITE_LEGAL_NAME}`} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      {/* Geo / Local SEO */}
      <meta name="geo.region" content={`${SITE_REGION}`} />
      <meta name="geo.placename" content="Kigali" />
      <meta name="geo.position" content="-1.9441;30.0619" />
      <meta name="ICBM" content="-1.9441, 30.0619" />

      <meta name="theme-color" content={meta.themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <meta property="og:locale" content={meta.locale} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:image:alt" content={meta.ogImageAlt} />
      {meta.ogImageWidth && <meta property="og:image:width" content={String(meta.ogImageWidth)} />}
      {meta.ogImageHeight && (
        <meta property="og:image:height" content={String(meta.ogImageHeight)} />
      )}
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:type" content={meta.ogType} />

      {meta.publishedTime && (
        <meta property="article:published_time" content={meta.publishedTime} />
      )}
      {meta.modifiedTime && <meta property="article:modified_time" content={meta.modifiedTime} />}

      {/* Facebook / OpenGraph additional */}
      <meta property="og:see_also" content="https://x.com/IConnlab" />
      <meta property="og:see_also" content="https://www.linkedin.com/in/ishconnlab" />
      <meta property="og:see_also" content="https://github.com/ishconnlab" />
      <meta property="og:see_also" content="https://www.instagram.com/ish.connect" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.ogDescription} />
      <meta name="twitter:image" content={meta.ogImage} />
      <meta name="twitter:image:alt" content={meta.ogImageAlt} />
      <meta
        name="twitter:domain"
        content={(() => {
          try {
            return new URL(meta.canonical).hostname;
          } catch {
            return "ishconnect.rw";
          }
        })()}
      />

      {/* Hreflang */}
      <link rel="alternate" href={meta.canonical} hrefLang={SITE_LANG} />
      <link rel="alternate" href={meta.canonical} hrefLang="x-default" />

      {/* JSON-LD brand alternates for Google */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Brand",
          "@id": "${meta.canonical}#brand",
          "name": "${SITE_NAME}",
          "alternateName": ${JSON.stringify(SITE_ALTERNATE_NAMES)},
          "url": "${meta.canonical}"
        }
      `}</script>
    </Helmet>
  );
}
