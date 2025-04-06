<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="icp-info">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          {{data.icp}}
        </a>
      </div>
      <div class="footer-info">
        <span>©Copyright @ {{ currentYear }} WeeeBlog</span>
      </div>
      <div class="runtime-info">
        <span>Running Time: {{ runningDays }} days | {{ runningHours }} H {{ runningMinutes }} M {{ runningSeconds }} S</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FooterBar",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      startDate: new Date('2022-12-01'), // 设置网站开始运行的日期
      runningDays: 0,
      runningHours: 0,
      runningMinutes: 0,
      runningSeconds: 0,
      timer: null
    };
  },
  computed: mapState("setting", ["data"]),
  mounted() {
    this.updateRunningTime();
    this.timer = setInterval(this.updateRunningTime, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    updateRunningTime() {
      const now = new Date();
      const diff = now - this.startDate;
      
      // 计算运行时间
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      this.runningDays = days;
      this.runningHours = hours % 24;
      this.runningMinutes = minutes % 60;
      this.runningSeconds = seconds % 60;
    }
  }
};
</script>

<style lang="less" scoped>
.footer-container {
  width: 100%;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  margin-top: 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.icp-info,
.footer-info,
.runtime-info{
  line-height: 1.5;
  font-size: 14px;
}

a {
  color: #2f76cd;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #a0a0a0;
  }
}

@media screen and (max-width: 768px) {
  .footer-content {
    padding: 0 15px;
  }
  
  .icp-info,
  .footer-info,
  .runtime-info,
  .theme-info {
    font-size: 12px;
  }
}
</style>
