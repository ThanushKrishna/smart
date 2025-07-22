import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form';

interface DropDownControlProps<T> {
  name: string;
  control: Control<any>;
  options: { value: string }[];
  placeholder: string;
  value?: string;
  isCorporate?: (value: Boolean) => void;
}

export const DropDownControl: React.FC<DropDownControlProps<any>> = ({
  name,
  control,
  options,
  placeholder,
  value,
  isCorporate
}) => {
  const [ddValue, setddValue] = useState<string>("");

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === "CORPORATE" && isCorporate) {
      isCorporate(true);
      return;
    }
    if (isCorporate) isCorporate(false);
  };

  useEffect(() => {
    if (value === "CORPORATE" && isCorporate) {
      isCorporate(true);
    }
    // eslint-disable-next-line
  }, [isCorporate]);

  return (
    <div>
      <label className="block light mb-1 text-slate-700">{placeholder}</label>
      <div className="pb-2">
        <Controller
          name={name}
          control={control}
          defaultValue={value || ''}
          render={({ field }) => (
            <select
              {...field}
              className="md:w-full w-full bg-white rounded-lg border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 py-2 text-base text-slate-900 shadow-sm transition"
              onChange={e => {
                field.onChange(e);
                handleValueChange(e.target.value);
              }}
            >
              <option value="" disabled className="md:w-full w-full bg-white rounded-lg border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 py-2 text-base text-slate-900 shadow-sm transition">        
              </option>
              {options && options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </div>
  );
};