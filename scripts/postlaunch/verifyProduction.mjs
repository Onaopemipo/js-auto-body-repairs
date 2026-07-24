const baseUrl = (
  process.env.POST_LAUNCH_BASE_URL ?? "https://jsautobodyrepairs.com.au"
).replace(/\/+$/, "");

const routes = [
  "/",
  "/about",
  "/services",
  "/gallery",
  "/testimonials",
  "/contact",
  "/request-estimate",
  "/privacy",
  "/terms",
  "/cookies",
  "/robots.txt",
  "/sitemap.xml",
  "/api/health",
];

const contentRoutes = ["/", "/gallery", "/testimonials", "/contact"];

const forbiddenProductionPhrases = [
  "these placeholders define",
  "temporary testimonial placeholders",
  "workshop address pending",
  "opening hours pending",
  "google maps placeholder",
  "will be added once",
];

const failures = [];
const results = [];

async function request(pathname, options = {}) {
  const url = `${baseUrl}${pathname}`;

  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    ...options,
  });

  return {
    url,
    response,
    text: await response.text(),
  };
}

for (const route of routes) {
  try {
    const { response, text } = await request(route);

    const contentType = response.headers.get("content-type") ?? "";

    results.push({
      route,
      status: response.status,
      contentType,
    });

    if (!response.ok) {
      failures.push(`${route} returned HTTP ${response.status}.`);
    }

    if (route === "/api/health") {
      try {
        const health = JSON.parse(text);

        if (health.ok !== true) {
          failures.push("/api/health did not return ok: true.");
        }

        if (health.environment !== "production") {
          failures.push(
            `/api/health reported environment ${JSON.stringify(
              health.environment,
            )}.`,
          );
        }
      } catch {
        failures.push("/api/health did not return valid JSON.");
      }
    }

    if (route.endsWith(".xml") && !contentType.includes("xml")) {
      failures.push(`${route} did not return an XML content type.`);
    }

    if (route.endsWith(".txt") && !contentType.includes("text/plain")) {
      failures.push(`${route} did not return text/plain.`);
    }
  } catch (error) {
    failures.push(
      `${route} request failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

try {
  const response = await fetch(baseUrl.replace(/^https:/, "http:"), {
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
  });

  if (![301, 302, 307, 308].includes(response.status)) {
    failures.push(
      `HTTP did not redirect to HTTPS; received ${response.status}.`,
    );
  }
} catch (error) {
  failures.push(
    `HTTP redirect check failed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
}

try {
  const { response, text } = await request("/");

  const robotsHeader = response.headers.get("x-robots-tag");

  if (robotsHeader?.toLowerCase().includes("noindex")) {
    failures.push(`Production homepage sends X-Robots-Tag: ${robotsHeader}.`);
  }

  if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(text)) {
    failures.push("Production homepage contains a noindex robots meta tag.");
  }

  if (!/<title>[^<]+<\/title>/i.test(text)) {
    failures.push("Production homepage has no HTML title.");
  }
} catch (error) {
  failures.push(
    `Homepage metadata check failed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
}

for (const route of contentRoutes) {
  try {
    const { text } = await request(route);

    const normalised = text.toLowerCase();

    for (const phrase of forbiddenProductionPhrases) {
      if (normalised.includes(phrase)) {
        failures.push(
          `${route} exposes production placeholder text: "${phrase}".`,
        );
      }
    }
  } catch (error) {
    failures.push(
      `${route} content audit failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

try {
  const { text: robots } = await request("/robots.txt");

  if (/disallow:\s*\/\s*$/im.test(robots)) {
    failures.push("robots.txt blocks the entire production website.");
  }

  if (!robots.includes(`${baseUrl}/sitemap.xml`)) {
    failures.push("robots.txt does not reference the production sitemap.");
  }
} catch (error) {
  failures.push(
    `robots.txt validation failed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
}

try {
  const { text: sitemap } = await request("/sitemap.xml");

  const requiredUrls = [
    `${baseUrl}/`,
    `${baseUrl}/services`,
    `${baseUrl}/gallery`,
    `${baseUrl}/contact`,
    `${baseUrl}/request-estimate`,
  ];

  for (const url of requiredUrls) {
    if (!sitemap.includes(url)) {
      failures.push(`Sitemap is missing ${url}.`);
    }
  }
} catch (error) {
  failures.push(
    `Sitemap validation failed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
}

console.log("\nProduction route results:\n");

for (const result of results) {
  console.log(
    `${result.route.padEnd(24)} ${String(result.status).padEnd(
      4,
    )} ${result.contentType}`,
  );
}

if (failures.length > 0) {
  console.error("\nPost-launch production verification failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("\nPost-launch production verification passed.");
