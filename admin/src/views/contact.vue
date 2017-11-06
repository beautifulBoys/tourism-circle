<template>
  <div class="newest">

  </div>
</template>
<script>
import city from './city.json';
  export default {
    data () {
      return {
      };
    },
    /*
[
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致'
          }
        ]
      }
    ]
  }
]
    */
    mounted () {
      let arr = [];
      for (let i = 0; i < city.length; i++) {
        let a = {};
        a.value = a.label = city[i].name;
        a.children = [];
        arr.push(a);
        for (let j = 0; j < city[i].city.length; j++) {
          let b = {};
          b.value = b.label = city[i].city[j].name;
          b.children = [];
          a.children.push(b);
          for (let k = 0; k < city[i].city[j].area.length; k++) {
            let c = {};
            c.value = c.label = city[i].city[j].area[k];
            b.children.push(c);
          }
        }
      }
      console.log(JSON.stringify({a: arr}));
    },
    methods: {
      addTagEvent () {
        console.log('aa');
        this.tagList.push({ name: this.tag, type: 'primary' });
        this.tag = '';
      }
    }
  };
</script>

<style lang="less" scoped>
  .newest {
    box-sizing: border-box;
    padding: 20px;
  }
</style>
