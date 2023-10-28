import data from './../db/data.js';

export default {
    fetch: async function(queryString) {
        const movies = data.Movies;
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
                        const searchResults = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
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
                        const movie = movies.find(movie => movie.id === id);

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

                        // the get logic 
                        const top50Movies = movies.slice(0, 50);

                        result = {
                            page: page,
                            per_page: perPage,
                            total_page: Math.ceil(top50Movies.length / perPage),
                            total: top50Movies.length,
                            items: top50Movies.slice((page - 1) * perPage, page * perPage)
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