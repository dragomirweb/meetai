import Image from 'next/image'
import Link from 'next/link'
import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk'

interface Props {
  onLeave: () => void
  meetingName: string
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="justify-beetween flex h-full flex-col text-white">
      <div className="flex items-center gap-4 rounded-full bg-[#101213] p-4">
        <Link
          href="/"
          className="flex w-fit items-center justify-center rounded-full bg-white/10 p-1"
        >
          <Image src="/logo.svg" alt="logo" width={22} height={22} />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full bg-[#101213] px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  )
}
