<template>
  <div class="bg-background-grey h-screen w-screen">
    <h1
      class="font-montserrat text-white font-semibold text-3xl pb-[5rem] pt-[5rem] text-center"
    >
      CODE<span class="font-montserrat text-purple-700 font-black">RATIC</span>
    </h1>
    <div class="flex flex-col justify-center items-center py-[5rem]">
      <div
        class="bg-gradient-to-r from-purple-700 via-orange-500 to-red-900 h-[80px] w-[450px] sm:w-[95%] p-[01px] rounded-md background-animate"
      >
        <div
          class="flex flex-col justify-center items-center w-full h-full bg-background-grey-dark text-gray-500 font-montserrat text-sm rounded-[5px] text-center"
        >
          <h1 class="text-gray-500 font-lato">{{ message }}</h1>
          <h1 class="text-gray-500 font-lato">{{ message2 }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Api from '../services/Api';
export default {
  name: "ActivateAccount",
  data() {
    return {
      message: "We are activating your account please wait.",
      message2: "You will be redirected soon.",
    };
  },
  mounted() {
	const authData = {
		token: this.$route.params.token 
	};
    if (authData.token) {
      Api().post('/api/auth/signup',authData)
        .then(() => {
			this.message = "Account Activated Successfully"
			this.message2="Redirecting"
         	this.$router.push('/login');
        })
        .catch((error) => {
          console.error(error);
          this.message="Unfortunately there was a problem activating your account."
		  this.message2="Please try again."
        });
    } else {
      this.message="Invalid activation link provided."
	  this.message2="Please try aagin with correct Link."
    }
  },
};
</script>

<style scoped>
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
