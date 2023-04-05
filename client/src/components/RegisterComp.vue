<template>
  <div
    class="bg-gradient-to-r from-purple-700 via-orange-500 to-red-900 h-[480px] w-[370px] sm:w-[95%] p-[01px] rounded-md background-animate"
  >
    <form name="login" class="w-[100%] h-[100%]" onsubmit="return false">
      <div
        class="w-[100%] h-[100%] bg-background-grey-dark rounded-md flex flex-col justify-start py-5"
      >
        <!-- <div class="relative my-2">
        <h1 class="text-center text-white font-montserrat text-2xl">Register</h1>
      </div> -->
        <div class="relative my-2">
          <label for="username" class="text-white pl-4 font-lato"
            >Username</label
          >
          <div class="px-4 w-[100%]">
            <input
              class="input-field"
              type="text"
              name="username"
              v-model="username"
              placeholder="username"
            />
          </div>
        </div>
        <div class="relative my-2">
          <div class="flex justify-between">
            <label for="email" class="text-white pl-4 font-lato">Email</label>
            <p
              class="text-red-700 font-lato text-sm inline mr-4"
              v-if="!validateEmail"
            >
              Invalid email format
            </p>
          </div>
          <div class="px-4 w-[100%]">
            <input
              class="input-field"
              type="text"
              required
              name="email"
              v-model="email"
              placeholder="email"
            />
          </div>
        </div>
        <div class="relative my-2">
          <label for="password" class="text-white pl-4 font-lato inline"
            >Password</label
          >

          <div class="px-4 w-[100%]">
            <input
              class="input-field"
              :class="highlightPasswordFields"
              type="password"
              name="password"
              v-model="password"
              placeholder="password"
            />
          </div>
        </div>
        <div class="relative my-2">
          <div class="flex justify-between">
            <label
              for="confirm_password"
              class="text-white pl-4 font-lato inline"
              >Confirm Password</label
            >
            <p
              v-if="!passwordsMatch"
              class="text-red-700 font-lato text-sm inline mr-4"
            >
              Passwords do not match
            </p>
          </div>

          <div class="px-4 w-[100%]">
            <input
              class="input-field"
              :class="highlightPasswordFields"
              type="password"
              name="confirm_password"
              v-model="confirm_password"
              placeholder="confirm password"
            />
          </div>
        </div>
        <!-- <div class="relative my-2">
          <input type="checkbox" class="inline ml-[16px] outline-none "/><p class="text-white inline ml-[5px] font-lato text-sm">By Registering You agree with the terms and conditions.</p>
        </div> -->
        <div class="px-4 my-3 w-full">
          <div
            id="gradient-btn-bg"
            class="p-[01px] rounded"
            :class="disableButton"
          >
            <button
              class="w-[100%] h-[100%] py-1 bg-black text-white font-lato text-center rounded disabled:text-gray-500"
              type="submit"
              value="Register"
              @click="registerUser"
              :disabled="!fieldsValid"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="lg:w-[350px]">
    <p class="text-gray-600 font-lato my-5 text-sm">
      Already a member?
      <a class="text-purple-500" href="/#/login"> <strong>log in</strong></a>
      instead.
    </p>
  </div>
</template>

<script lang="ts">
import { AxiosError, AxiosResponse } from "axios";
import { mapActions } from "vuex";
export default {
  name: "RegisterComp",
  emits: ['regFailure', 'regSuccess'],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  computed: {
    passwordsMatch() {
      return (
        this.confirm_password === "" || this.password === this.confirm_password
      );
    },
    fieldsValid() {
      return (
        this.username !== "" &&
        this.email !== "" &&
        this.validateEmail &&
        this.password !== "" &&
        this.confirm_password !== "" &&
        this.passwordsMatch &&
        this.password.length >= 8
      );
    },
    highlightPasswordFields() {
      if (this.passwordsMatch) {
        return "border-gray-900 focus:border-purple-900";
      }
      return "!border-red-500";
    },
    disableButton() {
      if (!this.fieldsValid) {
        return "bg-gray-400";
      }
      return "bg-gradient-to-r from-purple-800 w-[100%] to-red-900";
    },
    validateEmail() {
      var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return this.email === "" || this.email.match(emailRegex);
    },
  },
  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        await this.register(userData);
        this.$emit('regSuccess');
        //add a popup div here
      } catch (error) {
        console.log(error);
        this.$emit('regFailure');

      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.greyedout {
  background-color: red !important;
}
.background-animate {
  background-size: 400%;

  -webkit-animation: gradientAnimate 7s ease infinite;
  -moz-animation: gradientAnimate 7s ease infinite;
  animation: gradientAnimate 7s ease infinite;
}
@keyframes gradientAnimate {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
