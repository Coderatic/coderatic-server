<template>
  <div>
    <form>
      <label>Username: </label>
      <input  type="text" name="username" v-model="username" />
      <label class="text-yellow-100 text-lg">Password: </label>
      <input type="text" name="password" v-model="password" />
      <br />
      <input type="submit" value="register" @click="registerUser" />
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
