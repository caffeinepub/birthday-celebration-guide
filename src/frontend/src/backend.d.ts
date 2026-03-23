import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactData {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    getSubmissions(): Promise<Array<ContactData>>;
    submit(name: string, email: string, message: string): Promise<void>;
}
