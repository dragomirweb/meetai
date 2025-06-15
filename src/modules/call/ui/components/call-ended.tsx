import Link from 'next/link'

import '@stream-io/video-react-sdk/dist/css/styles.css'

import { Button } from '@/components/ui/button'

export const CallEnded = () => {
  return (
    <div className="from-sidebar-accent to-sidebar flex h-screen flex-grow flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="gap-y2 flex flex-col text-center">
            <h6 className="text-lg font-medium">You have ended the call</h6>
            <p className="text-sm">Summary will be available soon</p>
          </div>

          <div className="flex w-full items-center justify-center">
            <Button variant="default" asChild>
              <Link href="/meetings">Back to meetings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
