import React, { useCallback, useState } from "react";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from "@uiw/codemirror-theme-github";

function CodeTextEditor() {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val) => {
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
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
    />
  );
}

export default CodeTextEditor;
