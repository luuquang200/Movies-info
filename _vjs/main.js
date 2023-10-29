import vcheader from "./header.js"
import vcnav from "./nav.js"
import vctopBoxOfficeMovies from './top_boxoffice.js';
import vcmostPopular from './most_popular.js';
import vctopRating from './top_rating.js';
import vcfooter from "./footer.js"
import vcdetailMovie from "./detail_movie.js"
import dbProvider from './dbProvider.js';
import searchResult from './search_result.js';


export default {
    data() {
        return {
            showDetail: false,
            movie: {},
            searchQuery: "",
            isShowSearchResult: false,
        }
    },
    components: {
        vcheader,
        vcnav,
        vctopBoxOfficeMovies,
        vcmostPopular,
        vctopRating,
        vcfooter,
        vcdetailMovie,
        searchResult,
    },
    methods: {
        async loadDetailMovie(id) {
            this.showDetail=true;
            this.isShowSearchResult = false;
            const queryString = `detail/movie/${id}`;
            const movie = await dbProvider.fetch(queryString);
            console.log('movie');
            console.log(movie);
            this.movie = movie;
            window.history.pushState({ id }, '', `/${id}`);
        },
        backToHome() {
            window.history.pushState(null, '', './');
            window.location.reload();
        },
        handleSearch(src) {
            this.searchQuery = src;
            this.isShowSearchResult = true;
        }
    },
    mounted() {
        window.history.pushState(null, '', './');
        window.addEventListener('popstate', (event) => {
          if (event.state === null) {
            window.location.reload();
          }
        });
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
            <vcnav @search="(src)=>handleSearch(src)"/>
            <vcdetailMovie :isHide='showDetail' :movie='movie'/>
            <searchResult :isShowSearchResult='isShowSearchResult' :query='searchQuery' @movieClick="(id) => loadDetailMovie(id)"/>
            <vctopBoxOfficeMovies :isHide='showDetail' :isShowSearchResult='isShowSearchResult' @movieClick="(id) => loadDetailMovie(id)"/>
            <vcmostPopular :isHide='showDetail' :isShowSearchResult='isShowSearchResult'  @movieClick="(id) => loadDetailMovie(id)"/>
            <vctopRating :isHide='showDetail' :isShowSearchResult='isShowSearchResult' @movieClick="(id) => loadDetailMovie(id)"/>
            <vcfooter :isHide='showDetail' />
        </div>
    </div>
    `
}