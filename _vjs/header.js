export default {
    data() {
        return {
            keyAPI: '20558',
            mssv: '20120558',
            title: 'Movies info',
        }
    },
    template: `
        <div class="alert mb-2">
            <div class="row">
                <div class="col-4 d-flex align-items-center p-0">
                    <p>{{ mssv }}</p>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <h2>{{ title }}</h2>
                </div>
                <div class="col-4 d-flex flex-column align-items-end p-0">
                    <p>{{ keyAPI }}</p>
                    <div class="form-check form-switch mt-auto bd-highlight">
                        <input class="form-check-input" type="checkbox" id="darkmode" name="darkmode">
                        <label class="form-check-label" for="mySwitch">Dark Mode</label>
                    </div>
                </div>
            </div>
        </div>
    `
};