import type { Meta, StoryObj } from '@storybook/react'
import AddCapsule from './AddCapsule.tsx'

const meta: Meta<typeof AddCapsule> = {
  title: 'AddSong',
  component: AddCapsule,
}

type Story = StoryObj<typeof AddCapsule>

export const addCapsule: Story = {
  name: 'AddCapsule',
  render: () => <AddCapsule />,
}

export default meta
