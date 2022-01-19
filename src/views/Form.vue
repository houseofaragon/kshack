<template>
  <div class="home">
    <FormApp msg="Learning about forms"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormApp from '@/components/FormApp.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Form',
  components: {
    FormApp
  }
})
</script>
