<template>
<NavBar :problemPage= true ></NavBar>
<div class="w-screen h-[20px] bg-red-400">
</div>
</template>

<script lang="ts">
import NavBar from './NavBar.vue';
export default {
	name: "ProblemPage",
	components:{
		NavBar,
	}
}
</script>

<style scoped>
</style>
