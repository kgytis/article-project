<template>
  <form @submit.prevent="submitForm">
    <div class="field">
      <label class="label" for="title">Article title</label>
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
          name="article"
          id="article"
          class="textarea"
          :class="{ 'is-danger': !article.isValid }"
          placeholder="Article"
          v-model.trim="article.val"
          @blur="clearValidity('article')"
        />
      </div>
      <p class="invalid" v-if="!article.isValid">Field cannot be empty</p>
    </div>
    <div class="select">
      <select name="name" id="name" v-model="name.val">
        <option
          v-for="author in allAuthors"
          :key="author.id"
          :value="author.id"
          :text="author.name"
        >
          {{ author.name }}
        </option>
      </select>
    </div>
    <div class="field">
      <label class="label" for="name">Author name</label>
      <p class="invalid" v-if="!name.isValid">Field cannot be empty</p>
    </div>
    <p class="invalid" v-if="!formIsValid">
      Please fix the above errors and submit again.
    </p>
    <footer>
      <button class="button is-success" type="submit">Save changes</button>
      <button class="button" @click="closeModal">Cancel</button>
    </footer>
  </form>
</template>

<script>
export default {
  emits: ['close-modal', 'save-data'],
  data() {
    return {
      title: {
        val: '',
        isValid: true,
      },
      article: {
        val: '',
        isValid: true,
      },
      name: {
        val: '',
        text : '',
        isValid: true,
      },
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal', '');
      // this.formIsValid = true;
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
      if (this.article.val === '') {
        this.article.isValid = false;
        this.formIsValid = false;
      }
      // if (this.name.val === '') {
      //   this.name.isValid = false;
      //   this.formIsValid = false;
      // }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        title: this.title.val,
        article: this.article.val,
        authName: this.name.text,
        authId: this.name.val,
        createdAt: new Date().getTime(),
      };
      this.closeModal();
      this.$emit('save-data', formData);
    },
    async loadAuthors() {
      try {
        console.log('loadAuthors')
        await this.$store.dispatch('authors/fetchAuthors');
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    allAuthors() {
      return this.$store.getters['authors/authors'];
    },
  },
  created() {
    this.loadAuthors();
  },
};
</script>

<style>
.invalid {
  color: red;
}
</style>
