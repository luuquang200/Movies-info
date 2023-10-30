export default {
    data() {
        return {
            query: '',
        };
    },
    methods: {
        search() {
            this.$emit('search', this.query);
        },
    },
    template: `   
        <nav class="alert navbar rounded">
            <div class="container-fluid">
            <a class="navbar-brand" href="./index.html">Home</a>
                <form class="d-flex" @submit.prevent="search">
                    <input v-model="query" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    `,
};