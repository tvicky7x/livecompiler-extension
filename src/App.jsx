import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight } from "@uiw/codemirror-theme-github";

function App() {
  const [code, setCode] = useState("console.log('hello world!');");
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [codeExecuting, setCodeExecuting] = useState(false);
  const workerRef = useRef(null);

  const onChange = useCallback((val) => {
    setCode(val);
  }, []);

  function runCode() {
    if (workerRef.current) {
      setLogs([]);
      setError(null);
      setCodeExecuting(true);
      workerRef.current.postMessage(code);
    }
  }

  function stopWorker() {
    if (workerRef.current) {
      workerRef.current.terminate();
      console.log("Worker terminated.");
      workerRef.current = createWorker();
      setCodeExecuting(false);
    }
  }

  function createWorker() {
    const worker = new Worker(
      new URL("./utilities/javascriptWorker.js", import.meta.url),
    );

    worker.onmessage = (event) => {
      const { logs, error } = event.data;
      if (error) {
        setError(error);
      } else {
        setLogs(logs);
      }
      setCodeExecuting(false);
    };

    return worker;
  }

  useEffect(() => {
    workerRef.current = createWorker();
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  console.log(logs, "++>");
  console.log(error, "**>");

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-300 p-[6px] select-none">
        <span className="font-semibold">JavaScript LiveCompiler</span>
        {!codeExecuting ? ( // <- now properly rerenders when executing
          <Button onClick={runCode}>
            <Play />
          </Button>
        ) : (
          <Button onClick={stopWorker} variant={"destructive"}>
            <Square />
          </Button>
        )}
      </div>
      <ResizablePanelGroup direction="vertical" className="min-h-screen">
        <ResizablePanel defaultSize={60} className="flex flex-col">
          <div className="overflow-hidden">
            <CodeMirror
              value={code}
              extensions={[
                javascript(),
                basicSetup({
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  drawSelection: true,
                  dropCursor: true,
                  history: true,
                  foldGutter: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  closeBracketsKeymap: true,
                  autocompletion: true,
                  completionKeymap: true,
                  lintKeymap: true,
                  searchKeymap: true,
                  historyKeymap: true,
                  defaultKeymap: true,
                }),
              ]}
              onChange={onChange}
              theme={githubLight}
              autoFocus={true}
              height={"100vh"}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="border border-transparent hover:border hover:border-slate-400" />
        <ResizablePanel defaultSize={40}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
