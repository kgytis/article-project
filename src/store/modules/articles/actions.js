import axios from 'axios';
import { v4 as uuid } from 'uuid';
const url = 'http://localhost:3000';
export default {
  async fetchArticles(context, payload) {
    try {
      // Cia kartu tures buti search logika bei paginate logika
      // Fetch for articles (needed for multi-article page)
      const { pageSize, currentPage, searchQuery } = payload;
      let query;
      if (searchQuery === '') {
        query = `?_page=${currentPage}&_limit=${pageSize}`;
      } else {
        query = `?title_like=${searchQuery}&_page=${currentPage}&_limit=${pageSize}`;
      }
      const responseArticles = await axios.get(`${url}/articles${query}`);
      const totalItems = Number(responseArticles.headers['x-total-count']);
      const totalPages = Math.ceil(totalItems / pageSize);
      // Fetch for authors (needed for multi-article page)
      const responseAuthors = await axios.get(`${url}/authors`);
      const mergedAndFilteredArticles = [];
      for (let i = 0; i < responseArticles.data.length; i++) {
        for (let j = 0; j < responseAuthors.data.length; j++) {
          if (
            responseArticles.data[i]['author_id'] ===
            responseAuthors.data[j]['id']
          ) {
            mergedAndFilteredArticles.push({
              id: responseArticles.data[i]['id'],
              name: responseAuthors.data[j]['name'],
              title: responseArticles.data[i]['title'],
              body: responseArticles.data[i]['body'],
              created_at: responseArticles.data[i]['created_at'],
              updated_at: responseArticles.data[i]['updated_at'],
            });
          }
        }
      }
      context.commit('setArticles', mergedAndFilteredArticles);
      context.commit('setPageNumber', totalPages);
      context.commit('countArticles', totalItems);
    } catch (error) {
      throw new Error('Failed to fetch data!' || error.message);
    }
  },
  async fetchArticle(context, payload) {
    const { articleId } = payload;
    try {
      const responseArticles = await axios.get(`${url}/articles/${articleId}`);
      const authorId = responseArticles.data.author_id;
      const responseAuthors = await axios.get(`${url}/authors/${authorId}`);
      const authorName = responseAuthors.data.name;
      const data = {
        ...responseArticles.data,
        authorName,
      };
      context.commit('setArticle', data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async editArticle(_, payload) {
    const { id, title, article, updatedAt } = payload;
    try {
      axios.patch(`${url}/articles/${id}`, {
        title: title,
        body: article,
        updated_at: updatedAt,
      });
    } catch (error) {
      throw new Error('Failed to fetch data!' || error.message);
    }
  },
  async deleteArticle(context, payload) {
    const articleId = payload;
    axios.delete(`${url}/articles/${articleId}`);
    const allArticles = context.getters.articles;
    const filteredArticles = allArticles.filter((item) => {
      return item.id !== articleId;
    });
    context.commit('setArticles', filteredArticles);
  },
  async postArticle(_, payload) {
    const { title, article, authName, authId, createdAt } = payload;
    const articleId = uuid();
    try {
      await axios.post(`${url}/articles`, {
        id: articleId,
        title: title,
        body: article,
        author_id: authId,
        created_at: createdAt,
        updated_at: '',
      });
    } catch (error) {
      throw new Error(
        'Could not post an article. Try again later.' || error.message
      );
    }
  },
};
