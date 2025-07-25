"use client"
import React, { useState } from 'react';
import MasterComponent from '@/app/components/MasterComponent';
import {
  ADD_MAKE, UPDATE_MAKE, DELETE_MAKEDATA, GET_MAKE_BY_VALUE,
  ADD_VEHICLE_COLORS, UPDATE_VEHICLE_COLOR, DELETE_VEHICLE_COLOR_DATA, GET_VEHICLE_COLOR_BY_VALUE,
  ADD_VEHICE_NORMS, UPDATE_VEHICLE_NORMS, DELETE_VEHICLE_NORMS_DATA, GET_VEHICLE_NORMS_BY_VALUE,
  ADD_CC, UPDATE_CC, DELETE_CC_DATA, GET_CC_BY_VALUE,
  ADD_MODEL, UPDATE_MODEL, DELETE_MODEL_DATA, GET_MODEL_BY_VALUE,
  ADD_INSURANCE_PROVIDER, UPDATE_INSURANCE_PROVIDER, DELETE_INSURANCE_PROVIDER_DATA, GET_INSURANCE_PROVIDER_BY_VALUE,
  ADD_PERMIT_CATEGORY, UPDATE_PERMIT_CATEGORY, DELETE_PERMIT_CATEGORY_DATA, GET_PERMIT_CATEGORY_BY_VALUE,
  ADD_TP_INSURANCE_PROVIDER, UPDATE_TP_INSURANCE_PROVIDER, DELETE_TP_INSURANCE_PROVIDER_DATA, GET_TP_INSURANCE_PROVIDER_BY_VALUE,
  ADD_VEHICLE_CLASS, UPDATE_VEHICLE_CLASS, DELETE_VEHICLE_CLASS_DATA, GET_VEHICLE_CLASS_BY_VALUE,
  ADD_CUSTOMER_TYPE, UPDATE_CUSTOMER_TYPE, DELETE_CUSTOMER_TYPE_DATA, GET_CUSTOMER_TYPE_BY_VALUE,
  ADD_VEHICLE_DESCRIPTION, UPDATE_VEHICLE_DESCRIPTION, DELETE_VEHICLE_DESCRIPTION_DATA, GET_VEHICLE_DESCRIPTION_BY_VALUE,
  ADD_SEATING_CAPACITY, UPDATE_SEATING_CAPACITY, DELETE_SEATING_CAPACITY_DATA, GET_SEATING_CAPACITY_BY_VALUE,
  ADD_STANDING_CAPACITY, UPDATE_STANDING_CAPACITY, DELETE_STANDING_CAPACITY_DATA, GET_STANDING_CAPACITY_BY_VALUE,
  ADD_RTO, UPDATE_RTO, DELETE_RTO_DATA, GET_RTO_BY_VALUE,
  ADD_HYPOTHECATION_BANK, UPDATE_HYPOTHECATION_BANK, DELETE_HYPOTHECATION_BANK_DATA, GET_HYPOTHECATION_BANK_BY_VALUE,
  ADD_HYPOTHECATION_CITY, UPDATE_HYPOTHECATION_CITY, DELETE_HYPOTHECATION_CITY_DATA, GET_HYPOTHECATION_CITY_BY_VALUE,
  ADD_UNLADEN_WEIGHT, UPDATE_UNLADEN_WEIGHT, DELETE_UNLADEN_WEIGHT_DATA, GET_UNLADEN_WEIGHT_BY_VALUE,
  ADD_GVW, UPDATE_GVW, DELETE_GVW_DATA, GET_GVW_BY_VALUE,
  ADD_VEHICLE_BODY, UPDATE_VEHICLE_BODY, DELETE_VEHICLE_BODY_DATA, GET_VEHICLE_BODY_BY_VALUE,
  ADD_WHEEL_BASE, UPDATE_WHEEL_BASE, DELETE_WHEEL_BASE_DATA, GET_WHEEL_BASE_BY_VALUE,
  ADD_NO_OF_CYLINDER, UPDATE_NO_OF_CYLINDER, DELETE_NO_OF_CYLINDER_DATA, GET_NO_OF_CYLINDER_BY_VALUE,
  ADD_SLEEPER_CAPACITY, UPDATE_SLEEPER_CAPACITY, DELETE_SLEEPER_CAPACITY_DATA, GET_SLEEPER_CAPACITY_BY_VALUE,
  ADD_UPDATED_BY, UPDATE_UPDATED_BY, DELETE_UPDATED_BY_DATA, GET_UPDATED_BY_BY_VALUE,
  ADD_REFERRED_BY, UPDATE_REFERRED_BY, DELETE_REFERRED_BY_DATA, GET_REFERRED_BY_BY_VALUE
} from '@/graphql/queries';
import withAuth from '../middleware/withAuth';

