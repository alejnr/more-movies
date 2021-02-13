const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

module.exports = {
  redirect: function (req, res) {
    const searchQuery = kebabCase(req.body.query)
    res.redirect(`/search/${searchQuery}/page=1`)
  },
  request: function (req, res) {
    const searchQuery = req.params.querySearch
    const page = req.params.pageNumber

    rp(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKEY}&query=${searchQuery}&page=${page}`
    )
      .then(function (data) {
        res.render('search', {
          info: JSON.parse(data),
          image: image_url,
          page: page,
          kebabCase: kebabCase,
          searchQuery: searchQuery,
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
