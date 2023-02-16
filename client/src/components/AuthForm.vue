<template>
  <div>
    <form>
      <label>Username: </label>
      <input type="text" name="username" v-model="username" />
      <label>Password: </label>
      <input type="text" name="password" v-model="password" />
      <input type="submit" value="register" @click="register" />
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
      password: "",
    };
  },
  methods: {
    register() {
      authService.register({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
