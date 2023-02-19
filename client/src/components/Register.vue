<template>
  <div class="w-screen h-screen flex flex-wrap justify-center content-center">

    <form class="h-fit">
      <div class="flex flex-col flex-wrap justify-center content-center px-8 py-8">
      <div>
      <label class="text-black text-lg block">Username: </label>
      <input class="border-2 border-black rounded"  type="text" name="username" v-model="username" />
    </div>
    <div>
      <label class="text-black text-lg block">Password: </label>
      <input class="border-2 border-black rounded" type="text" name="password" v-model="password" />
    </div>
      <input class="border-2 border-black rounded my-8" type="submit" value="register" @click="registerUser" />
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
