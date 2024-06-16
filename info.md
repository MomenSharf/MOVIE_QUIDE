Sure! I'll provide a list of common TMDb API endpoints along with their parameters. I'll also include this information in a text file for your convenience.

Here are the endpoints and their parameters:

### Common TMDb API Endpoints and Parameters

#### Search Movies

- **Endpoint**: `/search/movie`
- **Parameters**:
  - `api_key` (required)
  - `query` (required)
  - `page`
  - `language`
  - `include_adult`
  - `region`
  - `year`
  - `primary_release_year`

#### Movie Details

- **Endpoint**: `/movie/{movie_id}`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `append_to_response`

#### Popular Movies

- **Endpoint**: `/movie/popular`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `page`
  - `region`

#### Top Rated Movies

- **Endpoint**: `/movie/top_rated`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `page`
  - `region`

#### Discover Movies

- **Endpoint**: `/discover/movie`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `region`
  - `sort_by`
  - `certification_country`
  - `certification`
  - `certification.lte`
  - `certification.gte`
  - `include_adult`
  - `include_video`
  - `page`
  - `primary_release_year`
  - `primary_release_date.gte`
  - `primary_release_date.lte`
  - `release_date.gte`
  - `release_date.lte`
  - `with_release_type`
  - `year`
  - `vote_count.gte`
  - `vote_count.lte`
  - `vote_average.gte`
  - `vote_average.lte`
  - `with_cast`
  - `with_crew`
  - `with_people`
  - `with_companies`
  - `with_genres`
  - `without_genres`
  - `with_keywords`
  - `without_keywords`
  - `with_runtime.gte`
  - `with_runtime.lte`
  - `with_original_language`
  - `with_watch_providers`
  - `watch_region`
  - `with_watch_monetization_types`

#### Now Playing Movies

- **Endpoint**: `/movie/now_playing`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `page`
  - `region`

#### Upcoming Movies

- **Endpoint**: `/movie/upcoming`
- **Parameters**:
  - `api_key` (required)
  - `language`
  - `page`
  - `region`

Action: 28
Adventure: 12
Animation: 16
Comedy: 35
Crime: 80
Documentary: 99
Drama: 18
Family: 10751
Fantasy: 14
History: 36
Horror: 27
Music: 10402
Mystery: 9648
Romance: 10749
Science Fiction: 878
TV Movie: 10770
Thriller: 53
War: 10752
Western: 37


{
  adult: false,
  backdrop_path: '/tkHQ7tnYYUEnqlrKuhufIsSVToU.jpg',
  belongs_to_collection: {
    id: 10919,
    name: 'The Omen Collection',
    poster_path: '/5De8Hqq0z9gmDM7SbWU0C5pTjPC.jpg',
    backdrop_path: '/4RyL9BO36iRnQP7r9wiboOGwJKQ.jpg'
  },
  budget: 30000000,
  genres: [ { id: 27, name: 'Horror' } ],
  homepage: 'https://www.20thcenturystudios.com/movies/the-first-omen',
  id: 437342,
  imdb_id: 'tt5672290',
  origin_country: [ 'US' ],
  original_language: 'en',
  original_title: 'The First Omen',
  overview: 'When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.',
  popularity: 674.397,
  poster_path: '/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg',
  production_companies: [
    {
      id: 423,
      logo_path: '/uvA6e2O31qaonsbYd8tjvgqmNXh.png',
      name: 'Phantom Four',
      origin_country: 'US'
    },
    {
      id: 127928,
      logo_path: '/h0rjX5vjW5r8yEnUBStFarjcLT4.png',
      name: '20th Century Studios',
      origin_country: 'US'
    }
  ],
  production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  release_date: '2024-04-03',
  revenue: 53689531,
  runtime: 119,
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
    { english_name: 'Italian', iso_639_1: 'it', name: 'Italiano' }
  ],
  status: 'Released',
  tagline: 'Create something to fear.',
  title: 'The First Omen',
  video: false,
  vote_average: 6.779,
  vote_count: 482
}


