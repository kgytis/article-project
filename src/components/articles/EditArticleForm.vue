<template>
  <form @submit.prevent="submitForm">
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
    <footer>
      <button class="button is-success" type="submit">Save changes</button>
      <button class="button" @click="closeModal">Cancel</button>
    </footer>
  </form>
</template>

<script>
export default {
  emits: ['close-modal', 'save-data'],
  props: ['articleId'],
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
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal', '');
      this.formIsValid = true;
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
        await this.$store.dispatch('articles/fetchArticle', {articleId : this.articleId});
        const article = await this.$store.getters['articles/article'];
        this.title.val = article.title;
        this.body.val = article.body;
      } catch (error) {
        console.log(error.message);
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        id : this.articleId,
        title: this.title.val,
        article: this.body.val,
        upadetedAt: new Date().getTime(),
      };
      this.closeModal();
      this.$emit('save-data', formData);
    },
  },
  watch: {
    articleId() {
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
