<template>
  <div>
    <base-spinner v-if="isLoading"></base-spinner>
    <form v-else @submit.prevent="submitForm">
      <div class="field">
        <label class="label" for="title">Article title </label>
        <div class="control">
          <input
            name="title"
            id="title"
            :class="{ 'is-danger': !title.isValid }"
            class="input"
            type="text"
            placeholder="Title"
            v-model.trim="title.val"
            value="editableArticle.title"
            @blur="clearValidity('title')"
          />
        </div>
        <p class="invalid" v-if="!title.isValid">Field cannot be empty</p>
      </div>
      <div class="field">
        <label class="label" for="article">Article</label>
        <div class="control">
          <textarea
            name="body"
            id="body"
            class="textarea"
            :class="{ 'is-danger': !body.isValid }"
            placeholder="Article"
            v-model.trim="body.val"
            value="body.val"
            @blur="clearValidity('body')"
          />
        </div>
        <p class="invalid" v-if="!body.isValid">Field cannot be empty</p>
      </div>
      <button class="button is-success">Save changes</button>
    </form>
    <button class="button" @click="closeModal">Cancel</button>
  </div>
</template>

<script>
export default {
  emits: ['close-modal', 'save-data'],
  props: ['articleId', 'refetch'],
  data() {
    return {
      title: {
        val: '',
        isValid: true,
      },
      body: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  computed: {
    article() {
      return this.$store.getters['articles/article'];
    },
  },
  methods: {
    closeModal() {
      this.formIsValid = true;
      this.$emit('close-modal');
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      // sets formIsValid to true, just in case
      this.formIsValid = true;
      // checks if input fields are empty, if atleast one is empty, then formIsValid will be false and seperately every field will be valid or invalid
      if (this.title.val === '') {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.body.val === '') {
        this.body.isValid = false;
        this.formIsValid = false;
      }
    },
    async loadArticle() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('articles/fetchArticle', {
          articleId: this.articleId,
        });
        this.title.val = this.article.title;
        this.body.val = this.article.body;
        this.isLoading = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    submitForm() {
      this.validateForm();
      console.log(this.article.title);
      console.log(this.title.val);
      if (
        this.article.title === this.title.val &&
        this.article.body === this.body.val
      ) {
        this.closeModal();
        this.$toast.open({
          message: `No changes have been made.`,
          type: 'info',
        });
      } else {
        if (!this.formIsValid) {
          return;
        }
        const formData = {
          id: this.articleId,
          title: this.title.val,
          article: this.body.val,
          updatedAt: new Date().getTime(),
        };
        this.closeModal();
        this.$emit('save-data', formData);
      }
    },
  },
  watch: {
    articleId() {
      this.loadArticle();
    },
    refetch() {
      this.loadArticle();
    },
  },
};
</script>

<style>
.invalid {
  color: red;
}
</style>
