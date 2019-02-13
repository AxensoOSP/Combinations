<template>
<div id="app" class="hero">
  <Keypad
    v-bind:btns="this.btns"
    v-on:findPatient="findPatient($event)"
    v-on:clearUrl="url = ''"
  ></Keypad>
  <PatientsCombinations
    v-bind:url="this.url"
    v-bind:num="this.patients_n"
    v-bind:patients="this.patients_combinations"
    v-on:addPatientCombination="addPatientCombination($event)"
    v-on:deletePatientCombination="deletePatientCombination($event)"
  ></PatientsCombinations>
  <PatientsInformations
    v-bind:patients_urls="this.patients_urls"
    v-bind:patients_n="this.patients_n"
    v-on:updatePatientUrl="updatePatientUrl($event)"
  ></PatientsInformations>
  <CodeExport
    v-bind:patients_combinations="this.patients_combinations"
    v-bind:patients_urls="this.patients_urls"
  ></CodeExport>
</div>
</template>

<script>
import { db } from './Firebase'
import Keypad from './components/Keypad.vue'
import PatientsCombinations from './components/PatientsCombinations.vue'
import PatientsInformations from './components/PatientsInformations.vue'
import CodeExport from './components/CodeExport.vue'

const patients = db.collection("patients_urls")

export default {
  name: 'app',

  components: {
    Keypad,
    PatientsCombinations,
    PatientsInformations,
    CodeExport
  },

  computed: {

    patients_combinations () {
      var r = [];
      for (var i = 0; i < this.patients.length; i++)
        r.push(this.patients[i]['keycodes'])
      return r;
    },

    patients_urls () {
      var r = [];
      for (var i = 0; i < this.patients.length; i++)
        r.push(this.patients[i] ? this.patients[i]['url'] : "")
      return r;
    }

  },

  firestore () {
    return {
      patients: patients,
    }
  },

  data () {
    return {
      btns: 13, // TODO: sostituire con i nomi delle classi e prendere il numero in base alla lunghezza dell'array
      url: "",
      patients_n: 6,

      // totale_comb: []
    }
  },

  methods: {

    findPatient (e) {
      for (var i = 0; i < this.patients_combinations.length; i++) {
        if(this.patients_combinations[i]) {
          for (var k = 0; k < this.patients_combinations[i].length; k++) {
            if(this.patients_combinations[i][k].split(" ").sort().join(" ") == e) {
              this.url = this.patients_urls[i];
              return; // in caso di codici duplicati prende il primo
            }
          }
        }
      }
    },

    updatePatientUrl (e) {
      var i = String(e[0]);
      patients.doc(i).update({
        url: e[1]
      })
    },

    addPatientCombination (e) {
      var c = String(e[0]);

      patients.doc(c).update({
        keycodes: this.patients[c - 1]['keycodes'].concat(e[1])
      })
    },

    deletePatientCombination (e) {
      var c = String(e[0]),
          t = this.patients[c - 1]['keycodes'];

      if(t.length > 1) {
        t.splice(parseInt(e[1]), 1);
      } else {
        t = [];
      }

      patients.doc(c).update({
        keycodes: t
      })
    }

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
