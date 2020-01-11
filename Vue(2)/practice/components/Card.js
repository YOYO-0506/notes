Vue.component("Card", {
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    content: String
  },
  data() {
    return {
      cardStyle: {
        width: "500px",
        height: "300px",
        border: "1px solid #000"
      }
    };
  },
  methods: {
    fn() {
      console.log(this);
    }
  },
  template: `
    <div class="card" 
    :style="cardStyle"
    @click="fn"
    >
        <div class="header" style="border-bottom:1px solid #000">
          <slot name="header" v-if="$slots.header"/>
          <h3 v-else>{{title}}</h3>
        </div>
        <div class="content">
          <slot name="content"/>
        </div>
    </div>
  `
});

/**
 * 在使用组件时，如果在组件的开始标签和结束标签中间插入子内容
 * 这些子内容如果是组件，就会被处理成一个组件类型的VNode对象
 * 如果是原生标签，就会被处理成一个标签类型VNode对象
 * 这些子内容都会存入$slots的default选项里
 */
