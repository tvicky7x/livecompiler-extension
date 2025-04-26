import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeTextEditor from "./components/CodeTextEditor/CodeTextEditor";

function App() {
  return (
    <div>
      <ResizablePanelGroup direction="vertical" className="min-h-screen">
        <ResizablePanel defaultSize={60} className="flex flex-col">
          <CodeTextEditor />
        </ResizablePanel>
        <ResizableHandle className="border border-transparent hover:border hover:border-slate-400" />
        <ResizablePanel defaultSize={40}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default App;
