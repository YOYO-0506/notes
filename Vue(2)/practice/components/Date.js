Vue.component("InputGroup", {
  props: {
    startDate: String,
    endDate: String
  },
  data() {
    return {
      // 第一次的初始变量是父组件传递进来的值
      start: this.startDate,
      end: this.endDate
    };
  },
  watch: {
    // 监听父组件传递进来的变量,然后根据变化,同步本地的变量,和父组件的数据保持一致
    startDate(val) {
      // console.log("父组件传递的startDate参数发生了改变", val);
      this.start = val;
    },
    endDate(val) {
      this.end = val;
    },
    // 当前组件的数据发生改变,如果要关联父组件的数据,应当使用事件告知父组件,
    // 让父组件自行修改
    start(val) {
      // console.log("子组件本身的start参数发生了改变", val);
      // this.$emit("startChange", val);
      // console.log(this);
      // 当在属性上加上sync修饰符之后，
      // vue会自动在$listeners 当前这个加了sync修饰符的属性名称为事件名称的函数
      // 这个函数接收一个新的参数用于修改属性绑定的变量
      this.$emit("update:startDate", val);
    },
    end(val) {
      // console.log("子组件本身的end参数发生了改变", val);
      // this.$emit("endChange", val);
      this.$emit("update:endDate", val);
    }
  },
  template: `
    <div class="input-group"
      style="width:200px"
    >
      <input type="date" class="form-control" v-model="start"> 
      <span class="input-group-addon">
        至
      </span>
      <input type="date" class="form-control" v-model="end"> 
    </div>
  `
});
