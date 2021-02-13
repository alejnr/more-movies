const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const image_url = 'https://image.tmdb.org/t/p/original'
const kebabCase = _.kebabCase
const apiKEY = process.env.API_KEY

module.exports = {
  request: function (req, res) {
    const keyword_id = req.params.keywordId
    const keyword_name = req.params.keywordName

    rp(
      `https://api.themoviedb.org/3/keyword/${keyword_id}/movies?api_key=${apiKEY}`
    )
      .then(function (data) {
        res.render('keyword', {
          info: JSON.parse(data),
          image: image_url,
          kebabCase: kebabCase,
          keywordName: keyword_name,
          capitalize: _.capitalize,
          lowercase: _.lowerCase,
        })
      })
      .catch(function (err) {
        console.log(JSON.parse(err.response.body).status_message)
        res.redirect('/')
      })
  },
}
