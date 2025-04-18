import { openDB } from 'idb';

const DB_NAME = 'FileStorageDB';
const STORE_NAME = 'files';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

type SaveToIdbParams<T> = {
  key: string;
  data: T;
};

export const saveFileToIdb = async <T>({ key, data }: SaveToIdbParams<T>) => {
  const db = await initDB();
  await db.put(STORE_NAME, { id: key, ...data });
};

export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getFileFromIdb = async (key: string) => {
  const db = await initDB();
  return db.get(STORE_NAME, key);
};

/**
 * Delete a file by key.
 */
export const deleteFileFromIdb = async (key: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
};
