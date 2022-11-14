const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

module.exports = {
  redirect: function (req, res) {
    res.redirect('/horror/page/1')
  },
  request: function (req, res) {
    const page = req.params.pageNumber

    rp(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=27&page=${page}`
    )
      .then(function (data) {
        res.render('horror', {
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
}
