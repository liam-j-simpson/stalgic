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
  time: string
  description: string
  tags: string[]
  users?: string[]
}

export interface CapsuleData extends Capsule {
  id: number
}
