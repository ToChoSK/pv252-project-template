import {
  allComponents,
  provideFluentDesignSystem,
} from "@fluentui/web-components";
import UIkit from "uikit";
import { HashElement } from "./hash_element.js";

const kit = UIkit as unknown as typeof UIkit.default;
provideFluentDesignSystem().register(allComponents);

const upload = document.getElementById("sha-upload-input")! as HTMLInputElement;

function processFile(file: File) {
  if (file.size > 100_000_000) {
    kit.notification({
      message: `File "${file.name}" is too large.`,
      status: "danger",
      pos: "bottom-right",
    });
  } else {
    const el = new HashElement(file);
    document.getElementById("sha-digests")!.prepend(el);
  }
}

function onFiles() {
  const fileList = upload.files;
  if (fileList !== null) {
    for (let i = 0; i < fileList.length; i++) {
      const item = fileList.item(i);
      if (item !== null) {
        processFile(item);
      }
    }
  }
  upload.value = "";
}

upload.addEventListener("change", onFiles);
