import axios from 'axios';
import { v4 as uuid } from 'uuid';
export default {
  async fetchArticles(context, payload) {
    try {
      // Cia kartu tures buti search logika bei paginate logika
      // Fetch for articles (needed for multi-article page)
      const { pageSize, currentPage } = payload;
      const responseArticles = await axios.get(
        `http://localhost:3000/articles?_page=${currentPage}&_limit=${pageSize}`
      );
      const totalItems = responseArticles.headers['x-total-count'];
      const totalPages = Math.ceil(totalItems / pageSize);
      // console.log(totalPages)
      // Fetch for authors (needed for multi-article page)
      const responseAuthors = await axios.get('http://localhost:3000/authors');

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
    } catch (error) {
      throw new Error('Failed to fetch data!' || error.message);
    }
  },
  async fetchArticle(context, payload) {
    const { articleId } = payload;
    try {
      const response = await axios.get(
        `http://localhost:3000/articles/${articleId}`
      );
      context.commit('setArticle', response.data);
    } catch (error) {
      throw new Error('Failed to fetch data!' || error.message);
    }
  },
  async editArticle(context, payload) {
    console.log(payload)
    const {id, title, article, updatedAt} = payload
    try {
      axios.patch(`http://localhost:3000/articles/${id}`,{
      title : title,
      body: article,
      updated_at : updatedAt
      })
    } catch (error) {
      throw new Error('Failed to fetch data!' || error.message);
    }
    try {
    } catch (error) {}
  },
  async deleteArticle(context, payload) {
    const articleId = payload;
    axios.delete(`http://localhost:3000/articles/${articleId}`);
    // deleting in db, but no new fetch performed
    // filtering istead of fetch was implemented before, although
    // as with pagination, (small chunks of data are extracted)
    // re-fetch more suitable to reload data
    const allArticles = context.getters.articles;
    const filteredArticles = allArticles.filter((item) => {
      return item.id !== articleId;
    });
    context.commit('setArticles', filteredArticles);
  },
  async postArticle(context, payload) {
    const { title, article, authName, authId, createdAt } = payload;
    const articleId = uuid();
    // const authorId = uuid();
    const newArticle = {
      id: articleId,
      title: title,
      name: authName,
      body: article,
      created_at: createdAt,
      updated_at: '',
    };
    try {
      axios.post('http://localhost:3000/articles', {
        id: articleId,
        title: title,
        body: article,
        author_id: authId,
        created_at: createdAt,
        updated_at: '',
      });
      // istrinta po task'o patikslinimo
      // axios.post('http://localhost:3000/authors', {
      //   id: authorId,
      //   name: authName,
      //   created_at: createdAt,
      // });
    } catch (error) {
      throw new Error(
        'Could not post an article. Try again later.' || error.message
      );
    }
    // Kad tiksliai veiktu page'ination, geriau nedaryti modifikavimu front'e, o palikti viska back'ui
    // tada reiks kiekviena kart refetchinant
    // context.commit('addArticle', newArticle);
    console.log(payload);
  },
};
