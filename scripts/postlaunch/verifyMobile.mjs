import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";

const baseUrl = (
  process.env.POST_LAUNCH_BASE_URL ?? "https://jsautobodyrepairs.com.au"
).replace(/\/+$/, "");

const outputDirectory = path.resolve(".post-launch-artifacts/mobile");

fs.rmSync(outputDirectory, {
  recursive: true,
  force: true,
});

fs.mkdirSync(outputDirectory, {
  recursive: true,
});

const deviceProfiles = [
  {
    name: "iphone-13",
    options: devices["iPhone 13"],
  },
  {
    name: "pixel-7",
    options: devices["Pixel 7"],
  },
];

const routes = ["/", "/services", "/gallery", "/contact", "/request-estimate"];

const failures = [];

const browser = await chromium.launch({
  headless: true,
});

try {
  for (const profile of deviceProfiles) {
    const context = await browser.newContext(profile.options);

    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000,
      });

      if (!response || !response.ok()) {
        failures.push(`${profile.name} ${route} failed to load successfully.`);

        continue;
      }

      const overflow = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));

      if (overflow.documentWidth > overflow.viewportWidth + 2) {
        failures.push(
          `${profile.name} ${route} has horizontal overflow: ${overflow.documentWidth}px document versus ${overflow.viewportWidth}px viewport.`,
        );
      }

      const slug =
        route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");

      await page.screenshot({
        path: path.join(outputDirectory, `${profile.name}-${slug}.png`),
        fullPage: true,
      });
    }

    for (const error of consoleErrors) {
      failures.push(`${profile.name} console error: ${error}`);
    }

    for (const error of pageErrors) {
      failures.push(`${profile.name} page error: ${error}`);
    }

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error("\nMobile verification failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Mobile verification passed. Screenshots saved to ${outputDirectory}.`,
);
