'use client'

import { Button } from '@/components/ui/button'

import { authClient } from '@/lib/auth-client'

export default function Home() {
  const { data: session } = authClient.useSession()

  if (session) {
    return (
      <div>
        Logged in as {session.user?.name}{' '}
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return <div></div>
}
