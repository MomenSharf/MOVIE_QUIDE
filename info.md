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

"backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],
"still_sizes": [
  "w92",
  "w185",
  "w300",
  "original"
]