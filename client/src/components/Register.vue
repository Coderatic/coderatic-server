<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-background-grey overflow-x-hidden"
  >
    <div class="w-0 h-[100%] lg:w-[50%] xl:w-[50%]">
      <div class="h-[100%] w-[100%] collapse lg:visible xl:visible flex flex-col justify-center items-center bg-accent-s-yellow curve-none">
        <img src="../assets/logo2.png" class ="w-[200px] pb-8" alt="Logo">
        <p class="font-montserrat font-bold fonttext-md   ">Already A member? <a  class="text-purple-900 hover:text-purple-300" href=""> Log In</a> instead.</p>
      </div>
    </div>
    <div class="w-[100%] lg:w-[50%] xl:w-[50%] flex justify-center">
      <form
        id="register-form"
        class="bg-accent-darkblue border-2 border-accent-cream rounded-xl bg-accent-cream hide"
      >
        <div
          class="flex flex-col justify-between items-center px-1 h-[100%] w-[100%]"
        >
          <h1
            class="text-black text-4xl font-bold font-montserrat py-10  "
            id="title-register"
          >
            REGISTER
          </h1>

          <div class="w-[100%] px-5">
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="text"
                name="fname"
                v-model="fname"
                placeholder="First Name"
              />
            </div>
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="text"
                name="lname"
                v-model="lname"
                placeholder="Last Name"
              />
            </div>
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="text"
                name="username"
                v-model="username"
                placeholder="Username"
              />
            </div>
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="email"
                name="email"
                v-model="email"
                placeholder="E-mail"
              />
            </div>
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="password"
                name="password"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <div class="inner-input-container">
              <input
                class="border-2 bg-black text-white border-black rounded w-[100%] my-2 px-1 py-1.5 font-montserrat  "
                type="password"
                name="confirm-password"
                v-model="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div class="flex items-baseline my-2 px-4">
            <input type="checkbox" class="mx-2 accent-accent-m-yellow" />
            <p class="text-black font-bold font-montserrat text-sm    ">
              By signing up, I agree with the<a
                class="text-purple-900 hover:text-purple-300"
                href="www.google.com"
              >
                terms and conditions.</a
              >
            </p>
          </div>
          <div class="w-[100%] text-center">
            <input
            id="reg-btn"
              class="text-black bg-accent-s-yellow border-none rounded-3xl shadow-lg my-8 px-4 py-1  hover:bg-accent-m-yellow w-[50%] font-montserrat  "
              type="submit"
              value="Register"
              @click="registerUser"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Axios, AxiosError, AxiosResponse } from "axios";
import regService from "../services/regService";
export default {
  name: "RegisterPage",
  data() {
    return {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  mounted() {
    setTimeout(() => {
      $(".hide").addClass("fadeup");
    }, 100);
    setTimeout(() => {
      $(".curve-none").addClass("curve");
    }, 500);
  },
  methods: {
    registerUser() {
      regService
        .register({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((res: AxiosResponse<any, any>) => {
          console.log(res);
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

.hide {
  filter: blur(5px);
  transform: translateX(60%);
  opacity: 0;
  transition-duration: 0.5s;
}

.fadeup {
  filter: blur(0);
  transform: translateX(0);

  opacity: 1;
}
.curve-none {
  border-radius: 0;
  border-radius: 32% 68% 32% 68% / 61% 37% 63% 39% ;
  transition-duration: 1s;
}
.curve{
  border-radius: 83% 17% 82% 18% / 19% 80% 20% 81%   ;
}
#reg-btn{
  transition-duration: 0.05s;
}

#reg-btn:hover{
  transform: translateY(-3px) scale(102%);
}
</style>
