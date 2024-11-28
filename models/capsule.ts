export interface Fruit {
  id: number
  name: string
  owner: string
}

export interface FruitData {
  name: string
  owner: string
}

export interface Capsule {
  title: string
  description: string
  tags: string[]
}

export interface CapsuleData extends Capsule {
  id: number
}
