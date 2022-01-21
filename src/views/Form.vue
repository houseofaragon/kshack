<template>
  <div class="home">
    <FormApp msg="Learning about forms"/>
    <WatchersApp msg="Learning about forms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormApp from '@/components/FormApp.vue' // @ is an alias to /src
import WatchersApp from '@/components/WatchersApp.vue'

export default defineComponent({
  name: 'Form',
  components: {
    FormApp,
    WatchersApp
  }
})
</script>
