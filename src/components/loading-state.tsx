import { Loader2Icon } from 'lucide-react'

interface Props {
  title?: string
  message?: string
}

export const LoadingState = ({ title, message }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
        <Loader2Icon className="text-primary size-6 animate-spin" />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-muted-foreground text-sm">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
