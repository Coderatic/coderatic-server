<template>
  <div class="bg-background-grey h-screen w-screen">
    <h1
      class="font-montserrat text-white font-semibold text-3xl pb-[5rem] pt-[5rem] text-center"
    >
      CODE<span class="font-montserrat text-purple-700 font-black">RATIC</span>
    </h1>
    <div class="flex flex-col justify-center items-center">
      <div
        class="bg-gradient-to-r from-purple-700 via-orange-500 to-red-900 h-[300px] w-[350px] sm:w-[95%] p-[01px] rounded-md background-animate"
      >
        <form name="login" class="w-[100%] h-[100%]" onsubmit="return false">
          <div
            class="w-[100%] h-[100%] bg-background-grey-dark rounded-md flex flex-col justify-start py-5"
          >
            <div class="relative my-2">
              <label for="name" class="text-white pl-4 font-lato"
                >Username</label
              >
              <div class="px-4 w-[100%]">
                <input
                  class="border-[2px] border-gray-900 bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[100%] my-3 font-lato"
                  type="text"
                  name="name"
                  placeholder="username"
                />
              </div>
            </div>
            <div class="relative my-2">
              <div class="flex justify-between mr-4">
                <label for="password" class="text-white pl-4 font-lato inline"
                  >Password</label
                >
                <a href="www.google.com" class="inline text-purple-500"
                  >Forgot password?</a
                >
              </div>
              <div class="px-4 w-[100%]">
                <input
                  class="border-[2px] border-gray-900 bg-background-grey focus:border-purple-900 focus:outline-none py-[4px] px-[3px] text-sm text-white rounded w-[100%] my-3 font-lato"
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </div>
            </div>
            <div class="px-4 my-3 w-full">
              <div
                class="bg-gradient-to-r from-purple-800 w-[100%] to-red-900 p-[01px] rounded"
              >
                <button
                  class="w-[100%] h-[100%] py-1 bg-black text-white font-lato text-center rounded"
                  @click="loginUser"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="lg:w-[350px]">
        <p class="text-gray-600 font-lato my-5 text-sm">
          Not a member?
          <a class="text-purple-500" href="/#/register">
            <strong> Sign Up </strong></a
          >
          instead.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { mapActions } from "vuex";
import { defineAsyncComponent } from "vue";
import { useStore } from "vuex";

const store = useStore();

const username = ref("");
const password = ref("");

const login = mapActions(["login"]);
const emits = defineEmits(["loginSuccess", "loginFailure"]);

async function loginUser() {
  window.scrollTo(0, 0);
  const userData = {
    username: username,
    password: password,
  };
  try {
    await store.dispatch("login", userData);
    emits("loginSuccess");
    //add a popup div here
  } catch (error) {
    emits("loginFailure");
    console.log(error);
  }
}
</script>

<style scoped>
.background-animate {
  background-size: 400%;

  -webkit-animation: gradientAnimate 7s ease infinite;
  -moz-animation: gradientAnimate 7s ease infinite;
  animation: gradientAnimate 7s ease infinite;
}
</style>
