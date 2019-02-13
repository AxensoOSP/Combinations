<template lang="html">
  <div id="patientsInformations" class="hero-body">
    <div class="container">

      <div class="columns">
        <div class="column" v-for="i in patients_n" v-bind:key="i">

          <label class="label">Patient {{ i }}</label>
          <input class="input" type="text" v-model="patients_urls[i - 1]">
          <button class="button is-light" type="button" v-on:click="$emit('updatePatientUrl', [i, patients_urls[i - 1]])">update</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  app: "#patientsInformations",
  name: "PatientsInformations",
  props: {
    patients_urls: Array,
    patients_n: Number
  }
}
</script>

<style lang="css" scoped>
.button {
  margin-top: .5em;
}
</style>
