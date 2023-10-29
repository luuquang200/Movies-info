// import dbProvider from '../_vjs/dbProvider.js';

// export default {
//     data() {
//         return {
//         }
//     },
//     props: ['isHide', 'movie'],

//     methods: {
//         handleImageError() {
//           console.error(`Failed to load image: ${this.movie.image}`);
//         }
//       },
//       template: `
//       <template v-if="isHide">
//       <div class="row">
//         <div class="col-md-4 detal-movie">
//           <img :src="movie.image" :alt="movie.title" @error="handleImageError">
//         </div>
//         <div class="col-md-8">
//           <h1>{{ movie.title }}</h1>
//           <p><strong>Year:</strong> {{ movie.year }}</p>
//           <p><strong>Director:</strong> {{ movie.directorList && movie.directorList.length > 0 ? movie.directorList[0].name : '' }}</p>
//           <p><strong>Summary:</strong> {{ movie.plot }}</p>
//           <p><strong>Cast:</strong> {{ movie.actorList && movie.actorList.length > 0 ? movie.actorList.map(actor => actor.name).join(', ') : '' }}</p>
//           <p><strong>Genres:</strong> {{ movie.genreList && movie.genreList.length > 0 ? movie.genreList.map(genre => genre.value).join(', ') : '' }}</p>
//         </div>
//       </div>
//     </template>
//     `,
//     watch: {
//       movie: {
//           immediate: true,
//           handler() {
             
//           },
//       },
//   },
// };

import dbProvider from '../_vjs/dbProvider.js';

export default {
     data() {
         return {
             reviews: [],
         }
     },
     props: ['isHide', 'movie'],

     methods: {
         handleImageError() {
           console.error(`Failed to load image: ${this.movie.image}`);
         },
         async fetchReviews() {
           // Giả sử rằng dbProvider.getReviews là một hàm trả về danh sách các đánh giá cho một bộ phim cụ thể
           const reviews = await dbProvider.fetch(`get/reviews/?id=${this.movie.id}`);
           this.reviews = reviews.items;
         }
       },
       template: `
       <template v-if="isHide">
       <div class="row">
         <div class="col-md-4 detal-movie">
           <img :src="movie.image" :alt="movie.title" @error="handleImageError">
         </div>
         <div class="col-md-8">
           <h1>{{ movie.title }}</h1>
           <p><strong>Year:</strong> {{ movie.year }}</p>
           <p><strong>Director:</strong> {{ movie.directorList && movie.directorList.length > 0 ? movie.directorList[0].name : '' }}</p>
           <p><strong>Summary:</strong> {{ movie.plot }}</p>
           <p><strong>Cast:</strong> {{ movie.actorList && movie.actorList.length > 0 ? movie.actorList.map(actor => actor.name).join(', ') : '' }}</p>
           <p><strong>Genres:</strong> {{ movie.genreList && movie.genreList.length > 0 ? movie.genreList.map(genre => genre.value).join(', ') : '' }}</p>
           <p><strong>Reviews:</strong></p>
           <div v-for="review in reviews" class="review">
             <h6>{{ review.title }}</h6>
             <p>{{ review.content }}</p>
             <p><strong>User:</strong> {{ review.username }}</p>
             <p><strong>Date:</strong> {{ review.date }}</p>
             <p><strong>Rate:</strong> {{ review.rate }}</p>
           </div>
         </div>
       </div>
     </template>
     `,
     watch: {
       movie: {
           immediate: true,
           handler() {
             this.fetchReviews();
           },
       },
   },
};