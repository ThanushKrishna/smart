import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_APP_USERS_NOTES, ADD_APP_USERS_NOTES } from '@/graphql/queries';
import { getUserFromCookie } from '../../utils/auth';

// Font families and sizes for dropdowns
const FONT_FAMILIES = [
  { label: 'Sans', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Mono', value: 'monospace' },
  { label: 'Cursive', value: 'cursive' },
  { label: 'Fantasy', value: 'fantasy' },
];

const FONT_SIZES = [
  { label: 'Small', value: 'text-sm' },
  { label: 'Normal', value: 'text-base' },
  { label: 'Large', value: 'text-lg' },
  { label: 'XL', value: 'text-xl' },
  { label: '2XL', value: 'text-2xl' },
];

const TiptapEditor: React.FC = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const decodedToken = getUserFromCookie();
    if (decodedToken && typeof decodedToken === 'object') {
      setUserId(decodedToken.userid);
    }
  }, []);

  const [addNotes] = useMutation(ADD_APP_USERS_NOTES);
  const { loading, error, data, refetch } = useQuery(GET_APP_USERS_NOTES, {
    variables: { input: userId },
    skip: !userId,
  });

  const [content, setContent] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<string>('sans-serif');
  const [fontSize, setFontSize] = useState<string>('text-base');
  

  useEffect(() => {
    if (!loading && !error && data) {
      setContent(data.getNotesForUser || '');
    }
  }, [loading, error, data]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    await addNotes({ variables: { input1: userId, input2: content } });
    refetch();
    setOpen(false); // Close modal after save
  };
  
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
  // Center the popup on open
  setPosition({
    x: window.innerWidth / 2 - 320, // 320px is half of max-w-xl (640px)
    y: window.innerHeight / 2 - 192, // 192px is half of 384px (h-96)
  });
  setOpen(true);
};

  // Split content into lines for line numbers
  const lines = content.split('\n');

   // Movable popup state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, offset]);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition `}
      >
        Notes
      </button>
       {open && (
  <div className="fixed inset-0 z-50 pointer-events-none">
    <div
      ref={popupRef}
      className="pointer-events-auto bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 flex flex-col gap-4 absolute border border-purple-200"
      style={{
        left: position.x || `calc(50% - 320px)`,
        top: position.y || `calc(50% - 192px)`,
        cursor: dragging ? 'grabbing' : 'default',
        width: '90vw',
        maxWidth: '640px',
      }}
    >
      <div
        className="w-full flex items-center justify-between cursor-move mb-2"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        <h2 className="text-xl font-bold text-purple-900">Your Notes</h2>
        <button
          onClick={handleClose}
          className="text-purple-400 hover:text-purple-700 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      {/* Advanced Options */}
      <div className="flex flex-wrap gap-4 mb-2">
        <div>
          <label className="text-xs text-purple-700 mr-2">Font Family:</label>
          <select
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            className="rounded-3xl border border-purple-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {FONT_FAMILIES.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-purple-700 mr-2">Font Size:</label>
          <select
            value={fontSize}
            onChange={e => setFontSize(e.target.value)}
            className="rounded-3xl border border-purple-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {FONT_SIZES.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>      
      </div>
      {/* Editor with line numbers */}
      <div className="flex w-full h-40 rounded-xl border border-purple-300 shadow overflow-hidden bg-white">
        <div className="bg-purple-50 text-purple-700 text-xs py-3 px-2 flex flex-col items-end select-none min-w-[2.5rem]">          
        </div>
        <textarea
          className={`w-full h-full resize-none p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 bg-transparent ${fontSize}`}
          style={{ fontFamily }}
          value={content}
          onChange={handleChange}
          placeholder="Write your notes here..."
          spellCheck={true}
        />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-3xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 text-purple-900 shadow hover:bg-purple-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white shadow hover:bg-purple-800 transition"
        >
          Save & Close
        </button>
      </div>     
    </div>
  </div>
)}
    </>
  );
};

export default TiptapEditor;