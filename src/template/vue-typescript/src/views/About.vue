<script setup lang="ts">
defineOptions({
  name: "About"
});
</script>

<template>
  <div class="about">
    <h2>The project includes the following packages:</h2>
    <ul>
      <li>Husky + Lint-Staged + Commitlint</li>
      <li>ESLint(airbnb) + Prettier</li>
      <li>Vue Router</li>
      <li>Pinia</li>
      <li>Vitest</li>
    </ul>
    <RouterLink to="/" class="router-link">Go back</RouterLink>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
