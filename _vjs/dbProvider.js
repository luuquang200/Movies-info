import data from './../db/data.js';

export default {
    fetch: async function(queryString) {
        // const movies = data.Movies;
        const [type, cls, patternWithParams] = queryString.split('/');
        const [pattern, queryParamsString] = patternWithParams.split('?');
        const queryParams = new URLSearchParams(queryParamsString);
        console.log('type: ' + type);
        console.log('cls: ' + cls);
        console.log('pattern: ' + pattern);
        console.log('queryParams: ' + queryParams);
        const params = new URLSearchParams(queryParams);

        let result = {};

        switch (type) {
            case 'search':
                switch (cls) {
                    case 'movie':
                        const searchQuery = pattern;
                        const perPage = params.get('per_page') || 10;
                        const page = params.get('page') || 1;

                        // the search logic 
                        const searchResults = data.Movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
                        console.log('searchResults.length: ' + searchResults.length);
                        result = {
                            search: searchQuery,
                            page: page, 
                            per_page: perPage,
                            total_page: Math.ceil(searchResults.length / perPage),
                            total: searchResults.length,
                            items: searchResults.slice((page - 1) * perPage, page * perPage)
                        };
                        break;
                    case 'name':

                        break;
                    default:
                        throw new Error(`Invalid class: ${cls}`);
                }
                break;
            case 'detail':
                switch (cls) {
                    case 'movie':
                        const id = pattern;

                        // the detail logic 
                        const movie = data.Movies.find(movie => movie.id === id);

                        result = {
                            id: id,
                            title: movie.title,
                            year: movie.year,
                            plot: movie.plot,
                            awards: movie.awards,
                            directorList: movie.directorList,
                            writerList: movie.writerList,
                            actorList: movie.actorList,
                            genreList: movie.genreList,
                            companies: movie.companies,
                            countries: movie.countries,
                            languages: movie.languages,
                            ratings: movie.ratings,
                            posters: movie.posters,
                            images: movie.images,
                            boxOffice: movie.boxOffice,
                            keywords: movie.keywords,
                            similars: movie.similars,
                            plotFull: movie.plotFull
                        };
                        break;
                    default:
                        throw new Error(`Invalid class: ${cls}`);
                }
                break;
            case 'get':
                switch (cls) {
                    case 'top50':
                        const perPage = params.get('per_page') || 10;
                        const page = params.get('page') || 1;

                        // the get logic get the top rated movies base on the imDbRating property
                        const top50Movies = data.Movies
                        .filter(movie => movie.ratings && movie.ratings.imDb)
                        .sort((a, b) => b.ratings.imDb.replace(/\D/g, '') - a.ratings.imDb.replace(/\D/g, ''))

                        result = {
                            page: page,
                            per_page: perPage,
                            total_page: Math.ceil(top50Movies.length / perPage),
                            total: top50Movies.length,
                            items: top50Movies.slice((page - 1) * perPage, page * perPage)
                        };
                        break;
                    // get the top highest-grossing movies based on the cumulativeWorldwideGross property
                    case 'topboxoffice':
                        const perPage2 = params.get('per_page') || 10;
                        const page2 = params.get('page') || 1;

                        // the logic to get the "number" of top highest-grossing movies 
                        const topBoxOfficeMovies = data.Movies
                        .filter(movie => movie.boxOffice && movie.boxOffice.cumulativeWorldwideGross)
                        .sort((a, b) => b.boxOffice.cumulativeWorldwideGross.replace(/\D/g, '') - a.boxOffice.cumulativeWorldwideGross.replace(/\D/g, ''))
                        

                        // console.log('topBoxOfficeMovies.length: ' + topBoxOfficeMovies.length);
                        // console.log(topBoxOfficeMovies);
                        // for (let i = 0; i < topBoxOfficeMovies.length; i++) {
                        //     console.log(topBoxOfficeMovies[i].boxOffice.cumulativeWorldwideGross);
                        // }
                        result = {
                            page: page2,
                            per_page: perPage2,
                            total_page: Math.ceil(topBoxOfficeMovies.length / perPage2),
                            total: topBoxOfficeMovies.length,
                            items: topBoxOfficeMovies.slice((page2 - 1) * perPage2, page2 * perPage2)
                        };
                        break;
                    case 'mostpopular':
                        const perPage3 = params.get('per_page') || 10;
                        const page3 = params.get('page') || 1;

                        // the logic to get the "number" of most popular movies 
                        const mostPopularMovies = data.MostPopularMovies

                        // console.log('mostPopularMovies.length: ' + mostPopularMovies.length);
                        // console.log(mostPopularMovies);
                        // for (let i = 0; i < mostPopularMovies.length; i++) {
                        //     console.log(mostPopularMovies[i].rank);
                        // }
                        
                        result = {
                            page: page3,
                            per_page: perPage3,
                            total_page: Math.ceil(mostPopularMovies.length / perPage3),
                            total: mostPopularMovies.length,
                            items: mostPopularMovies.slice((page3 - 1) * perPage3, page3 * perPage3)
                        };
                        break;

                    default:
                        throw new Error(`Invalid class: ${cls}`);
                }
                break;
            default:
                throw new Error(`Invalid type: ${type}`);
        }

        return result;
    }
};