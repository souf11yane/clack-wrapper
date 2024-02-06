import { cancel, confirm, isCancel, multiselect, password, select, spinner, text, type ConfirmOptions, type PasswordOptions, type TextOptions } from "@clack/prompts";

export async function createPassword({ message, mask = "*", validate }: PasswordOptions) {
  const operation = await password({
    message,
    mask,
    validate,
  });

  handleCancelation(operation);

  return operation as string;
}

export async function createConfirm(param: ConfirmOptions) {
  const operation = await confirm(param);

  handleCancelation(operation);

  return operation as boolean;
}

export async function createText(param: TextOptions) {
  const operation = await text(param);

  handleCancelation(operation);

  return operation as string;
}

export async function createSelect<const T>({
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

  return operation as T;
}

export async function createMultiselect<const T>(param: {
  message: string;
  options: { value: T; label: string; hint?: string }[];
  initialValues?: T[];
  required?: boolean;
  cursorAt?: any;
}) {
  const operation = await multiselect<any, T>(param);

  handleCancelation(operation);

  return operation as T[];
}

export async function createSpinner(cb: (stop: (endLabel?: string) => void) => void, startLabel?: string) {
  const s = spinner();

  s.start(startLabel ?? "");

  await new Promise((res) => {
    cb(res);
  })
    .then((result: any) => {
      s.stop(result);
    })
    .catch((reason) => {
      s.stop(reason);
      console.error(`Error: there was an error in the spinner callback.\n${reason}`);
    });
}

function handleCancelation(operation: any) {
  if (isCancel(operation)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
}
