// import { getFirestore, collection, addDoc } from 'firebase/firestore';

// interface Store {
//   name: string;
//   lat: number;
//   lng: number;
// }

// const stores: Store[] = [
//   { name: 'adidas Sneaker Collect - Suria KLCC', lat: 13.7563, lng: 100.5018 },
//   {
//     name: 'adidas Home of Sports, Mid Valley Megamall',
//     lat: 13.7513,
//     lng: 100.5061,
//   },
//   { name: 'Adidas Store 3', lat: 13.7437, lng: 100.5334 },
// ];

// const db = getFirestore();

// const addStore = async (name: string, lat: number, lng: number) => {
//   try {
//     const docRef = await addDoc(collection(db, 'stores'), {
//       name,
//       lat,
//       lng,
//     });
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };

// export default async function getStore(collection, id) {
//   // let docRef = doc(db, collection, id);
//   // let result = null;
//   // let error = null;
//   // try {
//   //     result = await getDoc(docRef);
//   // } catch (e) {
//   //     error = e;
//   // }
//   // return { result, error };
// }
