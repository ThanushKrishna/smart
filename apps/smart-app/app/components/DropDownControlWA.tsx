import React from 'react'
import { Control, Controller } from 'react-hook-form';
import FormDialog from '@/app/components/FormDialog';

interface DropDownControlWAProps<T> {
  name: string;
  control: Control<any>;
  options: String[] | number[];
  placeholder: string;
  onOptionAdd: (item: String) => void;
  value?: string | undefined;
}

export const DropDownControlWA: React.FC<DropDownControlWAProps<any>> = ({
  name,
  control,
  options,
  placeholder,
  onOptionAdd,
  value
}) => {
  // Numeric sorting for specific fields
  if (
    name === "Seating_Capacity" ||
    name === "Standing_Capacity" ||
    name === "CC" ||
    name === "Sleeper_Capacity" ||
    name === "Unladen_Weight" ||
    name === "GVW" ||
    name === "Wheel_Base" ||
    name === "No_Of_Cylinder"
  ) {
    const numericArray = options?.map(Number).filter(value => !isNaN(value));
    const sortedArray = numericArray?.sort((a, b) => a - b);
    options = sortedArray?.map(String);
  }

  return (
    <div>
      <label className="block font-semibold mb-1 text-slate-700">{placeholder}</label>
      <div className="flex gap-2 items-center pb-2">
        <Controller
          name={name}
          control={control}
          defaultValue={value ? value : ''}
          render={({ field }) => (
            <select
              {...field}
              className="md:w-full w-full bg-white rounded-lg border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 py-2 text-base text-slate-900 shadow-sm transition"
            >
              <option value="" disabled >                
              </option>
              {options && options.map((option: any) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />        
      </div>
      <FormDialog
          placeholder={placeholder}
          onItemAdd={(e: String) => onOptionAdd(e)}
      />
    </div>
  );
};