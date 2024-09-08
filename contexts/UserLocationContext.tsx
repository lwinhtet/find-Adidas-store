'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type UserLocationType = {
  lat: number;
  lng: number;
} | null;

export type UserLocationContextType = {
  userLocation: UserLocationType;
  getUserLocation: () => void;
  locationPermission: PermissionState | undefined;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const initState = {
  userLocation: null,
  getUserLocation: () => {},
  locationPermission: undefined,
  isLoading: false,
  setIsLoading: () => {},
};

const UserLocationContext = createContext<UserLocationContextType>(initState);

export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<UserLocationType>(null);
  const [locationPermission, setLocationPermission] = useState<
    PermissionState | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const getUserLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Success: fetched user location');
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(`Error occurred: ${error.message}`);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: 'geolocation',
        });
        // 'granted', 'denied', or 'prompt'
        setLocationPermission(permissionStatus.state);
      } catch (error) {
        console.error('Error checking permission status:', error);
      }
    };

    checkLocationPermission();
  }, []);

  return (
    <UserLocationContext.Provider
      value={{
        userLocation,
        getUserLocation,
        locationPermission,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationContext;
