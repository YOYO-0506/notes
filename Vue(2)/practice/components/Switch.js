Vue.component("ISwitch", {
  props: {
    data: Boolean
  },
  methods: {
    change() {
      this.$emit("change", this.on);
      this.on = !this.on;
    }
  },
  template: `
        <div :class="[
          'switch',
          {
            'switch-on' : data
          }
        ]"  @click="change">
          <div class="switch-btn"></div>
        </div>
    `
});
