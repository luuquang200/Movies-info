import vcheader from "./header.js"
import vcnav from "./nav.js"
import vctopBoxOfficeMovies from './top_boxoffice.js';
import vcmostPopular from './most_popular.js';
import vctopRating from './top_rating.js';

export default {
    data() {
        return {

        }
    },
    components: {
        vcheader,
        vcnav,
        vctopBoxOfficeMovies,
        vcmostPopular,
        vctopRating,
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
            <vcnav/>
            <vctopBoxOfficeMovies/>
            <vcmostPopular/>
            <vctopRating/>
        </div>
    </div>
    `
}