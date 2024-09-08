import UserLocationContext from '@/contexts/UserLocationContext';
import { useContext } from 'react';

const useUserLocation = () => useContext(UserLocationContext);

export default useUserLocation;
