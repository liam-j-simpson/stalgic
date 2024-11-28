export interface Capsule {
  title: string
  time: string
  description: string
  tags: string[]
  user_id: string
}

export interface CapsuleData extends Capsule {
  id: number
}
