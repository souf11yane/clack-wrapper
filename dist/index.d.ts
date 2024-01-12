import { PasswordOptions, ConfirmOptions, TextOptions } from '@clack/prompts';

declare function createPassword({ message, mask, validate }: PasswordOptions): Promise<string>;
declare function createConfirm(param: ConfirmOptions): Promise<boolean>;
declare function createText(param: TextOptions): Promise<string>;
declare function createSelect<T = any>({ maxItems, message, options, initialValue, }: {
    message: string;
    options: {
        value: T;
        label: string;
        hint?: string;
    }[];
    maxItems?: number;
    initialValue?: T;
}): Promise<T>;
declare function createMultiselect<T = any>(param: {
    message: string;
    options: {
        value: T;
        label: string;
        hint?: string;
    }[];
    initialValues?: T[];
    required?: boolean;
    cursorAt?: any;
}): Promise<T[]>;
declare function createSpinner(cb: (stop: (endLabel?: string) => void) => void, startLabel?: string): Promise<void>;

export { createConfirm, createMultiselect, createPassword, createSelect, createSpinner, createText };
