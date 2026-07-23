/* eslint-disable @typescript-eslint/no-require-imports */
const http = require("node:http");
const next = require("next");

const development = process.env.NODE_ENV !== "production";

const hostname = process.env.HOSTNAME || "127.0.0.1";

const port = Number(process.env.PORT || 3000);

const app = next({
  dev: development,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer(async (request, response) => {
      try {
        await handle(request, response);
      } catch (error) {
        console.error("Unhandled request error:", error);

        if (!response.headersSent) {
          response.statusCode = 500;
          response.end("Internal Server Error");
        }
      }
    });

    server.listen(port, hostname, () => {
      console.log(`JS Auto Body Repairs listening on ${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Application startup failed:", error);

    process.exitCode = 1;
  });
