Vue.component("ISwitch", {
  props: {
    data: Boolean,
    value: Boolean
  },
  methods: {
    change() {
      // this.$emit("change", this.data);
      this.$emit("input", !this.value);
      // this.$emit("input", this.value);
      console.log(this);
    }
  },
  template: `
        <div :class="[
          'switch',
          {
            'switch-on' : value
          }
        ]"  @click="change">
          <div class="switch-btn"></div>
        </div>
    `
});
