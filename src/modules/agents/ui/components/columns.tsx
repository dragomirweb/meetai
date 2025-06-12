'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CornerDownRightIcon, VideoIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'

import type { Agent } from '@/modules/agents/types'

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: 'name',
    header: 'Agent name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={row.original.name}
              variant="botttsNeutral"
              className="size-6 overflow-hidden rounded-full"
            />

            <span className="font-semibold capitalize">
              {row.original.name}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <CornerDownRightIcon className="text-muted-foreground size-3" />
            <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
              {row.original.instructions}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />{' '}
        {row.original?.meetingCount ?? 0}{' '}
        {row.original?.meetingCount === 1 ? 'Meeting' : 'Meetings'}
      </Badge>
    ),
  },
]
