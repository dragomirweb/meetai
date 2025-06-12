import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { useAgentFilters } from '@/modules/agents/hooks/use-agent-filters'

export const AgentsSearchFilters = () => {
  const [filters, setFilters] = useAgentFilters()

  return (
    <div className="relative flex items-center gap-x-2">
      <Input
        className="h-9 w-[200px] bg-white pl-7"
        value={filters.search}
        placeholder="Filter by name"
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  )
}
