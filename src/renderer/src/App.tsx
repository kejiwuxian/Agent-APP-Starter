import { ThemeProvider } from "@/components/theme-provider"
import { AssistantRuntimeProvider, useLocalRuntime, type ChatModelAdapter} from "@assistant-ui/react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ThreadListSidebar } from "@/components/threadlist-sidebar";
import { Thread } from "@/components/thread";

function App() {
  const MyModelAdapter: ChatModelAdapter = {
    async *run({ messages }) {
      console.log('Messages received by MyModelAdapter:', messages);
      for (let i = 0; i < 10; i++) {
        const content = `This is a simulated response for iteration ${i}.`;
        await new Promise((resolve) => setTimeout(resolve, 100));
        yield {
          content: [
            { type: "text" as const, text: content },
          ],
        };
      }
    },
  };

  const runtime = useLocalRuntime(MyModelAdapter);

  return (
    <ThemeProvider>
      <AssistantRuntimeProvider runtime={runtime}>
        <SidebarProvider>
          <div className="flex h-dvh w-full pr-0.5">
            <ThreadListSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbPage>Conversations</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>New Chat</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <div className="flex flex-1 flex-col overflow-hidden">
                <Thread />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </AssistantRuntimeProvider>
    </ThemeProvider>
  );
};

export default App
