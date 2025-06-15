import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

interface Props {
  seed: string
  variant?: 'botttsNeutral' | 'initials'
}

export const generateAvatarUri = (
  seed: string,
  variant: Props['variant'] = 'botttsNeutral'
) => {
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
  return avatar.toDataUri()
}
