<template>
  <div
    class="w-10 font-robotomono text-sm flex flex-col justify-center items-center"
    :class="pass ? 'text-green-600' : 'text-red-600'"
  >
    {{ verdict }}
  </div>
</template>

<script lang="ts">
export default {
  name: "Verdict",
  props: {
    verdict: String,
  },
  methods: {},
  computed: {
    pass(): Boolean {
      return this.verdict === "AC";
    },
  },
};
</script>

<style></style>
