import { Client } from "../models/client.model";

export abstract class ClientsRepository {
  
  static async findAll(): Promise<Client[]> {
    return Array.from(ClientsRepository.clients.values()); 
  }

  static async findById(id: string): Promise<Client | undefined> {
    return ClientsRepository.clients.get(id);
  }

  private static clients = new Map<string, Client>([
    ['12345678-9', {
      name: 'John Doe',
      dni: '12345678-9',
      email: 'john.doe@mail.com'
    }],
    ['11111111-1', {
      name: 'Maria Rojas',
      dni: '11111111-1',
      email: 'maria.rojas@mail.com'
    }],
    ['22222222-2', {
      name: 'Esteban Villalobos',
      dni: '22222222-2',
      email: 'esteban.perez@mail.com'
    }],
    ['33333333-3', {
      name: 'Mateo Lopez',
      dni: '33333333-3',
      email: 'mateo.lopez@mail.com'
    }],
    ['44444444-4', {
      name: 'Juan Perez',
      dni: '44444444-4',
      email: 'juan.perez@mail.com'
    }],
  ]);
}