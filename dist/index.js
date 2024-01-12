"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createConfirm: () => createConfirm,
  createMultiselect: () => createMultiselect,
  createPassword: () => createPassword,
  createSelect: () => createSelect,
  createSpinner: () => createSpinner,
  createText: () => createText
});
module.exports = __toCommonJS(src_exports);
var import_prompts = require("@clack/prompts");
async function createPassword({ message, mask = "*", validate }) {
  const operation = await (0, import_prompts.password)({
    message,
    mask,
    validate
  });
  handleCancelation(operation);
  return operation;
}
async function createConfirm(param) {
  const operation = await (0, import_prompts.confirm)(param);
  handleCancelation(operation);
  return operation;
}
async function createText(param) {
  const operation = await (0, import_prompts.text)(param);
  handleCancelation(operation);
  return operation;
}
async function createSelect({
  maxItems,
  message,
  options,
  initialValue
}) {
  const operation = await (0, import_prompts.select)({ maxItems: maxItems || Math.min(options.length, Math.max(options.length - 4, 8)), message, options, initialValue });
  handleCancelation(operation);
  return operation;
}
async function createMultiselect(param) {
  const operation = await (0, import_prompts.multiselect)(param);
  handleCancelation(operation);
  return operation;
}
async function createSpinner(cb, startLabel) {
  const s = (0, import_prompts.spinner)();
  s.start(startLabel ?? "");
  await new Promise((res) => {
    cb(res);
  }).then((result) => {
    s.stop(result);
  }).catch((reason) => {
    s.stop(reason);
    console.error(`Error: there was an error in the spinner callback.
${reason}`);
  });
}
function handleCancelation(operation) {
  if ((0, import_prompts.isCancel)(operation)) {
    (0, import_prompts.cancel)("Operation cancelled.");
    process.exit(0);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createConfirm,
  createMultiselect,
  createPassword,
  createSelect,
  createSpinner,
  createText
});
