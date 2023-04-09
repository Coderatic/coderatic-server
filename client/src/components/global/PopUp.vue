<template>
  <div
    class="absolute top-[20px] right-[10px] py-[20px] flex justify-center items-center rounded-[50px] translate-x-[120%] transition-all duration-[500ms]"
    :class="is_error ? 'bg-red-500' : 'bg-green-500'"
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

const props = defineProps({ message: String, is_error: Boolean });

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
