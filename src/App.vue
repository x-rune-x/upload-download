<template>
  <div>
    <button @click="downloadFile">Download</button>
    <a>Download</a>
  </div>
  <div>
    <input type="file" @change="changeFile">
  <button @click="storeFile(fileToUpload)">Upload</button>
  </div> 
  <div v-if="message">{{ message }}</div>

</template>

<script>
import { db } from '../firebase/config'
import { getBytes, getDownloadURL, ref as firebaseRef, uploadBytes } from '@firebase/storage'
import { onMounted, ref } from 'vue'

export default {
  name: 'App',

  setup() {
    const fileToUpload = ref(null)
    const message = ref(null)  
    const fileToDownload = ref(null) 

    onMounted(() => {
      console.log("Page mounted")
      downloadFile()

      const storageRef = firebaseRef(db, "testDoc.txt")
      getDownloadURL(storageRef).then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          var a = document.querySelector("a")
          a.href = window.URL.createObjectURL(blob)
          const date = new Date().toISOString()
          console.log(date)
          a.download = `testDoc${date}.txt`
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(url)
      })
      .catch((error) => {
        console.log(error.message)
      })
    })

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
        document.querySelector('input').value=''
      }).catch((err) => {
        console.log(err)
        message.value = 'There was an error uploading the file.'
      })
    }

    const downloadFile = async () => {
      const pathReference = firebaseRef(db, 'testDoc.txt')
      const file = await getBytes(pathReference)
      console.log(file)

      fileToDownload.value = file      
    }    

    return { changeFile, storeFile, downloadFile, fileToUpload, message, fileToDownload }
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
