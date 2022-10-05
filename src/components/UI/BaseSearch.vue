<template>
  <form @submit.prevent="search">
    <div class="field search">
    <input type="search" v-model="searchQuery" placeholder="Filter items" />
    <button class="button">Search</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['search'],
  data(){
    return {
        searchQuery : ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery);
      this.searchQuery = ''
    },
  },
};
</script>

<style scoped>
input {
  font: inherit;
  width: 100%;
  display: block;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

.search{
    display: flex;
}

.search button {
    margin-left: 0.4rem;
}

input:focus {
  outline: none;
  border-color: #00006b;
  background-color: #eeeeff;
}
</style>