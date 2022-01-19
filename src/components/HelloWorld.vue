<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <pre>{{ $data }}</pre>
    <h3>Installed CLI Plugins</h3>
    <p v-for="(name, index) in names" :key="name">
      {{ index }} - {{ name.id }} - {{ name.firstName }}
    </p>
    <span v-for="name in names" :key="name.id">
      <input type="checkbox" v-model="checkedNames" :value="name.firstName" />
      <label for={{name.firstName}}>{{name.firstName}}</label>
    </span>
    <p v-if="checkedNames && checkedNames.length > 0"> Checked names: {{ checkedNames }} </p>
  </div>

  <div>
    <h1> Counter </h1>
    <input type="number" v-model.number="num1">
    <span>+</span>
    <input type="number" v-model.number="num2">
    <span>=</span>
    <span>{{ num1 + num2 }}</span>
  </div>

  <div>
    <h1> Do you like tacos? </h1>
    <input type="checkbox" v-model="tacos" value="positive" id="positive" />
    <label for="positive">Yes</label>
    <input type="checkbox" v-model="tacos" value="negative" id="negative" />
    <label for="negative">No</label>
    <p v-if="tacos.includes('positive')">Great! you like tacos</p>
    <p v-else-if="tacos.includes('negative')">Boo! you must like tacos</p>
  </div>

  <div>
    <h1>What is your favorite color? </h1>
    <textarea v-model="color"></textarea>
    <br/>
    <button :class="[color ? activeClass : '']"> Let us know!</button>
  </div>

  <div>
    <h1>Want to buy a backpack?</h1>
    <button class="active" @click="counter > 0 ? counter -= 1 : 0"> - </button>
    <span> Quantity: {{ counter }}</span>
    <button class="active" @click="counter < 10 ? counter += 1 : counter"> + </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      num1: 0,
      num2: 0,
      total: 0,
      checkedNames: [],
      tacos: [],
      color: '',
      activeClass: 'active',
      counter: 0,
      names: [
        { id: 'Person 0', firstName: 'John' }
        // { id: 1, firstName: 'Paul' }
      ]
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
