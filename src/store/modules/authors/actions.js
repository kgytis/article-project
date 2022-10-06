import axios from 'axios';
export default {
  async fetchAuthors(context) {
    try {
      const response = await axios.get('http://localhost:3000/authors');
      context.commit('setAuthors', response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
