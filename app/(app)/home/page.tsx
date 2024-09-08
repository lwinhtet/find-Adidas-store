'use client';

import React, { useEffect, useState } from 'react';
import { MapComponent } from './MapComponent';
import { MapProvider } from '@/providers/MapProvider';
import useUserLocation from '@/hooks/useUserLocation';
import LoadingPageIcon from '@/components/LoadingPageIcon';
import StoreList from './StoreList';
import NearestStore from './NearestStore';
import { DistanceType } from '@/types/DistanceType';
import { Store } from '@/types/Store';

const Home = () => {
  const { userLocation, getUserLocation } = useUserLocation();
  const [stores, setStores] = useState<Store[] | null>(null);
  const [nearestStore, setNearestStore] = useState<Store | null>(null);
  const [distance, setDistance] = useState<DistanceType | null>(null);

  useEffect(() => {
    if (!userLocation) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    const fetchNearestStore = async () => {
      if (userLocation !== null) {
        try {
          // Fetch nearest stores from the API
          const response = await fetch(
            `/api/nearest-stores?latitude=${userLocation.lat}&longitude=${userLocation.lng}`
          );
          const nearestStores: Store[] = await response.json();
          setStores(nearestStores);

          if (nearestStores.length > 0) {
            const nearest: Store = nearestStores[0];
            setNearestStore(nearest);

            // Call the new API route to get the distance and duration
            const distanceResponse = await fetch(
              `/api/get-distance?latitude=${userLocation.lat}&longitude=${userLocation.lng}&storeLat=${nearest.geometry.location.lat}&storeLng=${nearest.geometry.location.lng}`
            );
            const distanceData = await distanceResponse.json();
            setDistance(distanceData);
          }
        } catch (error) {
          console.error('Error fetching nearest stores or distance:', error);
        }
      }
    };

    fetchNearestStore();
  }, [userLocation]);

  if (!userLocation) {
    return <LoadingPageIcon className="content-container" />;
  }

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <>
            <h2 className="text-md font-bold text-black mb-4">Your Location</h2>
            <div className="mb-6">
              <MapProvider>
                <MapComponent
                  latitude={userLocation.lat}
                  longitude={userLocation.lng}
                />
              </MapProvider>
            </div>
          </>

          <NearestStore nearestStore={nearestStore} distance={distance} />
        </div>

        <StoreList stores={stores} />
      </div>
    </div>
  );
};

export default Home;
