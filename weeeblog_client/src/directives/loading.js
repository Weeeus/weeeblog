import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

function getLoadingImage(el) {
  return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
  const img = document.createElement("img");
  img.dataset.role = "loading";
  img.src = loadingUrl;
  img.className = styles.loading;
  return img;
}

export default function(el, binding) {
  // 根据 binding.value 的值，决定创建或删除img元素
  const curImg = getLoadingImage(el);
  if (binding.value) {
    if (!curImg) {
      const img = createLoadingImg();
      el.appendChild(img);
    }
  } else {
    if (curImg) {
      curImg.remove();
    }
  }
}

