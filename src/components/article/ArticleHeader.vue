<template>
  <header class="mt-4 mb-4">
    <div>
      <button class="button" @click="back">Back</button>
    </div>
    <div class="box">
      <h1 class="is-size-3 has-text-centered">{{ title }}</h1>
    </div>
  </header>
</template>
<script>
export default {
  emits: ['back'],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    back() {
      this.$emit('back');
    },
  },
};
</script>
