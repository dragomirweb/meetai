'use client'

import { Button } from '@/components/ui/button'

import { authClient } from '@/lib/auth-client'

export const HomeView = () => {
  const { data: session } = authClient.useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <p>Logged in as {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }
}
