import vcheader from "./header.js"
import vcnav from "./nav.js"

export default {
    data() {
        return {

        }
    },
    components: {
        vcheader,
        vcnav
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
            <vcnav/>
        </div>
    </div>
    `
}