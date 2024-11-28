// Add a new capsule
// Title, Description, Tags, Time
// Add collaborators
import {Capsule} from '../../models/capsule'
import useMutation from '@tanstack/react-query'
import { addCapsule } from '../apis/api'

export function useAddCapsule(newCapsule: Capsule) {
  useMutation({
    mutationFn: addCapsule(newCapsule),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['capsules'],
      })
    },
  })
}
