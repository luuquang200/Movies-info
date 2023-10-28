import vcheader from "./header.js"
import vcnav from "./nav.js"
import vctopBoxOfficeMovies from './top_boxoffice.js';

export default {
    data() {
        return {

        }
    },
    components: {
        vcheader,
        vcnav,
        vctopBoxOfficeMovies
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
            <vcnav/>
            <vctopBoxOfficeMovies/>
        </div>
    </div>
    `
}