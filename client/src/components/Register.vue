<template>
  <div class="w-screen h-screen flex justify-center items-center bg-background">

    <form class="w-[20%]">
      <div class=" flex flex-col justify-center items-center px-1 py-20 w-[100%]">
      <div class="w-[80%]">
      <label class="text-white text-lg block">Username: </label>
      <input class="border-2 border-black rounded w-[100%] my-2"  type="text" name="username" v-model="username" />
    </div>
    <div class="w-[80%]">
      <label class="text-white text-lg block">Password: </label>
      <input class="border-2 border-black rounded w-[100%] my-2" type="text" name="password" v-model="password" />
    </div>
      <input class="text-black border-2 bg-accent-lightgreen border-none rounded my-8  px-4 py-1 hover:bg-accent-darkgreen w-[50%] " type="submit" value="Register" @click="registerUser" />
    </div>
    </form>
  </div>
</template>

<script lang="ts">
import authService from "../services/authService";
export default {
  name: "AuthForm", 
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    registerUser() {
      authService.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
