<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="comments">
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label><br/>
                <input id="name" type="text" v-model="name" required />
            </div>
            <div>
                <label for="email">Email:</label><br/>
                <input id="email" type="text" v-model="email" required />
            </div>
            <button :class="[(name && email) ? activeClass : '']" type="submit">Submit</button>
            <div>
                <h3>Response from server:</h3>
                <pre v-show="showLoader">Loading ...</pre>
                <pre>{{ response }} </pre>
            </div>
        </form>
        <div>
            <div v-show="entries && entries.length > 0">
                <form @submit.prevent="filterEntries">
                    <label for="searchQuery">Search:</label><br/>
                    <input id="searchQuery" type="text" v-model="searchQuery" />
                    <button class="active" type="submit">Submit</button>
                </form>
                <h3>Search by Category <input id="searchQuery" type="text" v-model="searchQuery" /></h3>
            </div>
            <h3 v-show="entries && entries.length > 0">
                Sort titles by:
                <button class="active" @click="sortAsc" type="submit">Asc</button>
                <button class="active" @click="sortDesc" type="submit">Desc</button>
            </h3>
            <table>
                <thead>
                    <tr>
                    <th v-for="key in columns" :key="key">
                        {{ key }}
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in filteredEntries" :key="entry">
                        <td v-for="key in columns" :key="entry[key]">
                            {{entry[key]}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

interface Entry {
    API: string;
    Description: string;
    Auth: string;
    HTTPS: string;
    Cors: string;
    Link: string;
    Category: string;
}

export default defineComponent({
  name: 'FormApp',
  props: {
    msg: String
  },
  data () {
    return {
      name: '',
      email: '',
      response: '',
      activeClass: 'active',
      showLoader: false,
      entries: [] as Entry[],
      columns: [] as string[],
      searchQuery: ''
    }
  },
  methods: {
    async submitForm () {
      this.showLoader = true
      const responseData = await axios.get('https://api.publicapis.org/entries')
      this.showLoader = false
      const { count, entries } = responseData.data
      this.response = count
      this.entries = entries
      this.columns = Object.keys(entries[0])
    },
    sortAsc () {
      return this.entries.sort((a, b) => a.API > b.API ? 1 : -1)
    },
    sortDesc () {
      return this.entries.sort((a, b) => a.API < b.API ? 1 : -1)
    }
  },
  computed: {
    filteredEntries () {
      if (!this.searchQuery) {
        return this.entries
      }
      const filter = new RegExp(this.searchQuery, 'i')
      return this.entries.filter(entry => entry.Category.match(filter))
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
