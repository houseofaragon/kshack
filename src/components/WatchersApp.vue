<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="comments">
            <div v-show="apis && apis.length > 0">
                <h3>Search by Category <input id="searchQuery" type="text" v-model="searchQuery" /></h3>
            </div>
            <h3 v-show="apis && filteredApis.length > 0">
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
                    <tr v-for="entry in filteredApis" :key="entry">
                        <td v-for="key in columns" :key="entry[key]">
                            {{entry[key]}}
                        </td>
                    </tr>
                </tbody>
            </table>
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
  name: 'WatchersApp',
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
      apis: [] as Entry[],
      columns: [] as string[],
      searchQuery: '',
      bottom: false
    }
  },
  beforeMount () {
    this.getEntries()
  },
  created () {
    window.addEventListener('scroll', () => {
      this.bottom = this.isBottomVisible()
    })
  },
  methods: {
    async getEntries () {
      this.showLoader = true
      const responseData = await axios.get('https://api.publicapis.org/random')
      this.showLoader = false
      const { count, entries } = responseData.data
      this.response = count
      const apiResponse = entries[0] as Entry
      if (!this.columns) {
        this.columns = Object.keys(apiResponse)
      }

      // add new api
      this.apis.push(apiResponse)

      // keep calling to fill the page
      if (this.isBottomVisible()) {
        this.getEntries()
      }
    },
    sortAsc () {
      return this.apis.sort((a, b) => a.API > b.API ? 1 : -1)
    },
    sortDesc () {
      return this.apis.sort((a, b) => a.API < b.API ? 1 : -1)
    },
    isBottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight

      return bottomOfPage || pageHeight < visible
    }
  },
  computed: {
    filteredApis () {
      if (!this.searchQuery) {
        return this.apis
      }
      const filter = new RegExp(this.searchQuery, 'i')
      return this.apis.filter(api => api.Category.match(filter))
    }
  },
  watch: {
    bottom (newValue, oldValue) {
      console.log('New bottom value', newValue)
      console.log('Old bottom Value', oldValue)
      if (newValue) {
        this.getEntries()
      }
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
