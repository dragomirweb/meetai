import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { CommandSelect } from '@/components/command-select'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'

import { useMeetingsFilters } from '@/modules/meetings/hooks/use-meetings-filters'
import { useTRPC } from '@/trpc/client'

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const [agentSearch, setAgentSearch] = useState('')

  const trpc = useTRPC()

  const { data: agents } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  )

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(agents?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4 overflow-hidden rounded-full"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      value={filters.agentId ?? ''}
      onSearch={setAgentSearch}
      isSearchable
    />
  )
}
