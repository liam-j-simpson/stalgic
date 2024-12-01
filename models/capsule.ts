export interface Capsule {
  title: string
  time: string
  description: string
  tags: string[]
  status: string
}

export interface CapsuleData extends Capsule {
  id: number
}

export interface CapsuleArray {
  results: CapsuleData[]
}
