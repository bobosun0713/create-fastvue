<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";

defineOptions({
  name: "Home"
});
</script>

<template>
  <div class="home">
    <HelloWorld></HelloWorld>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
