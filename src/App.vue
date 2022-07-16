<template>
  <div>
    <a href="">
      <button>Download</button>
    </a>    
  </div>
  <div>
    <input type="file" @change="changeFile">
  <button @click="storeFile(fileToUpload)">Upload</button>
  </div> 
  <div v-if="message">{{ message }}</div>

</template>

<script>
import { db } from '../firebase/config'
import { getBytes, ref as firebaseRef, uploadBytes } from '@firebase/storage'
import { ref } from 'vue'

export default {
  name: 'App',

  setup() {
    const fileToUpload = ref(null)
    const message = ref(null)

    const changeFile = (file) => {
      const selected = file.target.files[0]
      console.log(selected)
      fileToUpload.value = selected
      console.log(fileToUpload.value)
    }

    const storeFile = async (file) => {
      const storageRef = firebaseRef(db, file.name)
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot)
        message.value = 'File uploaded successfully!'
      }).catch((err) => {
        console.log(err)
        message.value = 'There was an error uploading the file.'
      })
    }

    const downloadFile = async () => {
      const pathReference = ref(db, 'testDoc.txt')
      const file = getBytes(pathReference)
    }

    return { changeFile, storeFile, fileToUpload, message }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
