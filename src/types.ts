export type Employee = {
    id: number,
    name: string,
    surname: string,
    personalNumber: number,
    address: Address,
    deliveryDevice: DeliveryDevice,
    deliveryAmount: number,
    isInProgress?: boolean
}

export enum DeliveryDevice {
    Bicycle = "Fahrrad",
    EScooter = "E-Scooter",
    Caddy = "Caddy",
    Trolley = "Rollwagen"
}

type Address = {
    street: string,
    zip: number,
    city: string
}
