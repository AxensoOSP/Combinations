<template lang="html">
  <div id="patients">
    <p id="selection">
      Url: <a :href="url" target="_blank">{{ url }}</a>
    </p>

    <div v-for="c in num" v-bind:key="key_i + c">
      <p>Patient {{ c }}:</p>

        <ul>
          <li v-for="(p, i) in patients[c - 1]" v-bind:key="i">
            {{ p }} <button type="button" v-on:click="deletePatientCombination(c, i)">×</button>
          </li>
          <input type="text" name="add" placeholder="Aggiungi combinazione" v-on:keyup.enter="addPatientCombination(c, $event)">
        </ul>

    </div>
  </div>
</template>

<script>
export default {
  app: '#patients',
  name: 'Patients',

  props: {
    num: Number,
    url: String,
    patients: Array
  },

  data () {
    return {
      key_i: 0
    }
  },

  methods: {

    addPatientCombination (c, e) {
      // Aggiungere una funzione che controlla che l'input sia corretto
      if(!Array.isArray(this.patients[c - 1]))
        this.patients[c - 1] = new Array;

      this.patients[c - 1].push(e.target.value.split("").sort().join(""));
      e.target.value = "";
      this.key_i++;
    },

    deletePatientCombination (c, i) {
      this.patients[c - 1].splice(i, 1);
      this.key_i--;
    }

  }
}
</script>

<style lang="css" scoped>
</style>
