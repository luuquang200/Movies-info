import vcheader from "./header.js"
import vcnav from "./nav.js"
import vctopBoxOfficeMovies from './top_boxoffice.js';
import vcmostPopular from './mostpopular.js';

export default {
    data() {
        return {

        }
    },
    components: {
        vcheader,
        vcnav,
        vctopBoxOfficeMovies,
        vcmostPopular
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
            <vcnav/>
            <vctopBoxOfficeMovies/>
            <vcmostPopular/>
        </div>
    </div>
    `
}