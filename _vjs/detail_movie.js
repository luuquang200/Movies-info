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
           <p><strong>Actor:</strong> {{ movie.actorList && movie.actorList.length > 0 ? movie.actorList.map(actor => actor.name).join(', ') : '' }}</p>
           <p><strong>Genres:</strong> {{ movie.genreList && movie.genreList.length > 0 ? movie.genreList.map(genre => genre.value).join(', ') : '' }}</p>
           <p><strong>Reviews:</strong></p>
            <div v-for="review in reviews" class="review">
              <h6 v-if="review.title">{{ review.title }}</h6>
              <p v-if="review.content">{{ review.content }}</p>
              <p v-if="review.username"><strong>User:</strong> {{ review.username }}</p>
              <p v-if="review.date"><strong>Date:</strong> {{ review.date }}</p>
              <p v-if="review.rate"><strong>Rate:</strong> {{ review.rate }}</p>
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