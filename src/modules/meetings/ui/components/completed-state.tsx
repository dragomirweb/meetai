import Link from 'next/link'
import { format } from 'date-fns'
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from 'lucide-react'
import Markdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

import { Badge } from '@/components/ui/badge'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { formatDuration } from '@/lib/utils'
import { Meeting } from '@/modules/meetings/types'

interface Props {
  data: Meeting
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-lg border bg-white px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-start rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <BookOpenTextIcon /> Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileTextIcon /> Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileVideoIcon /> Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <SparklesIcon /> Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value="summary">
          <div className="rounded-lg border bg-white">
            <div className="flex flex-col gap-y-5 px-4 py-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5 overflow-hidden rounded-full"
                  />
                  {data.agent.name}
                </Link>
                <p>{data.startedAt ? format(data.startedAt, 'PPP') : ''}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon />
                {data.duration ? formatDuration(data.duration) : 'No duration'}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="mb-6 text-2xl font-medium" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="mb-6 text-xl font-medium" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="mb-6 text-lg font-medium" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="mb-6 text-base font-medium" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-6 leading-relaxed" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="mb-6 list-inside list-disc" {...props} />
                    ),
                    ol: (props) => (
                      <ol
                        className="mb-6 list-inside list-decimal"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-1" {...props} />,
                    strong: (props) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code
                        className="rounded bg-gray-100 px-1 py-0.5"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="my-4 border-l-4 pl-4 italic"
                        {...props}
                      />
                    ),
                  }}
                  rehypePlugins={[rehypeSanitize]}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recording">
          <div className="rounded-lg border bg-white px-4 py-5">
            {data.recordingUrl && (
              <video
                src={data.recordingUrl!}
                controls
                className="w-full rounded-lg"
              />
            )}

            {!data.recordingUrl && (
              <div className="flex flex-col items-center justify-center gap-y-2 bg-white px-4 py-5">
                <FileIcon className="text-muted-foreground h-10 w-10" />
                <p className="text-muted-foreground text-sm">
                  No recording available for this meeting
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
