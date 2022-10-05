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
  props: ['articleTitle', 'article', 'articleId'],
  data() {
    return {
      id: '',
      title: {
        val: 'title',
        isValid: true,
      },
      body: {
        val: this.article,
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
      //   this.title.val = ''
      //   this.body.val = ''
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
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        title: this.title.val,
        article: this.body.val,
        upadetedAt: new Date().getTime(),
      };
      this.closeModal();
      this.$emit('save-data', formData);
    },
  },
  watch: {
    id() {
      this.title.val = this.articleTitle;
      this.body.val = this.article;
    },
  },
  beforeUnmount(){
    console.log('bingo!')
    // this.id = this.articleId
  }
};
</script>

<style>
.invalid {
  color: red;
}
</style>
