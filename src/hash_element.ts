import { FASTElement, html, observable, when } from "@microsoft/fast-element";
import { HashWorkerInput, HashWorkerOutput } from "./hash_worker_messages.js";

export class HashElement extends FASTElement {
  @observable
  fileName: string = "";

  @observable
  total: number = -1;

  @observable
  remaining: number = -1;

  @observable
  hash: string | null = null;

  @observable
  elapsed: number = 0;

  #started: Date;

  constructor(file: File) {
    super();
    this.fileName = file.name;
    this.#started = new Date();

    const worker = new Worker(new URL("./hash_worker.js", import.meta.url));

    const message: HashWorkerInput = { file };
    worker.postMessage(message);

    worker.onmessage = (event) => {
      const data = event.data as HashWorkerOutput;

      if (data.status === "progress") {
        this.total = data.total;
        this.remaining = data.remaining;
        this.elapsed = new Date().getTime() - this.#started.getTime();
      } else if (data.status === "done") {
        this.hash = data.hash;
        this.remaining = 0;
        this.elapsed = new Date().getTime() - this.#started.getTime();
      } else if (data.status === "error") {
        console.error(data.message);
      }
    };
  }
}

const hashElementTemplate = html<HashElement>`
  <div style="margin-top: 12px;">
    <b>File name:</b> ${(x) => x.fileName}<br />
    ${when(
      (x) => x.hash !== null,
      html<HashElement>`<b>Hash:</b> ${(x) => x.hash}<br />`,
      html<HashElement>`
        <progress
          max="${(x) => x.total}"
          value="${(x) => x.total - x.remaining}"
          style="margin-right: 12px;"
        ></progress>
        ${when(
          (x) => x.total > 0,
          html<HashElement>`<code>${(x) => Math.ceil((x.total - x.remaining) / 1024 / 1024)} MiB / ${(x) => Math.ceil(x.total / 1024 / 1024)} MiB</code><br />`,
          html<HashElement>`Pending...<br />`
        )}
      `
    )}
    <b>Elapsed:</b> <code>${(x) => Math.floor(x.elapsed / 100) / 10} s</code>
  </div>
`;

HashElement.define({
  name: "hash-element",
  template: hashElementTemplate,
});
