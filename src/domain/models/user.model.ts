import { Role } from "./types/roles.type";

export type User = {
    name: string
    dni: string
    email: string;
    roles: Role[];
    branch: string;
}