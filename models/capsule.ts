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