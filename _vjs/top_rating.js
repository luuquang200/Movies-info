import dbProvider from './dbProvider.js';

export default {
    data() {
        return {
            title: 'Top Rating',
            database: [],
            current: 0,
            numOfPage: 5
        }
    },
    async created() {
        const queryString = `get/top50/?per_page=15&page=1`;
        const topHighestRevenue = await dbProvider.fetch(queryString);
        console.log('topHighestRevenue');
        console.log(topHighestRevenue);
        this.database = topHighestRevenue.items;
        console.log('this.database');
        console.log(this.database);
       
    },
    props:['isHide'],
    computed: {
        currentMovies() {
            const start = this.current * 3;
            const end = start + 3;
            return this.database.slice(start, end);
        },
    },
    methods: {
        movieClick(movie) {
            const id = movie.id; 
            this.$emit("movieClick", id); 
        },
        next() {
            if (this.current < this.numOfPage - 1) {
                this.current++;
            }
        },
        prev() {
            if (this.current > 0) {
                this.current--;
            }
        },
        paginate(index) {
            this.current = index;
          },
        setActiveIndex(index) {
            this.current = index;
        },
    },
    template: `
    <template v-if="!isHide">
        <div class="movie-header carousel slide">
            <h4>{{this.title}}</h4>
            <div class="carousel-indicators sub-carousel">
                <button v-for="(movie, index) in numOfPage" :key="index" type="button" :data-bs-target="'#topRatedSilde'" :data-bs-slide-to="index" :class="{'active': index === current}" @click="paginate(index)">
                </button>
            </div>
        </div>
        <div class="movie-scroll carousel slide">
            <div class="movie-list">
                <div class="movie-item" v-for="(movie, index) in currentMovies" :key="index" @click="movieClick(movie)">
                    <img :src="movie.image" :alt="movie.title">
                    <div class="movie-name">
                        <h5>{{movie.title}}</h5>
                        <p>ImDb rating: {{movie.ratings.imDb}}</p>
                    </div>
                </div>
            </div>

            <button class="carousel-control-prev slide-button" type="button" data-bs-target="#topRatedSilde" data-bs-slide="prev" @click="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next slide-button" type="button" data-bs-target="#topRatedSilde" data-bs-slide="next" @click="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </template>
    `
};

