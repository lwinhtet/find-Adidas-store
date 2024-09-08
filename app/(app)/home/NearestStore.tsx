import useUserLocation from '@/hooks/useUserLocation';
import { DistanceType } from '@/types/DistanceType';
import { Store } from '@/types/Store';
import { generateDirectionUrlBasedOnDevice } from '@/utils/checkDevice';
import { capitalizeFirstWord } from '@/utils/helper';
import { RocketIcon, TimerIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type PropType = {
  nearestStore: Store | null;
  distance: DistanceType | null;
};

const NearestStore = ({ nearestStore, distance }: PropType) => {
  const { userLocation } = useUserLocation();

  if (!nearestStore) {
    return null;
  }
  return (
    <>
      <h2 className="text-md font-bold text-black mb-4">Nearest Store</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <p className="text-md text-gray-800 font-bold">
          {capitalizeFirstWord(nearestStore.name)}
        </p>

        {distance && (
          <div className="mt-4 flex justify-center items-center space-x-7">
            <div className="text-gray-600 flex items-center">
              <RocketIcon className="w-5 h-5" />
              <span className="inline-block pl-3 text-sm ">
                {distance.distanceText}
              </span>
            </div>
            <div className="text-gray-600 flex items-center">
              <TimerIcon className="w-5 h-5" />
              <span className="inline-block pl-3 text-sm">
                {distance.durationText}
              </span>
            </div>
          </div>
        )}

        <Link
          href={generateDirectionUrlBasedOnDevice(userLocation, nearestStore)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 w-full text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Directions
        </Link>
      </div>
    </>
  );
};

export default NearestStore;
