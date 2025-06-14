import { ResponsiveDialog } from '@/components/responsive-dialog'

import { Meeting } from '../../types'
import { MeetingForm } from './meeting-form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  initialValues: Meeting
}

export const UpdateMeetingDialog = ({
  open,
  setOpen,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit Meeting"
      description="Edit the meeting details"
    >
      <MeetingForm
        onSuccess={() => {
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
