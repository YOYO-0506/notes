const IButton = {
  props: {
    // 遇到需要驼峰命名的时候，在实例中使用时候，可以使用驼峰名称
    // 在html使用，要用到烤串名称
    // 组件props选项里的参数使用小驼峰命名

    htmlType: {
      //  html-type
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String
    },
    block: {
      type: Boolean
      // Boolean类型的参数，不传递参数默认为false 只要使用组件的时候，填上这个属性，就会为true
    }
  },
  methods: {
    click() {
      // console.log("触发点击事件");
      this.$emit("click");
      // 触发vm实例中的自定义事件
    }
  },
  template: `
   
    <button 
      @click='click'
      :type="htmlType" 
      :class="[
        'btn',{
        'btn-default' : type === 'default',
        'btn-primary' : type === 'primary',
        'btn-success' : type === 'success',
        'btn-danger' : type === 'danger',
        'btn-info' : type === 'info',
        'btn-warning' : type === 'warning',
        'btn-link' : type === 'link',
        'btn-lg' : size === 'lg',
        'btn-sm' : size === 'sm',
        'btn-xs' : size === 'xs',
        'btn-block' : block
        }
      ]"
      >
      <slot>插槽</slot>
      </button>
    
  `
};

// 同时给一个组件注册两个名称，方便用于模板和html中使用
Vue.component("IButton", IButton);
Vue.component("Button", IButton);
