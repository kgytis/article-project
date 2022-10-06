<template>
  <li>
    <card>
      <div>
        <router-link :to="`articles/${articleId}`"
          ><h3>
            {{ title }}
          </h3>
        </router-link>
        <p class="is-size-7">Created at : {{ createDate }}</p>
        <p v-if="updatedAt" class="is-size-7">
          Last updated at : {{ updateDate }}
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
  emits: ['openEdit', 'itemDeleted'],
  data() {
    return {
      dialogToggle: false,
    };
  },
  computed: {
    createDate() {
      return this.dateCreator(this.createdAt);
    },
    updateDate() {
      return this.dateCreator(this.updatedAt);
    },
  },
  methods: {
    editItem() {
      console.log('Edit item');
      this.$emit('openEdit', this.articleId);
    },
    deletePrompt() {
      this.dialogToggle = !this.dialogToggle;
    },
    dateCreator(date) {
      const fullDate = new Date(date).toISOString();
      const fullYear = fullDate.slice(0, 10);
      const fullTime = fullDate.slice(11, 19);
      return fullYear + ' ' + fullTime;
    },
    async deleteItem(id) {
      this.deletePrompt();
      this.$store.dispatch('articles/deleteArticle', id);
      this.$emit('itemDeleted');
      this.$toast.open({
        message: `Successfully deleted article - ${this.title}`,
        type: 'info',
      });
    },
  },
};
</script>
<style scoped></style>
