import type { NextConfig } from "next";

const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
];

const previewHeaders = indexable
  ? []
  : [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive, nosnippet",
      },
    ];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",

        hostname: "cdn.sanity.io",

        pathname: "/images/**",
      },
    ],

    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, ...previewHeaders],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/gallery/generated/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/health",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
