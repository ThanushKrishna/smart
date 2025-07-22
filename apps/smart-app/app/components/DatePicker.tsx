import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

interface IDatePickerProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  selectedDate?: Date | undefined;
  disabled?: boolean;
}

export const DatePickerComponent: React.FC<IDatePickerProps> = ({
  name, 
  placeholder,
  selectedDate,
  control,
  disabled,
}) => {  
  const parsedDate = selectedDate !== undefined ? dayjs(selectedDate).startOf('day') : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <label className="block font-semibold mb-1 text-slate-700">{placeholder}</label>
        <Controller
          name={name}
          control={control}
          defaultValue={parsedDate}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value || null}
              disabled={disabled}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    className:
                      "w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-900 shadow-sm transition " +
                      "focus:border-purple-500 focus:ring-2 focus:ring-purple-200 hover:border-purple-400 " +
                      "disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none",
                    style: {
                      borderRadius: '0.5rem', // rounded-lg
                      height: '40px',         // h-10
                      minHeight: '0',
                      paddingTop: '0.5rem',   // py-2
                      paddingBottom: '0.5rem',
                    },
                  },
                  // Remove MUI's default margin for a tighter layout
                  sx: {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                },
                // Remove scroll on calendar popper
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      marginTop: '4px',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 24px 0 rgba(80, 63, 205, 0.08)',
                      border: '1px solid #a78bfa',
                      maxHeight: 'none',
                    },
                    '& .MuiPickersCalendarHeader-root': {
                      paddingTop: '0.5rem',
                    },
                    '& .MuiPickersSlideTransition-root': {
                      minHeight: '280px',
                    },
                    '& .MuiDayCalendar-slideTransition': {
                      minHeight: '220px',
                    },
                    '& .MuiDayCalendar-monthContainer': {
                      minHeight: '220px',
                    },
                    '& .MuiPickersDay-root': {
                      borderRadius: '0.5rem',
                      fontWeight: 500,
                    },
                  },
                },
              }}
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
};