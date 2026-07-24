import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = (
  process.env.POST_LAUNCH_BASE_URL ?? "https://jsautobodyrepairs.com.au"
).replace(/\/+$/, "");

const submitEnabled = process.env.POST_LAUNCH_QUOTE_SUBMIT === "true";

const testEmail =
  process.env.POST_LAUNCH_QUOTE_EMAIL ?? "post-launch-dry-run@example.com";

const artifactDirectory = path.resolve(".post-launch-artifacts/quote");

fs.mkdirSync(artifactDirectory, {
  recursive: true,
});

if (submitEnabled && !process.env.POST_LAUNCH_QUOTE_EMAIL) {
  console.error(
    "POST_LAUNCH_QUOTE_EMAIL is required when submission is enabled.",
  );

  process.exit(1);
}

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage({
  viewport: {
    width: 1280,
    height: 900,
  },
});

async function getRequiredField(labelPattern, fieldName) {
  const field = page.getByLabel(labelPattern).first();

  if ((await field.count()) === 0) {
    throw new Error(
      `Could not find the ${fieldName} field using label ${labelPattern}.`,
    );
  }

  return field;
}

async function fillRequiredField(labelPattern, fieldName, value) {
  const field = await getRequiredField(labelPattern, fieldName);

  await field.fill(value);
}

async function saveFailureArtifacts() {
  await page.screenshot({
    path: path.join(artifactDirectory, "quote-verification-failure.png"),
    fullPage: true,
  });

  fs.writeFileSync(
    path.join(artifactDirectory, "quote-verification-failure.html"),
    await page.content(),
  );
}

try {
  const navigationResponse = await page.goto(`${baseUrl}/request-estimate`, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });

  if (!navigationResponse || !navigationResponse.ok()) {
    throw new Error(
      `Quote page failed to load. HTTP status: ${
        navigationResponse?.status() ?? "unknown"
      }.`,
    );
  }

  const submitButton = page.getByRole("button", {
    name: /send quote request/i,
  });

  await submitButton.waitFor({
    state: "visible",
    timeout: 30_000,
  });

  await fillRequiredField(
    /full name/i,
    "full name",
    "Post Launch Verification",
  );

  await fillRequiredField(/^email$/i, "email", testEmail);

  await fillRequiredField(/^phone$/i, "phone", "0412 345 678");

  await fillRequiredField(/^make$/i, "vehicle make", "Toyota");

  await fillRequiredField(/^model$/i, "vehicle model", "Corolla");

  await fillRequiredField(/^year$/i, "vehicle year", "2020");

  const registrationField = page.getByLabel(/registration/i).first();

  if ((await registrationField.count()) > 0) {
    await registrationField.fill("VERIFY1");
  }

  const serviceField = page.getByLabel(/service required/i).first();

  if ((await serviceField.count()) === 0) {
    throw new Error("Could not find the service required field.");
  }

  await serviceField.selectOption({
    label: "Collision Repairs",
  });

  await fillRequiredField(
    /describe the damage|work required/i,
    "damage description",
    [
      "AUTOMATED POST-LAUNCH VERIFICATION.",
      "This is not a genuine repair request.",
      "Please confirm receipt and delete after verification.",
    ].join(" "),
  );

  const consentCheckbox = page
    .getByLabel(/may contact me|consent|agree/i)
    .first();

  if ((await consentCheckbox.count()) > 0) {
    await consentCheckbox.check();
  }

  if (!submitEnabled) {
    console.log("Quote form structure verification passed.");

    console.log(
      "No request was submitted. Set POST_LAUNCH_QUOTE_SUBMIT=true and POST_LAUNCH_QUOTE_EMAIL to test delivery.",
    );
  } else {
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/quote") &&
        response.request().method() === "POST",
      {
        timeout: 45_000,
      },
    );

    await submitButton.click();

    const response = await responsePromise;

    const responseText = await response.text();

    if (!response.ok()) {
      throw new Error(
        `Quote API returned HTTP ${response.status()}: ${responseText}`,
      );
    }

    console.log(`Quote API submission passed with HTTP ${response.status()}.`);

    console.log(
      `Verify delivery to the workshop inbox and acknowledgement delivery to ${testEmail}.`,
    );
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  console.error(message);

  try {
    await saveFailureArtifacts();

    console.error(`Failure diagnostics saved to ${artifactDirectory}.`);
  } catch (artifactError) {
    console.error("Could not save failure diagnostics:", artifactError);
  }

  process.exitCode = 1;
} finally {
  await browser.close();
}
