import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAvnnXG5WMSQO1UDYsW2FOm4i6HtLgHYYM',
  authDomain: 'job-recommend-web.firebaseapp.com',
  projectId: 'job-recommend-web',
  storageBucket: 'job-recommend-web.appspot.com',
  messagingSenderId: '37796186548',
  appId: '1:37796186548:web:371e4c8af9da06bd84cae1'
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
