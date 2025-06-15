import Link from 'next/link'
import { VideoIcon } from 'lucide-react'

import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'

interface Props {
  meetingId: string
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        message="Meeting will end once all participants have left"
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 pb-3 lg:flex-row lg:justify-center">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}
