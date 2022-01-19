<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <pre>{{ $data }}</pre>

    <div class="comments">
      <ul>
        <li v-for="comment in comments" :key="comment">
          {{ comment }}
        </li>
      </ul>
      <input
        v-model="newComment"
        @keyup.enter="addComment"
        placeholder="Enter message"/>
    </div>
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
      newComment: '',
      comments: []
    }
  },
  methods: {
    addComment () {
      if (!this.newComment) {
        return
      }

      const comments: string[] = this.comments ? this.comments : []
      comments.push(this.newComment)
      this.newComment = ''
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
