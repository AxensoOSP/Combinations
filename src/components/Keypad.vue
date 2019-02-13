<template lang="html">
  <div id="keypad" class="hero-body">
    <div class="inputs container">
      <div v-bind:key="i" v-for="i in this.btns">
        <input :id="'b' + i" type="checkbox" v-on:click="updateSelectedOnChange(i, $event)"/>
        <label class="button is-light" :for="'b' + i">{{ i }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  app: 'keypad',
  name: 'Keypad',
  props: {
    btns: Number
  },

  data () {
    return {
      selected: [],
      checks: document.querySelectorAll("input[type='checkbox']")
    }
  },

  computed: {
    inputs () {
      return document.querySelector(".inputs")
    }
  },

  methods: {

    updateSelectedOnChange (i, a) {
      // var s, dest;
      // var c = this.inputs.querySelector(`#b${i}`)

      if (a.target.checked) {
        if (this.selected.length < 3) {
          this.selected.push(a.target.id.substring(1));
        } else {
          a.target.checked = false;
        }
      } else {
        this.selected.splice(this.selected.indexOf(a.target.id.substring(1)), 1);
        this.$emit("clearUrl");
      }

      if(this.selected.length == 3) {
        // Cerco il paziente corrispondente
        this.$emit("findPatient", this.selected.sort().join(" "));
      }

      // if (this.selected.length == 3) {
      //   s = ".i" + this.selected.sort().join("");
      //
      //   if(a.target.checked) {
      //     dest = document.querySelector(s);
      //     this.link = dest.querySelector("input").value;
      //     dest.classList.add("primary");
      //   } else {
      //     document.querySelector(s).classList.remove("primary");
      //   }
      //
      // }

    }

  }
}
</script>

<style lang="css" scoped>
  .inputs {
    text-align: center;
  }

  .inputs div {
    display: inline-block;
  }

  input[type="checkbox"] {
    display: none;
    -webkit-user-select: none;
  }

  input[type="checkbox"]+label {
    text-align: center;
    line-height: 37px;
    -webkit-user-select: none;
    display: inline-block;
    height: 50px;
    width: 50px;
    margin: 5px;
    border-radius: 100%;
    /* border: 1px solid #33C3F0; */
  }

  input[type="checkbox"]:checked + label {
    color: white;
    background-color: #363636;
  }
</style>
