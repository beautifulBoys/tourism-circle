<template>
  <div class="circle">
    <h1>最新动态</h1>
    <div class="content-box">
      <div class="left">
        <ul class="ul">
          <li class="li">
            <div class="li-left">
              <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/user/user%20(3).jpg"/>
            </div>
            <div class="li-right">
              <div class="title">圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室</div>
              <div class="content">
                圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室
                圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室
                圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室
                圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室圣诞节法律手段富家大室
              </div>
              <div class="img-box">
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
                <img src="https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/firstSoft/picture/travel/3/c1.jpg"/>
              </div>
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
  .circle {
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
      .ul {
        padding: 0;
        margin: 0;
        .li {
          list-style-type: none;
          display: flex;
          margin: 15px 0;
          .li-left {
            width: 60px;
            height: 60px;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .li-right {
            flex: 1;
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

    }
  }
</style>
