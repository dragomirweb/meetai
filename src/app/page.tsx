'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

   const { 
        data: session, 
    } = authClient.useSession() 

  const handleSubmit = async () => {
    await authClient.signUp.email({
      name,
      email,
      password,
    }, {
      onSuccess: () => {
        console.log('success')
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  const handleSignIn = async () => {
    await authClient.signIn.email({
      email,
      password,
    })
  }

  if (session) {
    return <div>Logged in as {session.user?.name} <Button onClick={() => authClient.signOut()}>Sign out</Button></div>
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
      <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
      </div>

      <div className="flex flex-col gap-4">
      
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignIn}>Submit</Button>
    </div>
    </div>
  );
}
