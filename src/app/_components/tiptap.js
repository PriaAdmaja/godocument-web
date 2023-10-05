"use client";
import { useState, useEffect } from "react";
import { useEditor, EditorContent, useCurrentEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";

// const MenuBar = () => {
//   const { editor } = useCurrentEditor();
//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={`btn ${editor.isActive("bold") ? "btn-neutral" : ""}`}
//       >
//         Bold
//       </button>
//     </>
//   );
// };

// const extensions = [Document, Paragraph, Text],

// const content = `<p>Type something here</p>`;

// export default () => {
//   return (
//     <EditorProvider
//       slotBefore={<MenuBar />}
//       extensions={extensions}
//       content={content}
//     ></EditorProvider>
//   );
// };

const Tiptap = (props) => {
  // const [editable, setEditable] = useState(false);

  // useEffect(() => {
  //   if (props.editable === undefined) {
  //     return setEditable(true);
  //   }
  //   setEditable(props.editable);
  // }, [props.editable]);

  const editor = useEditor({
    editable : props.editable || true,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "Create document here ...",
      }),
    ],
    content: props.contentDb ? props.contentDb : "",
    onUpdate({ editor }) {
      props.getContent(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
