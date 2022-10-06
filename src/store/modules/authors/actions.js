import axios from 'axios';
const url = 'http://localhost:3000'
export default {
  async fetchAuthors(context) {
    try {
      const response = await axios.get(`${url}/authors`);
      context.commit('setAuthors', response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
