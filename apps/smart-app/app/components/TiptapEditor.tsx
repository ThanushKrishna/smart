import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_APP_USERS_NOTES, ADD_APP_USERS_NOTES } from '@/graphql/queries';
import { getUserFromCookie } from '../../utils/auth';

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
  const { loading, error, data } = useQuery(GET_APP_USERS_NOTES, {
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

  // Autosave logic
  const autosaveTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!open) return;
    if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);
    autosaveTimeout.current = setTimeout(() => {
      if (userId) {
        addNotes({ variables: { input1: userId, input2: content } });
      }
    }, 800); // 800ms debounce
    return () => {
      if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);
    };
    // eslint-disable-next-line
  }, [content, userId, open]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  // Open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition"
      >
        Notes
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={popupRef}
            className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-purple-200 w-[95vw] max-w-xl p-4 sm:p-6 flex flex-col gap-4"
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'default',
              zIndex: 1000,
            }}
          >
            <div
              className="w-full flex items-center justify-between mb-2"
              style={{ userSelect: 'none' }}
            >
              <h2 className="text-xl font-bold text-purple-900">Your Notes</h2>
            </div>
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
            <div className="flex w-full h-40 rounded-xl border border-purple-300 shadow overflow-hidden bg-white">
              <div className="bg-purple-50 text-purple-700 text-xs py-3 px-2 flex flex-col items-end select-none min-w-[2.5rem]"></div>
              <textarea
                className={`w-full h-full resize-none p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 bg-transparent ${fontSize}`}
                style={{ fontFamily }}
                value={content}
                onChange={handleChange}
                placeholder="Write your notes here..."
                spellCheck={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TiptapEditor;