import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { tAddress } from '@/typings';

interface AddressFormProps {
  register: UseFormRegister<any>,
  errors: any,
  addressType: string,
  placehoder: string
  defaultAddress?: tAddress
}

const AddressForm: React.FC<AddressFormProps> = ({ register, errors, defaultAddress, addressType, placehoder }) => {
  return (
    <>
      <p className="font-semibold mb-2">{placehoder}</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block font-medium mb-1">Street</label>
          <input
            type="text"
            {...register(addressType + '.street')}
            // defaultValue={defaultAddress?.street}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"

          />
          {errors?.[addressType]?.street && (
            <p className="text-xs text-red-600 mt-1">{errors?.[addressType]?.street?.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            {...register(addressType + '.city')}
            // defaultValue={defaultAddress?.city}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"

          />
          {errors?.[addressType]?.city && (
            <p className="text-xs text-red-600 mt-1">{errors?.[addressType]?.city?.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">State</label>
          <input
            type="text"
            {...register(addressType + '.state')}
            // defaultValue={defaultAddress?.state}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"

          />
          {errors?.[addressType]?.state && (
            <p className="text-xs text-red-600 mt-1">{errors?.[addressType]?.state?.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Pin</label>
          <input
            type="text"
            {...register(addressType + '.zip', {
              pattern: {
                value: /^\d{6}$/,
                message: 'Zip code should be a 6-digit number',
              },
            })}
            // defaultValue={defaultAddress?.zip}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"

          />
          {errors?.[addressType]?.zip && (
            <p className="text-xs text-red-600 mt-1">{errors?.[addressType]?.zip?.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressForm;