<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <pre>{{ $data }}</pre>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutApp',
  props: {
    msg: String
  },
  data () {
    return {
      num1: 0,
      num2: 0,
      comments: [],
      counter: 0
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button {
  border: none;
  color: white;
  padding: 0.5em 1em;
  border-radius: 3px;
}

button.active {
  background: orchid;
}

</style>
