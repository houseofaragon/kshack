<template>
  <div class="home">
    <AboutApp msg="Learning about methods"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AboutApp from '@/components/AboutApp.vue' // @ is an alias to /src

export default defineComponent({
  name: 'About',
  components: {
    AboutApp
  }
})
</script>
