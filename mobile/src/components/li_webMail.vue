
<template>
    <div class="mail" :class="{move: show}">
      <div class="top border-1px-bottom">
        <div class="title">发给 {{name}} 的站内信</div>
        <div class="button" @click="sendThisPageEvent">发 送</div>
      </div>
      <div class="box">
        <div class="expandingArea">
          <pre>{{textareaVal}}</br></pre>
          <textarea rows="5" class="textarea" v-model="textareaVal" placeholder="请输入内容"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'name'],
  data () {
    return {
      textareaVal: ''
    };
  },
  methods: {
    clear () {
      this.textareaVal = '';
    },
    sendThisPageEvent () {
      this.$emit('send', {
        remark: this.textareaVal
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../lib/css/1px.less';
  .mail {
      width: 100%;
      position: fixed;
      bottom: 0;
      transform: translate3d(0, 100%, 0);
      display: flex;
      flex-flow: column;
      transition: all .3s;
      z-index: 10;
      &.move {
        transform: translate3d(0, 0, 0);
      }
      .top {
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: #ddd;
        color: #20a0ff;
        .border-1px-bottom(#ccc);
        display: flex;
        .button {
          width: 100px;
          background: #20a0ff;
          text-align: center;
          font-size: 16px;
          color: #fff;
          &:active {
            background: #1189e2;
            color: rgba(255,255,255,0.7);
          }
        }
        .title {
          flex: 1;
          color: #333;
          padding: 0 15px;
          box-sizing: border-box;
        }
      }
      .box {
        flex: 1;
        width: 100%;
        min-height: 200px;
        background: green;
        .expandingArea {
          width: 100%;
          height: 100%;
          position: relative;
          pre {
            display: block;
            visibility: hidden;
            margin: 0;
            padding: 8px 13px;
            box-sizing: border-box;
            font-size: 15px;
            line-height: 25px;
            min-height: 200px;
            white-space: pre-wrap; /*css-3*/
            white-space: -moz-pre-wrap; /*Mozilla,since1999*/
            white-space: -pre-wrap; /*Opera4-6*/
            white-space: -o-pre-wrap; /*Opera7*/
            word-wrap: break-word; /*InternetExplorer5.5+*/
          }
          .textarea {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            font-size: 15px;
            border: none;
            background: #fff;
            margin: 0;
            padding: 8px 13px;
            box-sizing: border-box;
            resize: none;
            outline: none;
            line-height: 25px;
          }
        }
      }
  }

</style>
