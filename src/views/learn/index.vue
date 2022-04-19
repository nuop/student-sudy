<template>
  <div class="learn">
    <van-nav-bar title="已购课程"></van-nav-bar>
    <course-content-list :fetchData="fetchData"></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/layoutFooter'
import CourseContentList from '@/components/CourseContentList.vue'
import { getPurchaseCourse } from '@/services/course'
export default {
  name: 'LearnIndex',
  components: {
    LayoutFooter,
    CourseContentList
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
