import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor, FloatingMenu, BubbleMenu, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useQuery, useMutation } from '@apollo/client';
import { GET_APP_USERS_NOTES, ADD_APP_USERS_NOTES } from '@/graphql/queries' 
import {Modal, Typography, Box } from '@mui/material';
import { Heading, Link, Image, Bold, Italic, Strike } from '@tiptap/extension';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TiptapEditor: React.FC = () => {
  
  const[addNotes, { data:notesdata, error:addclienterror } ] = useMutation(ADD_APP_USERS_NOTES);

  const { loading: getNotesLoad, error:getNoteserror, data:getNotes } = useQuery(GET_APP_USERS_NOTES, {
    variables: { input: "6562047e649b76ef6a583b8d" },           
    });

  const [content, setContent] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (!getNotesLoad && !getNoteserror && getNotes) {      
      setContent(getNotes.getNotesForUser || '');
    }
  }, [getNotesLoad, getNoteserror, getNotes]);

  console.log(content);

  const editor = useEditor({
    extensions: [
        StarterKit,
        Heading.configure({ levels: [1, 2, 3] }),
        Link,
        Image,
        Bold,
        Italic,
        Strike,
      ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor?.getHTML() || '');
      addNotes( { variables: { input1: "6562047e649b76ef6a583b8d", input2: editor?.getHTML() }
    //   , refetchQueries: [{ query: GET_APP_USERS_NOTES, variables: { input: "6562047e649b76ef6a583b8d" } }],
    })
    },
    });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
   <button onClick={handleOpen}>Notes</button>
      <Modal open={open} onClose={handleClose}>        
         <Box sx={style}>
         <EditorProvider editor={editor}>
        {content !== undefined && (
        <>
          <div>
            {/* Buttons for each extension */}
            <button onClick={() => editor.chain().focus().toggleNode({ name: 'heading', attributes: { level: 1 } }).run()}>
              Heading 1
            </button>
            <button onClick={() => editor.chain().focus().toggleMark('link').run()}>
              Link
            </button>
            {/* Add buttons for other extensions as needed */}
          </div>
          <EditorContent />
        {editor && <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>}
        {editor && <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>}
        </>
        )}
        </EditorProvider>
        </Box>
      </Modal>
    </>
  )
};

export default TiptapEditor;