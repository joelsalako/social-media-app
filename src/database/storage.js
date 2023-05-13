//import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './config';
import uuid from 'react-uuid';

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export async function uploadPicture(file) {
  try {
    const storageRef = ref(storage, uuid() + '--' + file.name);

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Snapshot: ', snapshot);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch {
    return null;
  }
}
