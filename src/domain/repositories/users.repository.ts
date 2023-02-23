import { User } from "../models/user.model"
import { Credential } from "../models/credential.model"

export abstract class UsersRepository {
    static users = new Map<string, User>([
        ["11111111-1", {
            name: "Marco Galindo",
            dni: "11111111-1",
            email: "vendedor@sodimac.cl",
            roles: ["seller"],
            branch: 'Providencia',
        }],
        ["22222222-2", {
            name: "Administrador",
            dni: "22222222-2",
            email: "admin@sodimac.cl",
            roles: ["admin"],
            branch: 'Providencia',
        }],
    ])

    static async findAll(): Promise<User[]> {
        return Array.from(this.users.values())
    }
    
    static async findById(id?: string): Promise<User | undefined> {
        if (!id) return undefined;
        if (!this.users.has(id)) throw new Error("Usuario no encontrado.");
        return this.users.get(id)
    }

    static async findByEmail(email: string): Promise<User | undefined> {
        if (!email) return undefined;
        const user = Array.from(this.users.values()).find(u => u.email === email);
        return user
    }

    static async save(user: User): Promise<void> {
        this.users.set(user.dni, user)
    }

    static async login(credentials: Credential): Promise<void> {
        if (!(credentials && credentials.email && credentials.password)) throw new Error("Credenciales inválidas.")
        const user = await UsersRepository.findByEmail(credentials.email);
        if (!user) throw new Error("Credenciales inválidas.")
        const bdUser = await UsersRepository.findById(user.dni)
        localStorage.setItem("user", JSON.stringify(bdUser));
    }

    static async logout(): Promise<void> {
        // TODO
    }

    private static mapUser(user: any): User {
        return {
            name: user.name,
            dni: user.dni,
            email: user.email,
            roles: user.roles,
            branch: user.branch,
        }
    }
}