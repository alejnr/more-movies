const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const tvShow = require('./routes/tvShows/tvShows')
const movie = require('./routes/movie')
const search = require('./routes/search')
const keyword = require('./routes/keyword')
const people = require('./routes/people')
const action = require('./routes/genres/action')
const comedy = require('./routes/genres/comedy')
const romance = require('./routes/genres/romance')
const horror = require('./routes/genres/horror')
const documentary = require('./routes/genres/documentary')
const movies = require('./routes/movies/movies')
const nowPlaying = require('./routes/movies/nowPlaying')
const upcoming = require('./routes/movies/upcoming')
const topRatedMovies = require('./routes/movies/topRated')
const airingToday = require('./routes/tvShows/airingToday')
const onTV = require('./routes/tvShows/onTV')
const topRatedTVShows = require('./routes/tvShows/topRated')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', index)

app.get('/tv/top-rated', topRatedTVShows.redirect)
app.get('/tv/top-rated/page=:pageNumber', topRatedTVShows.request)

app.get('/tv/on-the-air', onTV.redirect)
app.get('/tv/on-the-air/page=:pageNumber', onTV.request)

app.get('/tv/airing-today', airingToday.redirect)
app.get('/tv/airing-today/page=:pageNumber', airingToday.request)

app.get('/movie/top-rated', topRatedMovies.redirect)
app.get('/movie/top-rated/page=:pageNumber', topRatedMovies.request)

app.get('/movie/upcoming', upcoming.redirect)
app.get('/movie/upcoming/page=:pageNumber', upcoming.request)

app.get('/movie/now-playing', nowPlaying.redirect)
app.get('/movie/now-playing/page=:pageNumber', nowPlaying.request)

app.get('/movie/page=:pageNumber', movies.request)
app.get('/movie', movies.redirect)

app.get('/movie/:movieID-:movieName', movie)
app.get('/tv/:tvShowID-:tvShowName', tvShow.info)
app.get('/person/:personID-:personName', people.info)

app.post('/search', search.redirect)

app.get('/search/:querySearch/page=:pageNumber', search.request)

app.get('/keyword/:keywordId-:keywordName/movie', keyword.request)

app.get('/tv', tvShow.redirect)

app.get('/tv/page=:pageNumber', tvShow.request)

app.get('/person', people.redirect)

app.get('/person/page=:pageNumber', people.request)

app.get('/action', action.redirect)

app.get('/action/page=:pageNumber', action.request)

app.get('/comedy', comedy.redirect)

app.get('/comedy/page=:pageNumber', comedy.request)

app.get('/romance', romance.redirect)

app.get('/romance/page=:pageNumber', romance.request)

app.get('/horror', horror.redirect)

app.get('/horror/page=:pageNumber', horror.request)

app.get('/documentary', documentary.redirect)

app.get('/documentary/page=:pageNumber', documentary.request)

app.use(function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT, function () {
  console.log('server is running on port ', process.env.PORT)
})
