const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')
const bodyParser = require('body-parser')
const getLanguageName = require('iso-639-1')

dotenv.config()

const app = express()

const image_url = 'https://image.tmdb.org/t/p/original'
const yt_url = 'https://www.youtube.com/watch?v='
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function (req, res) {
  const requestMovies = [
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKEY}`,
  ]

  const promises = requestMovies.map((requestMovie) => rp(requestMovie))
  Promise.all(promises).then((data) => {
    const trendingData = JSON.parse(data[0])
    const now_playingData = JSON.parse(data[1])
    const popularData = JSON.parse(data[2])
    const top_ratedData = JSON.parse(data[3])

    res.render('index', {
      trending: trendingData,
      now_playing: now_playingData,
      popular: popularData,
      top_rated: top_ratedData,
      image: image_url,
      kebabCase: kebabCase,
    })
  })
})

function timeConvert(n) {
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + 'h ' + rminutes + 'm'
}

app.get('/movie/:movieID-:movieName', function (req, res) {
  const requestID = req.params.movieID

  rp(
    `https://api.themoviedb.org/3/movie/${requestID}?api_key=${apiKEY}&append_to_response=videos,images,credits,recommendations,keywords`
  )
    .then(function (data) {
      res.render('movie', {
        info: JSON.parse(data),
        image: image_url,
        ytURL: yt_url,
        timeConvert: timeConvert,
        kebabCase: kebabCase,
        getLanguageName: getLanguageName,
      })
    })
    .catch(function (err) {
      console.log(JSON.parse(err.response.body).status_message)
      res.redirect('/')
    })
})

app.get('/search/:querySearch', function (req, res) {
  const searchQuery = req.params.querySearch

  rp(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&query=${searchQuery}`
  )
    .then(function (data) {
      res.render('search', {
        info: JSON.parse(data),
        image: image_url,
        kebabCase: kebabCase,
        searchQuery: searchQuery,
        capitalize: _.capitalize,
        lowercase: _.lowerCase,
      })
    })
    .catch(function (err) {
      console.log(JSON.parse(err.response.body).status_message)
      res.redirect('/')
    })
})

app.post('/search', function (req, res) {
  const searchQuery = kebabCase(req.body.query)
  res.redirect(`/search/${searchQuery}`)
})

app.get('/keyword/:keywordId-keywo')

app.use(function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT, function () {
  console.log('server is running on port ', process.env.PORT)
})
