export default {
    data() {
        return {
        }
    },
    template: `
        <nav class="navbar bg-body-tertiary rounded ">
            <div class="container-fluid">
            <a class="navbar-brand">Home</a>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </nav>
    `
};