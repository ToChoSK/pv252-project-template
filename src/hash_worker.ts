import { AsyncSha256 } from "./sha-256.js";

self.addEventListener("message", (event) => {
  const file = event.data.file as File;

  if (!file) {
    self.postMessage({ status: "error", message: "No file provided." });
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const fileData = reader.result as string;
    const total = fileData.length;

    const hasher = new AsyncSha256();
    hasher.async_digest(
      fileData,
      (hash) => {
        self.postMessage({ status: "done", hash });
      },
      (remaining) => {
        self.postMessage({
          status: "progress",
          remaining,
          total,
        });
      }
    );
  };

  reader.readAsText(file);
});
