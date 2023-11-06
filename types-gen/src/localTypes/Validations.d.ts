export interface Rules {
    required?: boolean;
    min?: number;
    max?: number;
    contain?: Array<string | number>;
    email?: string;
    message?: string;
    string?: boolean;
    number?: boolean;
}
export interface Messages {
    required?: string;
    min?: string;
    max?: string;
    contain?: string;
    email?: string;
    message?: string;
    string?: string;
    number?: string;
}
export interface Validations {
    rules: Rules;
    messages?: Messages;
}
