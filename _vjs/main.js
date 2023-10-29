import vcheader from "./header.js"
import vcnav from "./nav.js"
import vctopBoxOfficeMovies from './top_boxoffice.js';
import vcmostPopular from './most_popular.js';
import vctopRating from './top_rating.js';
import vcfooter from "./footer.js"
import vcdetailMovie from "./detail_movie.js"
import dbProvider from './dbProvider.js';



export default {
    data() {
        return {
            showDetail: false,
            movie: {},
        }
    },
    components: {
        vcheader,
        vcnav,
        vctopBoxOfficeMovies,
        vcmostPopular,
        vctopRating,
        vcfooter,
        vcdetailMovie
    },
    methods: {
        async loadDetailMovie(id) {
            this.showDetail=true;
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
            <vcnav/>
            <vcdetailMovie :isHide='showDetail' :movie='movie'/>
            <vctopBoxOfficeMovies :isHide='showDetail' @movieClick="(id) => loadDetailMovie(id)"/>
            <vcmostPopular :isHide='showDetail'  @movieClick="(id) => loadDetailMovie(id)"/>
            <vctopRating :isHide='showDetail'  @movieClick="(id) => loadDetailMovie(id)"/>
            <vcfooter :isHide='showDetail'/>
        </div>
    </div>
    `
}