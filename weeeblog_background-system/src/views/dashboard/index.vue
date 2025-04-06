<template>
  <div class="dashboard-container">
    <!-- 粒子背景 -->
    <div id="particles-js"></div>

    <div class="welcome-content">
      <h1 class="welcome-title">
        欢迎来到 <span class="highlight">个人博客后台</span>
      </h1>
      <p class="welcome-subtitle">记录你的故事，分享你的生活。</p>
    </div>
  </div>
</template>

<script>
import "particles.js"
export default {
  name: "Dashboard",
  mounted() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#aaaaaa" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
        },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#aaaaaa", opacity: 0.4, width: 1 },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: { enable: false },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  background: linear-gradient(135deg, #1e3c72, #2a5298); /* 深蓝渐变背景，与侧边栏协调 */

  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .welcome-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: #ffffff;
    padding-top: 20vh;

    .welcome-title {
      font-size: 50px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #ffffff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      animation: fade-in 1.5s ease-in-out;

      .highlight {
        color: #ffd700;
        text-shadow: 0 0 15px #ffd700, 0 0 30px #ffd700;
        animation: glow 2s infinite alternate;
      }
    }

    .welcome-subtitle {
      font-size: 20px;
      margin: 10px 0 20px;
      color: #d1d1e9;
      animation: fade-in-up 1.2s ease-in-out;
    }

    .action-btn {
      animation: bounce-in 1.5s ease-in-out;
      background-color: #409eff;
      border-color: #409eff;
      color: #ffffff;
    }
  }
}

/* 动画效果 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700;
  }
  to {
    text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>
