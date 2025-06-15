import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import { generateAvatarUri } from '@/lib/avatar'
import { cn } from '@/lib/utils'

type GeneratedAvatarProps = {
  seed: string
  className?: string
  variant: 'botttsNeutral' | 'initials'
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  const avatarUri = generateAvatarUri(seed, variant)

  return (
    <Avatar
      className={cn('flex items-center justify-center text-center', className)}
    >
      <AvatarImage src={avatarUri} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
