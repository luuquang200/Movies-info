import dbProvider from '../_vjs/dbProvider.js';

export default {
    data() {
        return {
            topBoxOfficeMovies: [],
            selectedMovie: {},
            activeIndex: 0,
        }
    },
    async created() {
        const queryString = 'get/topboxoffice/?per_page=5&page=1&number=5';
        const topHighestRevenue = await dbProvider.fetch(queryString);
        this.topBoxOfficeMovies = topHighestRevenue.items;
        this.selectedMovie = this.topBoxOfficeMovies[0] || {};
    },
    computed: {
        // get the list of movies to display in the slide
        movies() {
            return this.topBoxOfficeMovies.slice(1);
        }
    },
    methods: {
        //  click on poster
        movieClick(movie) {
            this.selectedMovie = movie;
        },
        next() {
            const index = this.topBoxOfficeMovies.indexOf(this.selectedMovie);
            if (index < this.topBoxOfficeMovies.length - 1) {
                this.selectedMovie = this.topBoxOfficeMovies[index + 1];
                this.setActiveIndex(index + 1);
            } else {
                this.selectedMovie = this.topBoxOfficeMovies[0];
                this.setActiveIndex(0);
            }
        },
        prev() {
            const index = this.topBoxOfficeMovies.indexOf(this.selectedMovie);
            if (index > 0) {
                this.selectedMovie = this.topBoxOfficeMovies[index - 1];
                this.setActiveIndex(index - 1);
            } else {
                this.selectedMovie = this.topBoxOfficeMovies[this.topBoxOfficeMovies.length - 1];
                this.setActiveIndex(this.topBoxOfficeMovies.length - 1);
            }
        },
        setActiveIndex(index) {
            this.activeIndex = index;
            this.selectedMovie = this.topBoxOfficeMovies[index];
        },
    },
    template: `
    <template v-if="!isHide">
    <div id="topBoxOfficeSlide" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button v-for="(movie, index) in topBoxOfficeMovies" :key="index" type="button" :data-bs-target="'#topBoxOfficeSlide'" :data-bs-slide-to="index" :class="{'active': index === activeIndex}" @click="setActiveIndex(index)">
            </button>
        </div>

        <div class="carousel-inner">
            <div v-if="selectedMovie" class="carousel-item active">
                <img :src="selectedMovie.image" class="d-block" :alt="selectedMovie.title" @click="movieClick(selectedMovie)">
                <div class="carousel-caption d-none d-md-block">
                    <h6>{{selectedMovie.fullTitle}}</h6>
                </div>
            </div>
            <div v-for="(movie, index) in movies.slice(1)" :key="index" class="carousel-item">
                <img :src="movie.image" class="d-block" :alt="movie.title" @click="movieClick(movie)">
                <div class="carousel-caption d-none d-md-block">
                    <h5>{{movie.fullTitle}}</h5>
                </div>
            </div>
        </div>

        <button class="carousel-control-prev" type="button" :data-bs-target="'#topBoxOfficeSlide'" data-bs-slide="prev" @click="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#topBoxOfficeSlide'" data-bs-slide="next" @click="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
    </div>
    </template>
    `
};
