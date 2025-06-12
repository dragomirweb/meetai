import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end gap-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