const entities = [
  { name: 'CC', dname: 'Cubic Capacity', queries: { getAll: GET_CC_BY_VALUE, add: ADD_CC, update: UPDATE_CC, delete: DELETE_CC_DATA } },    
  { name: 'VEHICLE_NORMS', dname: 'Emission Norms', queries: { getAll: GET_VEHICLE_NORMS_BY_VALUE, add: ADD_VEHICE_NORMS, update: UPDATE_VEHICLE_NORMS, delete: DELETE_VEHICLE_NORMS_DATA } },
  { name: 'HYPOTHECATION_BANK', dname: 'Hypothecation Bank', queries: { getAll: GET_HYPOTHECATION_BANK_BY_VALUE, add: ADD_HYPOTHECATION_BANK, update: UPDATE_HYPOTHECATION_BANK, delete: DELETE_HYPOTHECATION_BANK_DATA } },
  { name: 'HYPOTHECATION_CITY', dname: 'Hypothecation City', queries: { getAll: GET_HYPOTHECATION_CITY_BY_VALUE, add: ADD_HYPOTHECATION_CITY, update: UPDATE_HYPOTHECATION_CITY, delete: DELETE_HYPOTHECATION_CITY_DATA } },  
  { name: 'GVW', dname: 'Laden Weight (GVW):', queries: { getAll: GET_GVW_BY_VALUE, add: ADD_GVW, update: UPDATE_GVW, delete: DELETE_GVW_DATA } },
  { name: 'MAKE', dname: 'Make', queries: { getAll: GET_MAKE_BY_VALUE, add: ADD_MAKE, update: UPDATE_MAKE, delete: DELETE_MAKEDATA } },
  { name: 'MODEL', dname: 'Model', queries: { getAll: GET_MODEL_BY_VALUE, add: ADD_MODEL, update: UPDATE_MODEL, delete: DELETE_MODEL_DATA } },
  { name: 'NO_OF_CYLINDER', dname: 'No of Cylinders', queries: { getAll: GET_NO_OF_CYLINDER_BY_VALUE, add: ADD_NO_OF_CYLINDER, update: UPDATE_NO_OF_CYLINDER, delete: DELETE_NO_OF_CYLINDER_DATA } },
  { name: 'INSURANCE_PROVIDER', dname: 'Own Damage Insurance Provider', queries: { getAll: GET_INSURANCE_PROVIDER_BY_VALUE, add: ADD_INSURANCE_PROVIDER, update: UPDATE_INSURANCE_PROVIDER, delete: DELETE_INSURANCE_PROVIDER_DATA } },
  { name: 'PERMIT_CATEGORY', dname: 'Permit Category', queries: { getAll: GET_PERMIT_CATEGORY_BY_VALUE, add: ADD_PERMIT_CATEGORY, update: UPDATE_PERMIT_CATEGORY, delete: DELETE_PERMIT_CATEGORY_DATA } },
  { name: 'CUSTOMER_TYPE', dname: 'Policy Issued Through', queries: { getAll: GET_CUSTOMER_TYPE_BY_VALUE, add: ADD_CUSTOMER_TYPE, update: UPDATE_CUSTOMER_TYPE, delete: DELETE_CUSTOMER_TYPE_DATA } },
  { name: 'REFERRED_BY', dname: 'Referred By', queries: { getAll: GET_REFERRED_BY_BY_VALUE, add: ADD_REFERRED_BY, update: UPDATE_REFERRED_BY, delete: DELETE_REFERRED_BY_DATA } },
  { name: 'RTO', dname: 'Registering Authority', queries: { getAll: GET_RTO_BY_VALUE, add: ADD_RTO, update: UPDATE_RTO, delete: DELETE_RTO_DATA } },
  { name: 'SEATING_CAPACITY', dname: 'Seating Capacity', queries: { getAll: GET_SEATING_CAPACITY_BY_VALUE, add: ADD_SEATING_CAPACITY, update: UPDATE_SEATING_CAPACITY, delete: DELETE_SEATING_CAPACITY_DATA } },
  { name: 'SLEEPER_CAPACITY', dname: 'Sleeper Capacity', queries: { getAll: GET_SLEEPER_CAPACITY_BY_VALUE, add: ADD_SLEEPER_CAPACITY, update: UPDATE_SLEEPER_CAPACITY, delete: DELETE_SLEEPER_CAPACITY_DATA } },
  { name: 'STANDING_CAPACITY', dname: 'Standing Capacity', queries: { getAll: GET_STANDING_CAPACITY_BY_VALUE, add: ADD_STANDING_CAPACITY, update: UPDATE_STANDING_CAPACITY, delete: DELETE_STANDING_CAPACITY_DATA } },
  { name: 'TP_INSURANCE_PROVIDER', dname: 'Third Party Insurance Provider', queries: { getAll: GET_TP_INSURANCE_PROVIDER_BY_VALUE, add: ADD_TP_INSURANCE_PROVIDER, update: UPDATE_TP_INSURANCE_PROVIDER, delete: DELETE_TP_INSURANCE_PROVIDER_DATA } },
  { name: 'UNLADEN_WEIGHT', dname: 'Unladen Weight', queries: { getAll: GET_UNLADEN_WEIGHT_BY_VALUE, add: ADD_UNLADEN_WEIGHT, update: UPDATE_UNLADEN_WEIGHT, delete: DELETE_UNLADEN_WEIGHT_DATA } },
  { name: 'UPDATED_BY', dname: 'Updated By', queries: { getAll: GET_UPDATED_BY_BY_VALUE, add: ADD_UPDATED_BY, update: UPDATE_UPDATED_BY, delete: DELETE_UPDATED_BY_DATA } },
  { name: 'VEHICLE_BODY', dname: 'Vehicle Body', queries: { getAll: GET_VEHICLE_BODY_BY_VALUE, add: ADD_VEHICLE_BODY, update: UPDATE_VEHICLE_BODY, delete: DELETE_VEHICLE_BODY_DATA } },
  { name: 'VEHICLE_CLASS', dname: 'Vehicle Class', queries: { getAll: GET_VEHICLE_CLASS_BY_VALUE, add: ADD_VEHICLE_CLASS, update: UPDATE_VEHICLE_CLASS, delete: DELETE_VEHICLE_CLASS_DATA } },
  { name: 'VEHICLE_COLOR', dname: 'Vehicle Color', queries: { getAll: GET_VEHICLE_COLOR_BY_VALUE, add: ADD_VEHICLE_COLORS, update: UPDATE_VEHICLE_COLOR, delete: DELETE_VEHICLE_COLOR_DATA } },
  { name: 'VEHICLE_DESCRIPTION', dname: 'Vehicle Description', queries: { getAll: GET_VEHICLE_DESCRIPTION_BY_VALUE, add: ADD_VEHICLE_DESCRIPTION, update: UPDATE_VEHICLE_DESCRIPTION, delete: DELETE_VEHICLE_DESCRIPTION_DATA } },  
  { name: 'WHEEL_BASE', dname: 'Wheel Base', queries: { getAll: GET_WHEEL_BASE_BY_VALUE, add: ADD_WHEEL_BASE, update: UPDATE_WHEEL_BASE, delete: DELETE_WHEEL_BASE_DATA } }
];

function Master() {
  const [selectedEntity, setSelectedEntity] = useState(entities[0]); // Default to the first entity

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-2 md:px-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold text-purple-900 mb-4 text-center">Master Data</h2>
        <ul className="flex flex-wrap md:flex-col gap-2 md:gap-0">
          {entities.sort((a, b) => a.dname.localeCompare(b.dname)).map((entity) => (
            <li key={entity.name}>
              <button
                className={`w-full text-left px-4 py-2 rounded-3xl font-semibold transition text-sm md:text-base mb-2
                  ${selectedEntity.name === entity.name
                    ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white shadow'
                    : 'bg-white text-purple-900 border border-purple-300 hover:bg-purple-100'}
                `}
                onClick={() => setSelectedEntity(entity)}
                type="button"
              >
                {entity.dname}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Content */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
        <MasterComponent
          entityName={selectedEntity.name}
          entityDname={selectedEntity.dname}
          queries={selectedEntity.queries}
        />
      </div>
    </div>
  );
}

export default withAuth(Master);