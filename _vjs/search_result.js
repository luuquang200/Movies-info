import dbProvider from '../_vjs/dbProvider.js';

export default {
    data() {
        return {
            movies: [],
            currentPage: 1,
            perPage: 10,
            totalResults: 0,
        };
    },
    props: ['isShowSearchResult', 'query'],
    methods: {
        movieClick(movie) {
            const id = movie.id;
            this.$emit('movieClick', id);
        },
        async getResults() {
            const queryString = `search/movie/${this.query}?per_page=${this.perPage}&page=${this.currentPage}`;
            const movies = await dbProvider.fetch(queryString);
            this.movies = movies.items;
            this.totalResults = movies.total;
        },
        changePage(page) {
            this.currentPage = page;
            this.getResults();
        },
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalResults / this.perPage);
        },
    },
    template: `
        <template v-if="isShowSearchResult">
            <div class="movie-grid">
                <div v-for="movie in movies" :key="movie.id" class="movie-item-result" @click="movieClick(movie)">
                    <img :src="movie.image" alt="Movie poster">
                    <h3>{{ movie.title }}</h3>
                    <p>{{ movie.year }}</p>
                </div>
            </div>
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="changePage(currentPage - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li v-for="page in pageCount" :key="page" class="page-item" :class="{ active: page === activePage }">
                    <a class="page-link" href="javascript:void(0)" @click="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === pageCount }">
                    <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="changePage(currentPage + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </template>
    `,
    watch: {
        query: {
            immediate: true,
            handler() {
                this.getResults();
            },
        },
    },
};