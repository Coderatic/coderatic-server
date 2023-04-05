<template>
  <div class="bg-background-grey sm:h-fit w-screen h-screen">
    <h1
      class="font-montserrat text-white font-semibold text-3xl pb-[5rem] pt-[5rem] text-center"
    >
      CODE<span class="font-montserrat text-purple-700 font-black">RATIC</span>
    </h1>
    <div class="flex flex-col justify-center items-center">
      <RegisterComp
        @regSuccess="showSuccess"
        @regFailure="showFailure"
      ></RegisterComp>
    </div>
    <div
      class="successPopup w-[210px] translate-x-[210px] transition-all h-[60px] bg-green-500 absolute top-[10px] right-0 flex justify-center items-center rounded-tl rounded-bl"
    >
      <font-awesome-icon icon="fa-solid fa-check" class="text-white" />
      <p class="h-[50%] p-[1px] mx-[10px] bg-white"></p>
      <h1 class="text-white font-lato text-sm mr-[4px]">
        Registered Successfully
      </h1>
    </div>
    <div
      class="failurePopup w-[210px] translate-x-[210px] transition-all h-[60px] bg-red-500 absolute top-[10px] right-0 flex justify-center items-center rounded-tl rounded-bl"
    >
      <font-awesome-icon icon="fa-solid fa-circle-xmark" class="text-white" />
      <p class="h-[50%] p-[1px] mx-[10px] bg-white"></p>
      <h1 class="text-white font-lato text-sm mr-[4px]">
        Could not register user
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import RegisterComp from "./RegisterComp.vue";
export default {
  name: "RegisterPage",
  components: {
    RegisterComp,
  },
  methods: {
    showFailure() {
      const box = document.querySelector(".failurePopup") as HTMLElement;
      box.style.transform = "translateX(0px)";
      box.classList.add("popup-animate");
      setTimeout(() => {
        box.style.transform = "translateX(210px)";
        box.classList.remove("popup-animate");
      }, 3000);
    },
    showSuccess() {
      const box = document.querySelector(".successPopup") as HTMLElement;
      box.style.transform = "translateX(0px)";
      box.classList.add("popup-animate");
      setTimeout(() => {
        box.style.transform = "translateX(210px)";
        box.classList.remove("popup-animate");
      }, 3000);
    },
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<style scoped>
.popup-animate {
  -webkit-animation: rotateAnimate 0.5s ease initial;
  -moz-animation: rotateAnimate 0.5s ease initial;
  animation: rotateAnimate 0.5s ease initial;
}
@keyframes rotateAnimate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
    
  }
  50% {
    transform: rotate(-20deg);
    
  }
  75% {
    transform: rotate(20deg);
    
  }
  100% {
    transform: rotate(0deg);
    
  }
}
</style>
