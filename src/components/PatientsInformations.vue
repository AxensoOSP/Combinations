<template lang="html">
  <div id="patientsInformations">
    <p>PatientsInformations</p>
    <ol>
      <li v-for="i in patients_n" v-bind:key="i">
        <input type="text" v-model="patients_urls[i - 1]">
      </li>
    </ol>
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
</style>
