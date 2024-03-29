import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_APP_USERS_NOTES, ADD_APP_USERS_NOTES } from '@/graphql/queries' 
import {Modal, Box } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { getUserFromCookie } from '../../utils/auth';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    p: 4,
  };

const TiptapEditor: React.FC = () => {

  const [userId, setUserId] = useState('');
  useEffect(() => {        
      const decodedToken = getUserFromCookie();        
      if(decodedToken  && typeof decodedToken === 'object' ){
          //console.log('userid from token:' +  decodedToken.userid);
          setUserId(decodedToken.userid);
      }
    }, []);

  
  const[addNotes, { data:notesdata, error:addclienterror } ] = useMutation(ADD_APP_USERS_NOTES);

  const { loading: getNotesLoad, error:getNoteserror, data:getNotes } = useQuery(GET_APP_USERS_NOTES, {
    variables: { input: userId },    
    skip: !userId,       
    });

  const [content, setContent] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (!getNotesLoad && !getNoteserror && getNotes) {
      setContent(getNotes.getNotesForUser || 'Not Set during Load');
    }
  }, [getNotesLoad, getNoteserror, getNotes]);

  //console.log(content);

  const onChange = (event:any) => {
    setContent(event.target.value);    
    addNotes( { variables: { input1:userId, input2: event.target.value}, })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
   <button onClick={handleOpen}>NOTES</button>
      <Modal open={open} onClose={handleClose} sx={{ height: 'auto' }}>        
         <Box sx={style}>
         <Textarea
          className="w-full height: '40%' text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-black border border-solid border-slate-400 hover:border-gray-900 focus:border-grey-800 bg-white text-slate-900 focus-visible:outline-0"
          aria-label="Demo input"                
          minRows={3}     
          maxRows={30}                  
          defaultValue={content}
          onBlur={onChange}
          />
        </Box>
      </Modal>
    </>
  )
};

export default TiptapEditor;