<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between">
      <h2 class="is-size-4">{{ article.authorName }}</h2>
      <div class="buttons">
        <button class="button is-link is-light" @click="editArticle">
          Edit
        </button>
        <button class="button is-danger is-light" @click="deletePrompt">
          Delete
        </button>
      </div>
    </div>
    <p class="is-size-7">Created at : {{ createDate }}</p>
    <p v-if="article.updated_at" class="is-size-7">
      Last updated at : {{ updateDate }}
    </p>
    <article class="box">
      <p>{{ article.body }}</p>
      <base-dialog
        :show="dialogToggle"
        title="Deletion message"
        @close="deletePrompt"
        @delete="deleteArticle"
      >
        <p>Are you sure you want to delete article - {{ article.title }} ?</p>
      </base-dialog>
    </article>
  </div>
</template>

<script>
export default {
  emits: ['editArticle', 'deleteArticle'],
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogToggle: false,
    };
  },
  computed: {
    createDate() {
      return this.dateCreator(this.article.created_at);
    },
    updateDate() {
      return this.dateCreator(this.article.updated_at);
    },
  },
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
    deletePrompt() {
      this.dialogToggle = !this.dialogToggle;
    },
  },
};
</script>
