import { OC } from "../models/oc.model";

export abstract class OCsRepository {
  static async findAll(): Promise<OC[]> {
    return [...OCsRepository.OCs.values()];
  }

  static async findById(id?: string): Promise<OC | undefined> {
    if(!id) return
    return OCsRepository.OCs.get(id);
  }

  static async save(oc: OC): Promise<void> {
    if(!oc.id) oc.id = (OCsRepository.OCs.size + 1).toString();
    OCsRepository.OCs.set(oc.id, oc);
    console.log('Se ha guardado la OC')
  }

  private static OCs = new Map<string, OC>([
    ["1", {
      id: "1",
      client: {
        dni: "12345678-9",
        name: 'John Doe',
        email: 'john.doe@mail.com',
      },
      items: [
        {
          id: "1",
          name: 'Producto 1',
          quantity: 1,
          price: 100000,
          total: 100000,
        },
        {
          id: "1",
          name: 'Producto ',
          quantity: 2,
          price: 201000,
          total: 402000,
        },
      ],
      date: new Date('2021-01-01'),
      paymentDate: new Date('2021-01-01'),
      total: 502000,
      status: 'Pagada',
      sync: true,
    }],
    ["2", {
      id: "2",
      client: {
        dni: "44444444-4",
        name: 'Juan Perez',
        email: 'juan.perez@mail.com',
      },
      items: [
        {
          id: "1",
          name: 'Taladro',
          quantity: 1,
          price: 125000,
          total: 125000,
        },
      ],
      date: new Date('2021-01-01'),
      paymentDate: new Date('2021-01-02'),
      total: 125000,
      status: 'Pagada',
      sync: false,
    }],
    ["3", {
      id: "3",
      client: {
        dni: "22222222-2",
        name: 'Esteban Villalobos',
        email: 'esteban.perez@mail.com',
      },
      items: [
        {
          id: "1",
          name: 'Taladro',
          quantity: 3,
          price: 125000,
          total: 375000,
        },
      ],
      date: new Date('2021-01-01'),
      paymentDate: new Date('2021-01-01'),
      total: 375000,
      status: 'Pendiente',
      sync: false,
    }],
  ]);
}