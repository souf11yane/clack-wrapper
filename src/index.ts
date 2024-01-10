import { cancel, confirm, isCancel, multiselect, password, select, spinner, text, type ConfirmOptions, type PasswordOptions, type TextOptions } from "@clack/prompts";

export async function createPassword({ message, mask = "*", validate }: PasswordOptions) {
  const operation = await password({
    message,
    mask,
    validate,
  });

  handleCancelation(operation);

  return operation;
}

export async function createConfirm(param: ConfirmOptions) {
  const operation = await confirm(param);

  handleCancelation(operation);

  return operation;
}

export async function createText(param: TextOptions) {
  const operation = await text(param);

  handleCancelation(operation);

  return operation;
}

export async function createSelect<T = any>({
  maxItems,
  message,
  options,
  initialValue,
}: {
  message: string;
  options: { value: T; label: string; hint?: string }[];
  maxItems?: number;
  initialValue?: T;
}) {
  const operation = await select<any, T>({ maxItems: maxItems || Math.min(options.length, Math.max(options.length - 4, 8)), message, options, initialValue });

  handleCancelation(operation);

  return operation;
}

export async function createMultiselect<T = any>(param: {
  message: string;
  options: { value: T; label: string; hint?: string }[];
  initialValues?: T[];
  required?: boolean;
  cursorAt?: any;
}) {
  const operation = await multiselect<any, T>(param);

  handleCancelation(operation);

  return operation;
}

export async function createSpinner(
  cb: (resolve: (value: any) => void, reject: (reason?: any) => void) => void,
  options: { startLabel?: string; endLabel?: string } = {
    startLabel: "",
    endLabel: "",
  }
) {
  const s = spinner();

  s.start(options?.startLabel ?? "");

  await new Promise((res, rej) => {
    cb(res, rej);
  });

  s.stop(options?.endLabel ?? "");
}

function handleCancelation(operation: any) {
  if (isCancel(operation)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
}
