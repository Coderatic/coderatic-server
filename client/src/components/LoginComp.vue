<template>
  <div class="h-[50%]">
    <form
      id="register-form"
      class="bg-accent-darkblue border-2 border-accent-cream rounded-md bg-accent-cream hide"
    >
      <div
        class="flex flex-col justify-between items-center px-1 h-[100%] w-[100%]"
      >
        <h1
          class="text-black text-4xl font-bold font-montserrat py-10"
          id="title-register"
        >
          LOGIN
        </h1>

        <div class="w-[100%] px-5">
          <div class="inner-input-container">
            <input
              class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>

          <div class="inner-input-container">
            <input
              class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="w-[100%] text-center">
          <input
            id="reg-btn"
            class="text-black bg-accent-s-yellow border-none rounded-3xl shadow-lg my-8 px-4 py-1 greyedout hover:bg-accent-m-yellow w-[50%] font-montserrat"
            type="submit"
            value="Login"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { AxiosError, AxiosResponse } from "axios";
import authService from "../services/authService";
export default {
  name: "LoginComp",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      authService
        .authorize(this.username, this.password)
        .then((res: AxiosResponse<any, any>) => {
          alert(res.data.message);
        })
        .catch((err: AxiosError<any>) => {
          alert(err.response?.data.message);
        });
    },
  },
};
</script>

<style scoped>
@media (max-width: 576px) {
  #register-form {
    padding: 0vh 0;
    width: 329px;
    height: fit-content;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  #register-form {
    padding: 0vh 0;
    width: 329px;
    height: fit-content;
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  #register-form {
    padding: 0vh 0;
    width: 329px;
    height: fit-content;
  }
}

@media (min-width: 992px) {
  #register-form {
    padding: 0vh 0;
    width: 422px;
    height: fit-content;
  }
}
</style>
