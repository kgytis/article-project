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
      <!-- <li>
        <a class="pagination-link" aria-label="Goto page 1">1</a>
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 45">45</a>
      </li>
      <li>
        <a
          class="pagination-link is-current"
          aria-label="Page 46"
          aria-current="page"
          >46</a
        >
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 47">47</a>
      </li>
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link" aria-label="Goto page 86">86</a>
      </li> -->
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ['changePage'],
  props: ['pageSize', 'currentPage', 'totalPages'],

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
  },
  created() {
    this.pageArrayFiller();
    this.pageArray[0].activePage = true;
  },
};
</script>
