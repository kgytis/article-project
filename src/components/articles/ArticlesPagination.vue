<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <!-- <a class="pagination-previous">Previous</a>
    <a class="pagination-next">Next page</a> -->
    <ul class="pagination-list">
      <li v-for="(page, index) in pageArray" :key="page.number">
        <a
          class="pagination-link"
          :class="{ 'is-current': page.activePage }"
          @click="changePage(page.number, index)"
          >{{ page.number }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ['changePage'],
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    totalArticles: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pageArray: [],
    };
  },
  methods: {
    pageArrayFiller() {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pageArray.push({ number: i, activePage: false });
      }
    },
    changePage(page, index) {
      // Item in pageArray with this index activePage turned to true
      this.pageArray.map((item) => {
        item.activePage = false;
      });
      this.pageArray[index].activePage = true;
      this.$emit('pageNumber', page);
    },
    pageReset() {
      this.pageArray = [];
      this.pageArrayFiller();
      this.pageArray[0].activePage = true;
    },
  },
  watch: {
    totalPages() {
      this.pageReset();
    },
    totalArticles() {
      this.pageReset();
    },
  },
  created() {
    this.pageArrayFiller();
    this.pageArray[0].activePage = true;
  },
};
</script>
