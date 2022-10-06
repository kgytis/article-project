<template>
  <li>
    <card>
      <div>
        <router-link :to="`articles/${article.id}`"
          ><h3>
            {{ article.title }}
          </h3>
        </router-link>
        <p class="is-size-7">Created at : {{ createDate }}</p>
        <p v-if="this.article.updated_at" class="is-size-7">
          Last updated at : {{ updateDate }}
        </p>
        <h4>{{ article.name }}</h4>
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
      @delete="deleteItem(article.id)"
    >
      <p>Are you sure you want to delete article - {{ article.title }} ?</p>
    </base-dialog>
  </li>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['openEdit', 'itemDeleted'],
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
    editItem() {
      this.$emit('openEdit', this.article.id);
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
        message: `Successfully deleted article - ${this.article.title}`,
        type: 'info',
      });
    },
  },
};
</script>
