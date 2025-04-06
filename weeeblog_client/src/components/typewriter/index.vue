<template>
  <div class="typewriter-container">
    <div class="title">{{ displayTitle }}</div>
    <div class="desc">{{ displayDesc }}</div>
  </div>
</template>

<script>
export default {
  name: 'Typewriter',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // 每个字的打字延迟时间(ms)
    typeDelay: {
      type: Number,
      default: 150
    }
  },
  data() {
    return {
      displayTitle: '',
      displayDesc: '',
      titleIndex: 0,
      descIndex: 0
    }
  },
  mounted() {
    this.startTyping()
  },
  methods: {
    startTyping() {
      // 先打印标题
      this.typeTitle()
    },
    typeTitle() {
      if (this.titleIndex < this.title.length) {
        this.displayTitle += this.title[this.titleIndex]
        this.titleIndex++
        setTimeout(this.typeTitle, this.typeDelay)
      } else {
        // 标题打完后开始打印描述
        setTimeout(this.typeDesc, this.typeDelay * 2)
      }
    },
    typeDesc() {
      if (this.descIndex < this.description.length) {
        // 正在打印中
        this.displayDesc += this.description[this.descIndex]
        this.descIndex++
        setTimeout(this.typeDesc, this.typeDelay)
      } else {
        // 打印完成后，开始逐个删除
        setTimeout(this.eraseDesc, this.typeDelay * 3)
      }
    },
    eraseDesc() {
      if (this.displayDesc.length > 0) {
        // 逐个删除字符
        this.displayDesc = this.displayDesc.substring(0, this.displayDesc.length - 1)
        setTimeout(this.eraseDesc, this.typeDelay)
      } else {
        // 删除完成后，重置索引并重新开始打印
        this.descIndex = 0
        setTimeout(this.typeDesc, this.typeDelay * 2)
      }
    }
  }
}
</script>

<style scoped lang="less">
.typewriter-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  .title {
    font-size: 2.3em;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 0.1em;
    white-space: pre-wrap;
    min-height: 1.2em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .desc {
    font-size: 1.5em;
    color: #f0e6ff;
    white-space: pre-wrap;
    min-height: 1.2em;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}
</style> 