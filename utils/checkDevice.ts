import { UserLocationType } from '@/contexts/UserLocationContext';

export const generateDirectionUrlBasedOnDevice = (
  userLocation: UserLocationType,
  store: any
) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
    userLocation!.lat
  },${userLocation!.lng}&destination=${store.geometry.location.lat},${
    store.geometry.location.lng
  }`;

  // Check if on mobile and attempt to use mobile-specific schemes
  if (isMobile) {
    // iOS devices (Google Maps)
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      directionsUrl = `comgooglemaps://?saddr=${userLocation!.lat},${
        userLocation!.lng
      }&daddr=${store.geometry.location.lat},${store.geometry.location.lng}`;
    }
    // Android devices (Google Maps)
    else if (/Android/.test(navigator.userAgent)) {
      directionsUrl = `geo:${userLocation!.lat},${userLocation!.lng}?q=${
        store.geometry.location.lat
      },${store.geometry.location.lng}`;
    }
  }

  return directionsUrl;
};
