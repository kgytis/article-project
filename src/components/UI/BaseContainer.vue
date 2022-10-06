<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  width: min(100% - 15px, 840px);
  margin-inline: auto;
}
</style>
