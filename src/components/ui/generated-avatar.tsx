import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

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
  let avatar: ReturnType<typeof createAvatar>

  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, { seed })
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontSize: 42,
      fontWeight: 500,
      radius: 100,
    })
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
