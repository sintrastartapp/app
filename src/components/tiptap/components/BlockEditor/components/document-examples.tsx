import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  tabs: {
    title: string;
    embeddedId?: string;
    content: React.ReactNode;
  }[];
};

export function DocumentExamples({ title, tabs }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="items-center gap-2  text-xs">
          <EyeIcon className="size-4" />
          Examples
        </Button>
      </SheetTrigger>
      <SheetContent
        className="overflow-y-auto sm:max-w-2xl"
        overlayClassName="bg-black/20"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Tabs defaultValue={tabs[0].title} className="">
            <div className="flex justify-center">
              <TabsList className="mb-4 h-fit w-full flex-wrap">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.title} value={tab.title}>
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.title} value={tab.title}>
                {tab.embeddedId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${tab.embeddedId}`}
                    allowFullScreen
                    width="100%"
                    loading="lazy"
                    height="315"
                    className="mb-5"
                  />
                )}
                <div
                  style={{
                    overflowWrap: "break-word",
                    marginBottom: "16px",
                  }}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    className="sm:prose-sm"
                    components={{
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      a: ({ node: _, ...props }) => (
                        <a
                          target="_blank"
                          className="underline underline-offset-4"
                          {...props}
                        />
                      ),
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      pre: ({ node: _, ...props }) => (
                        <pre
                          className="whitespace-pre-line rounded-md bg-gray-100 p-2"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {tab.content as unknown as string}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
