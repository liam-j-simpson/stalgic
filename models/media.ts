export interface PostMediaData {
  capsule_id: number
  file: Blob
}

// this should be used from backend
export interface MediaDataDraft {
  capsule_id: number
  filename: string
}

export interface Media extends MediaDataDraft {
  id: number
}
