import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC8EkH6KUj0MriGzgmIAI2qytTFxOXrrDA",
  authDomain: "files-24fce.firebaseapp.com",
  projectId: "files-24fce",
  storageBucket: "files-24fce.appspot.com",
  messagingSenderId: "895464023825",
  sappId: "1:895464023825:web:e34f8d53ae2bdfbe3d0eb0"
}

initializeApp(firebaseConfig)

const db = getStorage()

export { db }