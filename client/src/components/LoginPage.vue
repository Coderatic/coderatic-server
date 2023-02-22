<template>
  <div
    class="flex justify-center flex-col items-center h-screen w-screen bg-background-grey"
  >
    
      <h1 class="font-montserrat text-white font-semibold text-5xl mb-[10rem]">
        CODE<span class="font-montserrat text-purple-700 font-black"
          >RATIC</span
        >
      </h1>
    
    <LoginComp></LoginComp>
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

<style></style>
