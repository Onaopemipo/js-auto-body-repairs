export const deploymentConfig = {
  previewUrl: "https://delightful-fuchsia-horse.jsautobodyrepairs.com.au",

  productionUrl: "https://jsautobodyrepairs.com.au",

  applicationRoot: "js-auto-body-preview",

  startupFile: "server.js",

  nodeVersion: "22.23.0",

  healthPath: "/api/health",

  deploymentDirectory: ".deployment",

  archiveName: "js-auto-body-namecheap-preview.zip",
} as const;
