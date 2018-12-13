<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

const fs = require('fs')
const childProcess = require('child_process')

console.log('fs', fs)
console.log('child_process', childProcess)

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
