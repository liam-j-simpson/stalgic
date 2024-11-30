// Add a new capsule
// Title, Description, Tags, Time
// Add collaborators
import {Capsule} from '../../models/capsule'
import useMutation from '@tanstack/react-query'
import * as api from '../apis/api.ts'

export function useAddCapsule(newCapsule: Capsule) {
  useMutation({
    mutationFn: api.addCapsule(newCapsule),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['capsules'],
      })
    },
  })
}
