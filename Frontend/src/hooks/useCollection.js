import { useEffect, useState } from "react";
import { projFirestore } from "../config/firebase";

export const useCollection = (collection) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);

  // a subscription to a firestore collection hence useEffect
  useEffect(() => {
    let ref = projFirestore.collection(collection);

    // snapshot function takes 2 funcs as callbacks
    // second one is error func- hence try/catch not needed
    const unsub = ref.onSnapshot(
      (snapshot) => {
        // javascript array to store the results of the collection
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // attach the array to the state -> which we can then return
        setDocs(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch");
      }
    );

    // unsubscribe from the snapshot listening if unmount
    return () => unsub();
  }, [collection]);

  return { docs, error };
};
