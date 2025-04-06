// import eventBus from "@/eventBus";
// import { debounce } from "@/utils";
// import defaultGif from "@/assets/default.gif";

// let imgs = [];

// function setImage(img) {
//   img.dom.src = defaultGif; // 使用默认图片
//   // 处理图片
//   // 该图片是否在视口范围内
//   const clientHeight = document.documentElement.clientHeight;
//   const rect = img.dom.getBoundingClientRect();
//   const height = rect.height || 150;
//   if (rect.top >= -height && rect.top <= clientHeight) {
//     img.dom.src = img.src;
//     imgs = imgs.filter((i) => i !== img);
//   }
// }

// function setImages() {
//   for (const img of imgs) {
//     setImage(img);
//   }
// }

// function handleScroll() {
//   setImages();
// }

// eventBus.$on("mainScroll", debounce(handleScroll, 50));

// export default {
//   inserted(el, bindings) {
//     const img = {
//       dom: el,
//       src: bindings.value,
//     };
//     imgs.push(img);
//     // 立即处理它
//     setImage(img);
//   },
//   unbind(el) {
//     imgs = imgs.filter((img) => img.dom !== el);
//   },
// };

import lazySvg from "@/assets/lazy.svg";

export default {
  inserted(el, bindings) {
    const imgSrc = bindings.value;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当图片进入视口时，加载真实图片
            const img = entry.target;
            img.src = imgSrc;
            observer.unobserve(img); // 加载完成后取消观察
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    el.src = lazySvg;
    observer.observe(el); // 开始观察
    
    // 保存observer引用以便在unbind时清理
    el._observer = observer;
  },
  unbind(el) {
    // 取消观察，防止内存泄漏
    if (el._observer) {
      el._observer.disconnect();
      delete el._observer;
    }
  },
};
