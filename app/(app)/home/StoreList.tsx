import useUserLocation from '@/hooks/useUserLocation';
import { Store } from '@/types/Store';
import { generateDirectionUrlBasedOnDevice } from '@/utils/checkDevice';
import { capitalizeFirstWord } from '@/utils/helper';
import Link from 'next/link';
import React from 'react';

const StoreList = ({ stores }: { stores: Store[] | null }) => {
  const { userLocation } = useUserLocation();

  if (stores === null) {
    return null;
  }

  if (stores && stores.length === 0) {
    return (
      <div className="w-full lg:w-2/3">
        {' '}
        <div className="text-center mt-10">
          <p className="text-lg font-semibold text-gray-700">
            😔 No Adidas stores found nearby.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Unfortunately, we couldnt find any Adidas stores near your location.
            Try searching in a different area or check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3">
      <h2 className="text-md font-bold text-black mb-4">
        Nearest Adidas Stores
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {stores.map((store: Store) => {
            const directionsUrl = generateDirectionUrlBasedOnDevice(
              userLocation,
              store
            );
            return (
              <li key={store.place_id} className="grid grid-cols-2 gap-4 p-4 ">
                <div className="truncate w-full">
                  <Link
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-md font-medium text-black hover:text-blue-500 transition-colors"
                  >
                    {capitalizeFirstWord(store.name)}
                  </Link>
                </div>
                <span className="text-sm text-gray-500">{store.vicinity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoreList;
