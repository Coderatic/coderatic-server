<template>
  <div
    class="absolute top-[20px] right-[10px] py-[20px] flex justify-center items-center bg-black rounded-[50px] translate-x-[120%] transition-all duration-[500ms]"
    id="popup"
  >
    <font-awesome-icon
      icon="fa-solid fa-circle-xmark"
      class="text-white mx-3"
    />
    <p class="pr-6 font-lato text-sm text-white">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({ message: String });

const showMessage = () => {
  const box = document.querySelector("#popup") as HTMLElement;
  box.style.transform = "translateX(0px)";
  setTimeout(() => {
    box.style.transform = "translateX(120%)";
  }, 3000);
};

defineExpose({ showMessage });
</script>

<style></style>
