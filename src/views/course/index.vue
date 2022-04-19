<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/layoutFooter.vue'
import CourseHeader from './components/CourseHeader.vue'
import CourseContent from './components/CourseContent.vue'
export default {
  name: 'CourseIndex',
  components: {
    LayoutFooter,
    CourseHeader,
    CourseContent
  }
}
</script>

<style lang="scss" scoped>

</style>
