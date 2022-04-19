<template>
  <div class="user">
    <van-cell-group>
      <van-cell class="user-info" :border="false">
        <van-image
          width="50px"
          height="50px"
          :src="userInfo.portrait || 'https://s0.lgstatic.com/i/image6/M01/1F/6B/Cgp9HWBR1z2AB8UTAAG87bdA0lA648.jpg'"
        ></van-image>
        <div class="user-info-content">
          <h3>{{ userInfo.userName }}</h3>
          <span>
            <van-icon name="edit">
              编辑个人资料
            </van-icon>
          </span>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元"></van-cell>
      <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
      <van-cell icon="down" title="我的下载" is-link></van-cell>
      <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
      <van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0"></van-cell>
    </van-cell-group>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/layoutFooter'
import { getUserInfo } from '@/services/user'
export default {
  name: 'UserIndex',
  components: {
    LayoutFooter
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-info {
    padding: 30px 20px;
    background-color: rgb(248, 150, 3);
  }
  .user-info .van-cell__value {
    display: flex;
  }
  .user-info-content {
    margin-left: 15px;
  }
  .user-info-content h3 {
    margin: 5px;
    font-size: 18px;
  }
  .account-info {
    background-color: rgb(248, 150 ,3);
    margin-top: -1px;
  }
  .account-info .van-cell__value {
    border-radius: 15px;
  }
  .account-info .grid-item-value {
    font-size: 22px;
    font-weight: 700;
  }
</style>
