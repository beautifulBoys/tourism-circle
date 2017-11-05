<template>
  <div class="posted">
    <h1>我发表的</h1>
    <div class="content-box">
      <div class="left">
        <ul class="ul">
          <li class="li" v-for="item in list">
            <div class="title">圣诞节法律手段富家大室</div>
            <p class="content">圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手
              段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞
              节法律手段富家大室圣诞节法律手段富家大室圣诞节法律诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室
            </p>
            <div class="img-box">
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
            </div>

          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [1, 2, 3, 3, 3]
      };
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
  .posted {
    box-sizing: border-box;
    padding: 20px;
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #666;
      margin-bottom: 20px;
    }
    .content-box {
      width: 100%;
      height: 100px;
      display: flex;
      .left {
        flex: 1;
        height: 100%;
        .ul {
          padding: 0;
          margin: 0;
          .li {
            list-style-type: none;
            margin: 15px 0;
            .title {
              line-height: 30px;
              font-size: 16px;
              color: #333;
              margin-bottom: 10px;
              font-weight: 700;
            }
            .content {
              font-size: 15px;
              color: #666;
              line-height: 25px;
            }
            .img-box {
              width: 100%;
              padding: 0 0 10px 0;
              border-bottom: 1px solid #eee;
              img {
                width: 150px;
                margin: 5px;
              }
            }
          }
        }
      }
      .right {
        width: 250px;
      }
    }
  }
</style>
