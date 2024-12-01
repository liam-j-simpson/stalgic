export interface Capsule {
  title: string
  time: string
  description: string
  tags: string[]
}

export interface CapsuleData extends Capsule {
  id: number
}
