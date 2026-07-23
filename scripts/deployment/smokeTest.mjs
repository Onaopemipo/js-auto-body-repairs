const baseUrl = (
  process.argv[2] || "https://delightful-fuchsia-horse.jsautobodyrepairs.com.au"
).replace(/\/$/, "");

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

const failures = [];

for (const route of routes) {
  const url = `${baseUrl}${route}`;

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "JS-Auto-Body-Smoke-Test/1.0",
      },
    });

    console.log(`${response.status} ${route}`);

    if (!response.ok) {
      failures.push(`${route} returned ${response.status}`);
    }

    if (route === "/api/health") {
      const body = await response.json();

      if (body.ok !== true) {
        failures.push("Health response did not contain ok=true.");
      }
    }
  } catch (error) {
    failures.push(
      `${route}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (failures.length) {
  console.error("\nDeployment smoke test failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(`\nDeployment smoke test passed for ${routes.length} routes.`);
