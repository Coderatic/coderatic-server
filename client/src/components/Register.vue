<template>
  <div>
    <form>
      <label>Username: </label>
<<<<<<< HEAD:client/src/components/Register.vue
      <input type="text" name="username" v-model="username" />
      <br />
      <label>Email: </label>
      <input type="email" name="Email" v-model="email" />
      <br />
      <label>Password: </label>
=======
      <input  type="text" name="username" v-model="username" />
      <label class="text-yellow-100 text-lg">Password: </label>
>>>>>>> 6ee3d996e93c4f21a386ae85d70303b042c4bf33:client/src/components/AuthForm.vue
      <input type="text" name="password" v-model="password" />
      <br />
      <input type="submit" value="register" @click="registerUser" />
    </form>
  </div>
</template>

<script lang="ts">
import authService from "../services/authService";
export default {
<<<<<<< HEAD:client/src/components/Register.vue
  name: "Register",
=======
  name: "AuthForm", 
>>>>>>> 6ee3d996e93c4f21a386ae85d70303b042c4bf33:client/src/components/AuthForm.vue
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
