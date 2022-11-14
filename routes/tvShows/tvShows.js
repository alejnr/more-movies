const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')
const getLanguageName = require('iso-639-1')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const yt_url = 'https://www.youtube.com/watch?v='
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

function timeConvert(n) {
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + 'h ' + rminutes + 'm'
}

module.exports = {
  redirect: function (req, res) {
    res.redirect('/tv/page/1')
  },
  request: function (req, res) {
    const page = req.params.pageNumber

    rp(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKEY}&page=${page}`
    )
      .then(function (data) {
        res.render('tvShow', {
          info: JSON.parse(data),
          page: page,
          image: image_url,
          kebabCase: kebabCase,
          capitalize: _.capitalize,
          lowercase: _.lowerCase,
        })
      })
      .catch(function (err) {
        console.log(err)
        res.redirect('/')
      })
  },
  info: function (req, res) {
    const requestID = req.params.tvShowID

    rp(
      `https://api.themoviedb.org/3/tv/${requestID}?api_key=${apiKEY}&append_to_response=videos,images,credits,recommendations,keywords`
    )
      .then(function (data) {
        res.render('tvShowInfo', {
          info: JSON.parse(data),
          image: image_url,
          ytURL: yt_url,
          timeConvert: timeConvert,
          kebabCase: kebabCase,
          getLanguageName: getLanguageName,
        })
      })
      .catch(function (err) {
        console.log(err)
        res.redirect('/')
      })
  },
}
