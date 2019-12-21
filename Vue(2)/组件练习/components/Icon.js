Vue.component('Icon', {
  props: {
    name: {
      type: String,    //设置数据类型
      default: 'euro', //设置默认值
      required: true //设置是否必须填写
    },
    color: {
      type: String,
      default: '#000'
    },
    size: {
      type: Number,
      default: 16,
      // 自定义参数验证
      validator(val) {
        console.log(val);
        if (val > 50 || val < 0) {
          console.error('size不能大于50 或者小于0');
          return false
        }
        return true


      }
    }
  },
  computed: {
    fontSize() {
      return this.size + "px"
    }
  },
  template: `
    <span 
    :class="'glyphicon glyphicon-' + name" 
    aria-hidden="true"
    :style="{
      color,
      fontSize
    }"
    ></span>`
})