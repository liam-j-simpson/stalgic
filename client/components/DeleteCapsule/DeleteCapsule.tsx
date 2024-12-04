import useDeleteCapsule from '../../hooks/useDeleteCapsule'

interface Props {
  capsuleId: number
}

function DelCapsule(props: Props) {
  const { mutate: deleteCapsule } = useDeleteCapsule()

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    deleteCapsule(id)
  }

  return (
    <>
      <div className="font-font-lalezar flex">
        <button
          className="m-4 rounded-full bg-[#FF0000] object-cover px-4 py-2 pt-2 text-[#ffffff] transition-transform hover:scale-105 hover:bg-[#CC0000] hover:text-[#ffffff] focus:outline-none"
          onClick={(e) => handleDelete(e, props.capsuleId)}
        >
          DELETE
        </button>
      </div>
    </>
  )
}

export default DelCapsule
