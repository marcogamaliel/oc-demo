import { Role } from "../../domain/models/types/roles.type"
import { User } from "../../domain/models/user.model"
import { UsersRepository } from "../../domain/repositories/users.repository"

export function checkRoles(roles: Role[]): boolean {
    const user = getLoggedUser()
    return user.roles.some(r => roles.includes(r))
}

export function guardRoles(roles: Role[]): void {
    if (!checkRoles(roles)) throw new Error("No tienes permisos para realizar esta acción.")
}

export function getLoggedUser(): User {
    const userStr = localStorage.getItem("user")
    if (!userStr) throw new Error("No hay usuario logueado.")
    return JSON.parse(userStr) as User
}

export async function logout(): Promise<void> {
    await UsersRepository.logout()
    localStorage.removeItem("user");
}
