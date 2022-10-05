<template>
  <div :class="`modal ${modalToggle}`">
    <div class="modal-background" @click="modalHandle"></div>
    <div class="modal-content">
      <header class="modal-card-head">
        <p class="modal-card-title">New article {{authId}}</p>
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
  props: ['modalToggle',"authId"],
  emits: ['close-modal'],
  methods: {
    modalHandle() {
      this.$emit('close-modal', '');
    },
  },
};
</script>
