const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

router.get('/', function (req, res) {
  const requestMovies = [
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`,
  ]

  const promises = requestMovies.map((requestMovie) => rp(requestMovie))
  Promise.all(promises).then((data) => {
    const trendingData = JSON.parse(data[0])
    const now_playingData = JSON.parse(data[1])
    const popularData = JSON.parse(data[2])

    const randomBgImg =
      trendingData.results[
        Math.floor(Math.random() * trendingData.results.length - 1)
      ]

    res.render('index', {
      trending: trendingData,
      now_playing: now_playingData,
      randomBgImg: randomBgImg,
      popular: popularData,
      image: image_url,
      kebabCase: kebabCase,
    })
  })
})

module.exports = router
