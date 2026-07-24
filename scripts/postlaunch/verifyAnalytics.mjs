import { chromium } from "playwright";

const baseUrl = (
  process.env.POST_LAUNCH_BASE_URL ?? "https://jsautobodyrepairs.com.au"
).replace(/\/+$/, "");

const expectedMeasurementId = process.env.POST_LAUNCH_GA_ID;

function isGoogleAnalyticsRequest(url) {
  return (
    url.includes("googletagmanager.com/gtag/js") ||
    url.includes("google-analytics.com/g/collect") ||
    url.includes("analytics.google.com/g/collect")
  );
}

async function createPage(browser) {
  const context = await browser.newContext();

  const page = await context.newPage();

  return {
    context,
    page,
  };
}

const browser = await chromium.launch({
  headless: true,
});

const failures = [];

try {
  {
    const { context, page } = await createPage(browser);

    const analyticsRequests = [];

    page.on("request", (request) => {
      if (isGoogleAnalyticsRequest(request.url())) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto(baseUrl, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    const rejectButton = page.getByRole("button", {
      name: /reject optional/i,
    });

    if ((await rejectButton.count()) > 0) {
      await rejectButton.click();

      await page.waitForTimeout(2_000);
    } else {
      failures.push("Analytics rejection button was not found.");
    }

    if (analyticsRequests.length > 0) {
      failures.push("Google Analytics loaded after analytics was rejected.");
    }

    await context.close();
  }

  {
    const { context, page } = await createPage(browser);

    const analyticsRequests = [];

    page.on("request", (request) => {
      if (isGoogleAnalyticsRequest(request.url())) {
        analyticsRequests.push(request.url());
      }
    });

    await page.goto(baseUrl, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    const acceptButton = page.getByRole("button", {
      name: /accept analytics/i,
    });

    if ((await acceptButton.count()) > 0) {
      await acceptButton.click();

      await page.waitForTimeout(4_000);
    } else {
      failures.push("Analytics acceptance button was not found.");
    }

    if (analyticsRequests.length === 0) {
      failures.push(
        "No Google Analytics network request was detected after consent.",
      );
    }

    if (
      expectedMeasurementId &&
      !analyticsRequests.some((url) => url.includes(expectedMeasurementId))
    ) {
      failures.push(
        `Expected GA4 Measurement ID ${expectedMeasurementId} was not found in analytics requests.`,
      );
    }

    console.log("\nDetected analytics requests:\n");

    for (const request of analyticsRequests) {
      console.log(request);
    }

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error("\nAnalytics verification failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("\nAnalytics consent and network verification passed.");
