const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const _ = require('lodash')
const rp = require('request-promise')

dotenv.config()

const app = express()

const netflixMovies = []
const trendingMovies = []
const topRatedMovies = []
const actionMovies = []
const comedyMovies = []
const romanceMovies = []
const horrorMovies = []
const documentariesMovies = []
const image_url = 'https://image.tmdb.org/t/p/original'

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function (req, res) {
  const apiKEY = process.env.API_KEY

  const requestMovies = [
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKEY}&with_networks=213`,
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKEY}`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=28`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=35`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=27`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=10749`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&with_genres=99`,
  ]

  const kebabCase = _.kebabCase

  const promises = requestMovies.map((requestMovie) => rp(requestMovie))
  Promise.all(promises).then((data) => {
    const netflixMoviesData = JSON.parse(data[0])
    const trendingMoviesData = JSON.parse(data[1])
    const topRatedMoviesData = JSON.parse(data[2])
    const actionMoviesData = JSON.parse(data[3])
    const comedyMoviesData = JSON.parse(data[4])
    const horrorMoviesData = JSON.parse(data[5])
    const romanceMoviesData = JSON.parse(data[6])
    const documentariesMoviesData = JSON.parse(data[7])

    netflixMovies.push(netflixMoviesData)
    trendingMovies.push(trendingMoviesData)
    topRatedMovies.push(topRatedMoviesData)
    actionMovies.push(actionMoviesData)
    comedyMovies.push(comedyMoviesData)
    romanceMovies.push(romanceMoviesData)
    horrorMovies.push(horrorMoviesData)
    documentariesMovies.push(documentariesMoviesData)

    res.render('index', {
      netflixMovies: netflixMoviesData,
      trendingMovies: trendingMoviesData,
      topRatedMovies: topRatedMoviesData,
      actionMovies: actionMoviesData,
      comedyMovies: comedyMoviesData,
      romanceMovies: romanceMoviesData,
      horrorMovies: horrorMoviesData,
      documentariesMovies: documentariesMoviesData,
      image: image_url,
      kebabCase: kebabCase,
    })
  })
})

app.get('/netflix/:netflixName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.netflixName)

  netflixMovies.forEach(function (netflixMovie) {
    for (let i = 0; i < netflixMovie.results.length; i++) {
      const storedNetflixTitle = _.lowerCase(netflixMovie.results[i].name)
      const backdropNetflixImage = netflixMovie.results[i].backdrop_path
      const posterNetflixImage = netflixMovie.results[i].poster_path
      const neflixOverview = netflixMovie.results[i].overview

      if (storedNetflixTitle === requestedTitle) {
        res.render('netflixMovies', {
          requestedMovie: netflixMovie.results[i].name,
          requestedMovieBackdropImage: backdropNetflixImage,
          requestedMoviePosterImage: posterNetflixImage,
          image: image_url,
          overview: neflixOverview,
        })
      }
    }
  })
})

app.get('/trending/:trendingName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.trendingName)

  trendingMovies.forEach(function (trendingMovie) {
    for (let i = 0; i < trendingMovie.results.length; i++) {
      const storedTrendingMovieTitle = _.lowerCase(
        trendingMovie.results[i].title
      )
      const storedTrendingMovieName = _.lowerCase(trendingMovie.results[i].name)

      const backdropTrendingMovieImage = trendingMovie.results[i].backdrop_path
      const posterTrendingMovieImage = trendingMovie.results[i].poster_path
      const trendingOverview = trendingMovie.results[i].overview

      if (
        storedTrendingMovieTitle + storedTrendingMovieName ===
        requestedTitle
      ) {
        res.render('trendingMovies', {
          requestedTrendingMovieName: trendingMovie.results[i].name,
          requestedTrendingMovieTitle: trendingMovie.results[i].title,
          requestedTrendingMovieBackdropImage: backdropTrendingMovieImage,
          requestedTrendingMoviePosterImage: posterTrendingMovieImage,
          image: image_url,
          trendingOverview: trendingOverview,
        })
      }
    }
  })
})

app.get('/top/:topName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.topName)

  topRatedMovies.forEach(function (topRatedMovie) {
    for (let i = 0; i < topRatedMovie.results.length; i++) {
      const storedtopRatedMovieTitle = _.lowerCase(
        topRatedMovie.results[i].title
      )
      const storedtopRatedMovieName = _.lowerCase(topRatedMovie.results[i].name)

      const backdropTopRatedMovieImage = topRatedMovie.results[i].backdrop_path
      const posterTopRatedMovieImage = topRatedMovie.results[i].poster_path
      const topRatedMovieOverview = topRatedMovie.results[i].overview

      if (
        storedtopRatedMovieTitle + storedtopRatedMovieName ===
        requestedTitle
      ) {
        res.render('topRatedMovies', {
          requestedtopRatedMovieName: topRatedMovie.results[i].name,
          requestedtopRatedMovieTitle: topRatedMovie.results[i].title,
          requestedtopRatedMovieBackdropImage: backdropTopRatedMovieImage,
          requestedtopRatedMoviePosterImage: posterTopRatedMovieImage,
          image: image_url,
          topRatedMovieOverview: topRatedMovieOverview,
        })
      }
    }
  })
})

app.get('/action/:actionName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.actionName)

  actionMovies.forEach(function (actionMovie) {
    for (let i = 0; i < actionMovie.results.length; i++) {
      const storedactionMovieTitle = _.lowerCase(actionMovie.results[i].title)
      const storedactionMovieName = _.lowerCase(actionMovie.results[i].name)

      const backdropActionMovieImage = actionMovie.results[i].backdrop_path
      const posterActionMovieImage = actionMovie.results[i].poster_path
      const actionMovieOverview = actionMovie.results[i].overview

      if (storedactionMovieTitle + storedactionMovieName === requestedTitle) {
        res.render('actionMovies', {
          requestedactionMovieName: actionMovie.results[i].name,
          requestedactionMovieTitle: actionMovie.results[i].title,
          requestedactionMovieBackdropImage: backdropActionMovieImage,
          requestedactionMoviePosterImage: posterActionMovieImage,
          image: image_url,
          actionMovieOverview: actionMovieOverview,
        })
      }
    }
  })
})

app.get('/comedy/:comedyName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.comedyName)

  comedyMovies.forEach(function (comedyMovie) {
    for (let i = 0; i < comedyMovie.results.length; i++) {
      const storedcomedyMovieTitle = _.lowerCase(comedyMovie.results[i].title)
      const storedcomedyMovieName = _.lowerCase(comedyMovie.results[i].name)

      const backdropcomedyMovieImage = comedyMovie.results[i].backdrop_path
      const postercomedyMovieImage = comedyMovie.results[i].poster_path
      const comedyMovieOverview = comedyMovie.results[i].overview

      if (storedcomedyMovieTitle + storedcomedyMovieName === requestedTitle) {
        res.render('comedyMovies', {
          requestedcomedyMovieName: comedyMovie.results[i].name,
          requestedcomedyMovieTitle: comedyMovie.results[i].title,
          requestedcomedyMovieBackdropImage: backdropcomedyMovieImage,
          requestedcomedyMoviePosterImage: postercomedyMovieImage,
          image: image_url,
          comedyMovieOverview: comedyMovieOverview,
        })
      }
    }
  })
})

app.get('/romance/:romanceName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.romanceName)

  romanceMovies.forEach(function (romanceMovie) {
    for (let i = 0; i < romanceMovie.results.length; i++) {
      const storedromanceMovieTitle = _.lowerCase(romanceMovie.results[i].title)
      const storedromanceMovieName = _.lowerCase(romanceMovie.results[i].name)

      const backdropromanceMovieImage = romanceMovie.results[i].backdrop_path
      const posterromanceMovieImage = romanceMovie.results[i].poster_path
      const romanceMovieOverview = romanceMovie.results[i].overview

      if (storedromanceMovieTitle + storedromanceMovieName === requestedTitle) {
        res.render('romanceMovies', {
          requestedromanceMovieName: romanceMovie.results[i].name,
          requestedromanceMovieTitle: romanceMovie.results[i].title,
          requestedromanceMovieBackdropImage: backdropromanceMovieImage,
          requestedromanceMoviePosterImage: posterromanceMovieImage,
          image: image_url,
          romanceMovieOverview: romanceMovieOverview,
        })
      }
    }
  })
})

app.get('/horror/:horrorName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.horrorName)

  horrorMovies.forEach(function (horrorMovie) {
    for (let i = 0; i < horrorMovie.results.length; i++) {
      const storedhorrorMovieTitle = _.lowerCase(horrorMovie.results[i].title)
      const storedhorrorMovieName = _.lowerCase(horrorMovie.results[i].name)

      const backdrophorrorMovieImage = horrorMovie.results[i].backdrop_path
      const posterhorrorMovieImage = horrorMovie.results[i].poster_path
      const horrorMovieOverview = horrorMovie.results[i].overview

      if (storedhorrorMovieTitle + storedhorrorMovieName === requestedTitle) {
        res.render('horrorMovies', {
          requestedhorrorMovieName: horrorMovie.results[i].name,
          requestedhorrorMovieTitle: horrorMovie.results[i].title,
          requestedhorrorMovieBackdropImage: backdrophorrorMovieImage,
          requestedhorrorMoviePosterImage: posterhorrorMovieImage,
          image: image_url,
          horrorMovieOverview: horrorMovieOverview,
        })
      }
    }
  })
})

app.get('/documentaries/:documentariesName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.documentariesName)

  documentariesMovies.forEach(function (documentariesMovie) {
    for (let i = 0; i < documentariesMovie.results.length; i++) {
      const storeddocumentariesMovieTitle = _.lowerCase(
        documentariesMovie.results[i].title
      )
      const storeddocumentariesMovieName = _.lowerCase(
        documentariesMovie.results[i].name
      )

      const backdropdocumentariesMovieImage =
        documentariesMovie.results[i].backdrop_path
      const posterdocumentariesMovieImage =
        documentariesMovie.results[i].poster_path
      const documentariesMovieOverview = documentariesMovie.results[i].overview

      if (
        storeddocumentariesMovieTitle + storeddocumentariesMovieName ===
        requestedTitle
      ) {
        res.render('documentariesMovies', {
          requesteddocumentariesMovieName: documentariesMovie.results[i].name,
          requesteddocumentariesMovieTitle: documentariesMovie.results[i].title,
          requesteddocumentariesMovieBackdropImage: backdropdocumentariesMovieImage,
          requesteddocumentariesMoviePosterImage: posterdocumentariesMovieImage,
          image: image_url,
          documentariesMovieOverview: documentariesMovieOverview,
        })
      }
    }
  })
})

app.use(function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT, function () {
  console.log('server is running on port ', process.env.PORT)
})
