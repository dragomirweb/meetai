import Image from 'next/image'

interface Props {
  title?: string
  message?: string
  image?: string
}

export const EmptyState = ({ title, message, image = '/empty.svg' }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} alt="Empty state" width={240} height={240} />
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-y-6 text-center">
        <h3 className="text-lg font-medium">
          {title ?? 'Something went wrong'}
        </h3>
        <p className="text-muted-foreground text-sm">
          {message ?? 'An unexpected error occurred.'}
        </p>
      </div>
    </div>
  )
}
