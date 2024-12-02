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
      <div className="flex font-font-lalezar">
        <button
          className="ml-4 rounded-full bg-[#FE5801] px-4 py-2 pt-2 text-[#ffffff] hover:bg-[#FF0000] hover:text-[#ffffff]"
          onClick={(e) => handleDelete(e, props.capsuleId)}
        >
          DELETE
        </button>
      </div>
    </>
  )
}

export default DelCapsule
