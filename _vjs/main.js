import vcheader from "./header.js"

export default {
    data() {
        return {

        }
    },
    components: {
        vcheader
    },
    template: `
    <div class = container-fluid>
        <div class="row">
            <vcheader/>
        </div>
    </div>
    `
}