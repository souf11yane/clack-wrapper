// src/index.ts
import { cancel, confirm, isCancel, multiselect, password, select, spinner, text } from "@clack/prompts";
async function createPassword({ message, mask = "*", validate }) {
  const operation = await password({
    message,
    mask,
    validate
  });
  handleCancelation(operation);
  return operation;
}
async function createConfirm(param) {
  const operation = await confirm(param);
  handleCancelation(operation);
  return operation;
}
async function createText(param) {
  const operation = await text(param);
  handleCancelation(operation);
  return operation;
}
async function createSelect({
  maxItems,
  message,
  options,
  initialValue
}) {
  const operation = await select({ maxItems: maxItems || Math.min(options.length, Math.max(options.length - 4, 8)), message, options, initialValue });
  handleCancelation(operation);
  return operation;
}
async function createMultiselect(param) {
  const operation = await multiselect(param);
  handleCancelation(operation);
  return operation;
}
async function createSpinner(cb, options = {
  startLabel: "",
  endLabel: ""
}) {
  const s = spinner();
  s.start(options?.startLabel ?? "");
  await new Promise((res, rej) => {
    cb(res, rej);
  });
  s.stop(options?.endLabel ?? "");
}
function handleCancelation(operation) {
  if (isCancel(operation)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
}
export {
  createConfirm,
  createMultiselect,
  createPassword,
  createSelect,
  createSpinner,
  createText
};
