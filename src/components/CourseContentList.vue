<template>
  <div class="course-content-list">
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })">
          <div>
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="price-container" v-if="item.price">
              <span class="course-discounts">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      isRefreshing: false
    }
  },
  methods: {
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      console.log(data)
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.currentPage++
      this.loading = false
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      this.$toast('刷新成功')
      this.isRefreshing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y:auto ;
}
// 课程条目设置flex，内部元素左右显示
.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}
// 左侧图设置固定尺寸
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
// 右侧内容区域 flex: 1 撑满父元素
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
}
.course-info .course-discounts {
  color: #ff7452;
  margin-left: 10px;
}
h3, p{
  margin: 0;
}
</style>
