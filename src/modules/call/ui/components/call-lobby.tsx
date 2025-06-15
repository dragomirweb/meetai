import Link from 'next/link'
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from '@stream-io/video-react-sdk'
import { LogInIcon } from 'lucide-react'

import '@stream-io/video-react-sdk/dist/css/styles.css'

import { Button } from '@/components/ui/button'

import { authClient } from '@/lib/auth-client'
import { generateAvatarUri } from '@/lib/avatar'

interface Props {
  onJoin: () => void
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession()

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? 'Unknown',
          image:
            data?.user.image ??
            generateAvatarUri(data?.user.name ?? 'Unknown', 'initials'),
        } as StreamVideoParticipant
      }
    />
  )
}

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser permissions to access your camera and microphone
    </p>
  )
}

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks()

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState()
  const { hasBrowserPermission: hasCameraPermission } = useCameraState()

  const hasBrowserPermissions = hasMicPermission && hasCameraPermission

  return (
    <div className="from-sidebar-accent to-sidebar flex h-screen flex-grow flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm"> Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserPermissions
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex w-full justify-between gap-x-2">
            <Button variant="ghost" asChild>
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon /> Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
