<template>
  <div :class="`modal ${modalToggle}`">
    <div class="modal-background" @click="modalHandle"></div>
    <div class="modal-content">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <section class="modal-card-body">
        <!-- Form component-->
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalToggle: {
      type: String,
      required: true,
    },
    authId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close-modal'],
  methods: {
    modalHandle() {
      this.$emit('close-modal', '');
    },
  },
};
</script>
