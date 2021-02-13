const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const apiKEY = process.env.API_KEY

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10)

module.exports = {
  redirect: function (req, res) {
    res.redirect('/person/page=1')
  },
  request: function (req, res) {
    const page = req.params.pageNumber

    rp(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKEY}&page=${page}`
    )
      .then(function (data) {
        res.render('people', {
          info: JSON.parse(data),
          page: page,
          image: image_url,
          kebabCase: _.kebabCase,
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
    const personID = req.params.personID

    rp(
      `https://api.themoviedb.org/3/person/${personID}?api_key=${apiKEY}&append_to_response=external_ids,combined_credits,images`
    )
      .then(function (data) {
        res.render('peopleInfo', {
          info: JSON.parse(data),
          image: image_url,
          ageNow: getAge,
          kebabCase: _.kebabCase,
          capitalize: _.capitalize,
          lowercase: _.lowerCase,
        })
      })
      .catch(function (err) {
        console.log(err)
        res.redirect('/')
      })
  },
}
