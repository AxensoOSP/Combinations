<template>
<div id="app">
  <Keypad
    v-bind:btns="this.btns"
    v-on:findPatient="findPatient($event)"
    v-on:clearUrl="url = ''"
  ></Keypad>
  <PatientsInformations
    v-bind:patients_urls="this.patients_urls"
    v-bind:patients_n="this.patients_n"
  ></PatientsInformations>
  <Patients
    v-bind:url="this.url"
    v-bind:num="this.patients_n"
    v-bind:patients="this.patients_combinations"
  ></Patients>
</div>
</template>

<script>
import Keypad from './components/Keypad.vue'
import Patients from './components/Patients.vue'
import PatientsInformations from './components/PatientsInformations.vue'

export default {
  name: 'app',
  components: {
    Keypad,
    Patients,
    PatientsInformations
  },

  data() {
    return {
      btns: 13, // TODO: sostituire con i nomi delle classi e prendere il numero in base alla lunghezza dell'array
      url: "",
      patients_n: 6,
      patients_combinations: [],
      patients_urls: [],

      // totale_comb: []
    }
  },

  methods: {

    findPatient (e) {
      for (var i = 0; i < this.patients_combinations.length; i++) {
        if(this.patients_combinations[i]) {
          for (var k = 0; k < this.patients_combinations[i].length; k++) {
            if(this.patients_combinations[i][k] == e)
              this.url = this.patients_urls[i];
          }
        }
      }
    },

    // next_comb (comb, n, k) {
    //   var i = k - 1;
    //   ++comb[i];
    //
    //   while (i >= 0 && comb[i] >= n - k + i + 1)
    //     ++comb[--i];
    //
    //   if (comb[0] > n - k)
    //     return 0;
    //
    //   for (i = i + 1; i < k; ++i)
    //     comb[i] = comb[i - 1] + 1;
    //
    //   return comb;
    // }

  },

  mounted () {

    // /*
    //   Stampo tutte le possibili triplette.
    //   Si tratta delle triplette senza ripetizioni in cui l'ordine non è importante, il numero è uguale a k! / ((n - k)!k!) [binomiale]
    //  */
    //
    // var totale_comb = [],
    //     n = this.btns,
    //     k = 3,
    //     comb = [];
    //
    // for (var i = 0; i < k; ++i)
    //   comb[i] = i;
    //
    // totale_comb.push(comb.map(x => x + 1).sort());
    //
    // var c = 1;
    // while (this.next_comb(comb, n, k) != 0) {
    //   totale_comb.push(comb.map(x => x + 1).sort());
    //   c = c + 1;
    // }
    //
    // this.totale_comb = totale_comb;
    
  }
}
</script>

<style media="screen">
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
