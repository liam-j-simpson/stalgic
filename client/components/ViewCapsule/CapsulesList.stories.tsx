import type { Meta, StoryObj } from '@storybook/react-vite'

// import ListAllCapsules from './ListAllCapsules'
import CapsuleListItem from './CapsuleListItem'
import { Capsule } from '../../../models/capsule'

const meta: Meta<typeof CapsuleListItem> = {
  title: 'View Capsule',
  component: CapsuleListItem,
}

type Story = StoryObj<typeof CapsuleListItem>

const capsules: Capsule = {
  title: 'Guasha Progress',
  time: '12y 30d',
  description: 'Contour that face',
  tags: ['health', 'wellbeing'],
}

export const addSong: Story = {
  name: 'Capsule',
  render: () => <CapsuleListItem capsule={capsules} />,
}

export default meta
