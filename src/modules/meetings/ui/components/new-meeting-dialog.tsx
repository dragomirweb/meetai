import { useRouter } from 'next/navigation'

import { ResponsiveDialog } from '@/components/responsive-dialog'

import { MeetingForm } from './meeting-form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewMeetingDialog = ({ open, setOpen }: Props) => {
  const router = useRouter()
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="New Meeting"
      description="Create a new meeting"
    >
      <MeetingForm
        onSuccess={(id: string) => {
          setOpen(false)
          router.push(`/meetings/${id}`)
        }}
        onCancel={() => setOpen(false)}
      />
    </ResponsiveDialog>
  )
}
