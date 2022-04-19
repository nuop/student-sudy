/<template>
  <div class="course-info">
    <van-cell-group :style="styleOptions">
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="课程图片">
      </van-cell>
      <van-cell class="course-description">
        <h2 v-text="course.courseName"></h2>
        <p v-text="course.previewFirstField"></p>
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <s>￥{{ course.price }}</s>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <van-cell class="course-details">
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section-and-lesson
              v-for="item in sections"
              :key="item.id"
              :section-data="item">
             </course-section-and-lesson>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <s>￥{{ course.price }}</s>
      </div>
      <van-button type="primary" @click="handlePay">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import CourseSectionAndLesson from './components/CourseSectionAndLesson'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  components: {
    CourseSectionAndLesson
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {},
      sections: [],
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSection()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      // 如果课程已购买，样式改变
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
      console.log(data)
    },
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
      console.log(data)
    },
    handlePay () {
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        console.log(this.$route.fullPath)
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-img {
  height: 280px;
}
.course-description {
  padding: 10px 20px;
}
.course-description h2 {
  padding: 0;
}
.course-saleInfo {
  display: flex;
}
.course-price {
  flex: 1;
  margin: 0;
}
.discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}
.course-saleInfo .tag {
  line-height: 15px;
  background-color: #f8f9fa;
  border-radius: 2px;
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
}
.van-cell-group {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
s {
  font-size: 14px;
}
.van-button {
  width: 50%;
  height: 80%;
}
</style>
