<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between">
      <h2 class="is-size-4">{{ article.authorName }}</h2>
      <div class="buttons">
        <button class="button is-link is-light" @click="editArticle">
          Edit
        </button>
        <button class="button is-danger is-light" @click="deleteArticle">
          Delete
        </button>
      </div>
    </div>
    <p class="is-size-7">Created at : {{ createDate }}</p>
    <p v-if="article.updated_at" class="is-size-7">Last updated at : {{ updateDate }}</p>
    <article class="box">
      <p>{{ article.body }}</p>
    </article>
  </div>
</template>

<script>
export default {
  emits: ['editArticle', 'deleteArticle'],
  props: ['article'],
  methods: {
    editArticle() {
      this.$emit('editArticle');
    },
    deleteArticle() {
      this.$emit('deleteArticle');
    },
    dateCreator(date) {
      const fullDate = new Date(date).toISOString();
      const fullYear = fullDate.slice(0, 10);
      const fullTime = fullDate.slice(11, 19);
      return fullYear + ' ' + fullTime;
    },
  },
  computed: {
    createDate() {
      return this.dateCreator(this.article.created_at)
    },
    updateDate() {
      return this.dateCreator(this.article.updated_at)
    },
  },
};
</script>
