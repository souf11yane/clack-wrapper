import { PasswordOptions, ConfirmOptions, TextOptions } from '@clack/prompts';

declare function createPassword({ message, mask, validate }: PasswordOptions): Promise<string | symbol>;
declare function createConfirm(param: ConfirmOptions): Promise<boolean | symbol>;
declare function createText(param: TextOptions): Promise<string | symbol>;
declare function createSelect<T = any>({ maxItems, message, options, initialValue, }: {
    message: string;
    options: {
        value: T;
        label: string;
        hint?: string;
    }[];
    maxItems?: number;
    initialValue?: any;
}): Promise<symbol | T>;
declare function createMultiselect<T = any>(param: {
    message: string;
    options: {
        value: T;
        label: string;
        hint?: string;
    }[];
    initialValues?: any[];
    required?: boolean;
    cursorAt?: any;
}): Promise<symbol | T[]>;
declare function createSpinner(cb: (resolve: (value: any) => void, reject: (reason?: any) => void) => void, options?: {
    startLabel?: string;
    endLabel?: string;
}): Promise<void>;

export { createConfirm, createMultiselect, createPassword, createSelect, createSpinner, createText };
