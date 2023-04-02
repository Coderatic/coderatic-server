<template>
     <div class="bg-background-grey h-screen w-screen overflow-y-hidden">
      <h1 class="font-montserrat text-white font-semibold text-3xl pb-[5rem] pt-[5rem] text-center">
        CODE<span class="font-montserrat text-purple-700 font-black"
          >RATIC</span
        >
      </h1>
      <div
    class="flex  flex-col justify-center items-center "
  >
    <LoginComp></LoginComp>
  </div>
     </div>
</template>

<script lang="ts">
import LoginComp from "./LoginComp.vue";
export default {
  name: "LoginPage",
  components: {
    LoginComp,
  },
};
</script>

<style scoped></style>
