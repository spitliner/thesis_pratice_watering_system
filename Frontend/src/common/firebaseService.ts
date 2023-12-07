import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function GetAvatarByUserId(userId: string) {
  const fileRef = ref(storage, `DADN/users/uid-${userId}/avatar`);
  const fileURL = await getDownloadURL(fileRef);
  return fileURL.toString();
}

export async function UploadAvatarByUserId(userId: string, image: File) {
  const fileRef = ref(storage, `DADN/users/uid-${userId}/avatar`);
  return uploadBytes(fileRef, image);
}
