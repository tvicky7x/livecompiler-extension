import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { basicSetup } from "codemirror";
import React, { useEffect, useRef } from "react";

function App() {
  const editorRef = useRef();

  useEffect(() => {
    let startState = EditorState.create({
      doc: "Hello World",
      extensions: [
        keymap.of(defaultKeymap),
        basicSetup,
        javascript(),
        lineNumbers(),
      ],
    });

    let view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} />
    </div>
  );
}

export default App;
