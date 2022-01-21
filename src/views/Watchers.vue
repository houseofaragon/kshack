<template>
  <div class="home">
    <WatchersApp msg="Learning about forms"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WatchersApp from '@/components/WatchersApp.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Watchers',
  components: {
    WatchersApp
  }
})
</script>
