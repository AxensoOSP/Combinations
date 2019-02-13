<template lang="html">
  <div id="patients" class="hero-body">
    <div class="container">

      <p class="subtitle">Url: <a :href="url" target="_blank">{{ url }}</a></p>

      <div class="columns">
        <div class="column" v-for="c in num" v-bind:key="key_i + c">

          <label class="label">Patient {{ c }}</label>
          <input :ref="'field-'+ c" class="input" type="text" name="add" placeholder="Combinazione" v-on:keyup.enter="addPatientCombination(c, $event)">

          <ul>
            <li v-for="(p, i) in patients[c - 1]" v-bind:key="i">
              <a class="tag is-delete" v-on:click="deletePatientCombination(c, i)"></a>
              {{ p }}
            </li>
          </ul>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  app: '#patients',
  name: 'PatientsCombinations',

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
      this.$emit('addPatientCombination', [c, e.target.value]);

      this.key_i++;
      e.target.value = "";

      this.$nextTick(() => {
        this.$refs["field-" + c][0].focus();
      });
    },

    deletePatientCombination (c, i) {
      this.$emit('deletePatientCombination', [c, i]);

      this.key_i--;
    }

  }
}
</script>

<style lang="css" scoped>
.tag.is-delete {
  transform-origin: bottom left;
  transform: scale(.7);
}

ul {
  margin-top: .5rem;
}
</style>
