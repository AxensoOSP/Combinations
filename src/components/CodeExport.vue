<template lang="html">
  <div class="hero-body">
    <div class="container">
      <button type="button" class="button is-primary" v-on:click="generateJSON()">Genera JSON</button>
      <pre v-if="jsonString"><code>var data = <span v-html="jsonString"></span></code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeExport',

  props: {
    patients_combinations: Array,
    patients_urls: Array
  },

  data() {
    return {
      jsonString: null
    }
  },

  methods: {

    generateJSON() {
      var r = {};
      for (var i = 0; i < this.patients_combinations.length; i++) {
        var t = this.patients_combinations[i];
        for (var k = 0; k < t.length; k++) {
          r[t[k].split(" ").join("-")] = this.patients_urls[i];
        }
      }
      this.jsonString = JSON.stringify(r, null, ' ');
    }

  }
}
</script>

<style lang="css" scoped>
button {
  margin-bottom: 1em;
}
</style>
