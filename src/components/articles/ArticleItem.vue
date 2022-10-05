<template>
  <li>
    <card>
      <div>
        <router-link :to="`articles/${articleId}`"
          ><h3>
            {{ title }}
          </h3>
        </router-link>
        <p class="creation">
          {{ createdAt }}
        </p>
        <h4>{{ author }}</h4>
      </div>
      <div class="buttons">
        <button class="button is-link" @click="editItem">Edit</button>
        <button class="button is-danger" @click="deletePrompt">Delete</button>
      </div>
    </card>
    <base-dialog
      :show="dialogToggle"
      title="Deletion message"
      @close="deletePrompt"
      @delete="deleteItem(articleId)"
    >
      <p>Are you sure you want to delete article - {{ title }} ?</p>
    </base-dialog>
  </li>
</template>

<script>
export default {
  props: ['articleId', 'title', 'updatedAt', 'createdAt', 'author', 'article'],
  emits: ['openEdit'],
  data() {
    return {
      dialogToggle: false,
    };
  },
  methods: {
    editItem() {
      console.log('Edit item');
      this.$emit('openEdit', this.title, this.article, this.articleId);
    },
    deletePrompt() {
      this.dialogToggle = !this.dialogToggle;
    },
    async deleteItem(id) {
      this.deletePrompt();
      this.$store.dispatch('articles/deleteArticle', id);
      this.$toast.open({
        message: `Successfully deleted article - ${this.title}`,
        type: 'info',
      });
    },
  },
};
</script>
<style scoped></style>
