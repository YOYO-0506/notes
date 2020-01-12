const Table = {
  props: {
    cloums: {
      type: Array,
      default() {
        return [];
      }
    },
    datas: {
      type: Array,
      default() {
        return [];
      }
    },
    striped: Boolean,
    bordered: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectAll: false
    };
  },
  // data() {
  //   return {
  //     iCloums: [
  //       { title: "账号", key: "username" },
  //       { title: "邮箱", key: "email" },
  //       { title: "手机", key: "phone" },
  //       { title: "地址", key: "address" }
  //     ],
  //     iDatas: [
  //       {
  //         username: "张三",
  //         email: "1@qq.com",
  //         phone: "15011620082",
  //         address: "佛山市"
  //       },
  //       {
  //         username: "李四",
  //         email: "2@qq.com",
  //         phone: "15011620083",
  //         address: "佛山市"
  //       },
  //       {
  //         username: "老王",
  //         email: "3@qq.com",
  //         phone: "15011620084",
  //         address: "佛山市"
  //       }
  //     ]
  //   };
  // },
  watch: {
    iDatas: {
      handler(val) {
        // console.log(val);
        var notSelects = val.filter(item => !item.checked);
        // console.log(notSelects);
        this.selectAll = notSelects.length === 0;
        this.$emit(
          "select",
          val.filter(item => item.checked)
        );
      },
      deep: true
    }
  },
  computed: {
    iDatas() {
      return this.datas.map(item => {
        // item.checked = this.selectAll; 这里使用不是响应式数据
        Vue.set(item, "checked", this.selectAll);
        return item;
      });
    }
  },
  methods: {
    remove(item, index) {
      // console.log(item, index);
      this.$emit("remove", item, index);
    }
  },
  template: `
   <div>
    <table :class="[
      'table',
      {
        'table-striped' : striped , 
        'table-bordered' : bordered 
      }
    ]">
    <thead>
        <th><input type="checkbox" v-model="selectAll" />全选</th>
        <th v-for="item in cloums">{{item.title}}</th>
        <th>操作</th>
    </thead> 
    <tbody>
      <tr v-for="(item,index) in iDatas">
        <td><input type="checkbox" v-model="item.checked"/></td>
        <td v-for="col in cloums">{{item[col['key']]}}</td>
        <td>
          <slot name="btn" :item="item" :index="index" :datas="datas"/>
          <!--<Button type="danger" @click="remove(item,index)">删除</Button>-->
        </td>
      </tr>
    </tbody>
  </table>
   </div>
  `
};
Vue.component("Table", Table);
Vue.component("MyTable", Table);
