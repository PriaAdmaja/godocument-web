"use client";
import { useState } from "react";
import { useEditor, EditorContent, useCurrentEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

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
  let editable = props.editable ? props.editable : true;
  const editor = useEditor({
    editable,
    extensions: [Document, Paragraph, Text],
    content: props.contentDb ? props.contentDb : 'Type something here',
    onUpdate({ editor }) {
      props.getContent(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
