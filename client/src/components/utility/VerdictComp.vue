<template>

	<div class="w-10 font-robotomono text-sm flex flex-col justify-center items-center"
		:class="pass() ? 'text-green-600':'text-red-600'"
	
	>{{ verdict }}</div>
		
	
</template>

<script lang="ts">
export default{
	name: "Verdict",
	props:{
		verdict: String
	},
	methods: {
		pass(){
			if(this.verdict === "CE" || this.verdict === "TLE"){
				return false;
			}else{
				return true;
			}
		}	
	},
}
</script>

<style>

</style>