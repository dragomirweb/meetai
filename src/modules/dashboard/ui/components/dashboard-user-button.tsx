import { useRouter } from 'next/navigation'
import {
  ChevronDownIcon,
  CreditCardIcon,
  LogOutIcon,
} from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import { Skeleton } from '@/components/ui/skeleton'

import { authClient } from '@/lib/auth-client'
import { useIsMobile } from '@/hooks/use-mobile'

export const DashboardUserButton = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { data, isPending } = authClient.useSession()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
      },
    })
  }

  if (isPending || !data) {
    return (
      <div className="flex h-[64px] items-center justify-center">
        <Skeleton className="bg-primary/30 h-full w-full" />
      </div>
    )
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          asChild
          className="border-border/10 flex w-full items-center justify-between gap-1 gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10"
        >
          <div>
            {data.user.image ? (
              <Avatar className="size-9">
                <AvatarImage src={data.user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                className="size-9"
                seed={data.user.name}
                variant="initials"
              />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
              <p className="w-full truncate text-sm">
                {data.user.name}
              </p>
              <p className="w-full truncate text-xs">
                {data.user.email}
              </p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0" />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-left">
              {data.user.name}
            </DrawerTitle>
            <DrawerDescription className="text-left">
              {data.user.email}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4 text-black" />
              <span>Billing</span>
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 text-black" />
              <span>Logout</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/10 flex w-full items-center justify-between gap-1 gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {data.user.image ? (
          <Avatar className="size-9">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            className="size-9"
            seed={data.user.name}
            variant="initials"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm">
            {data.user.name}
          </p>
          <p className="w-full truncate text-xs">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        className="w-72"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <p className="truncate font-medium">
              {data.user.name}
            </p>
            <p className="text-muted-foreground truncate text-sm font-normal">
              {data.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
          <span>Billing</span>
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center justify-between"
          onClick={onLogout}
        >
          <span>Logout</span>
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
