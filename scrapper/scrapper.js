const fetch = require('node-fetch')
const cheerio = require('cheerio')

const dataUrl = `https://ytsmovietorrent.com/category/science-fiction/page/2/`
const searchURL = `https://ytsmovietorrent.com/?s=`
const magURL = `https://ytsmovietorrent.com/`

function listmovie () {
  return  fetch(`${dataUrl}`)
    .then(res => res.text())
    .then(body => {
       const movies = []
       const $ = cheerio.load(body)
       $('.link-image').each((i,element) => {
           const $element = $(element)
           const $idRawDirt = $element.find('img')
           const $idRaw = $idRawDirt.attr('src').split('/')
           const $id = $idRaw[8].split('.')
           const $link = $element.attr('href').split('/')
           const movie = {
               id: $id[0],
               link : $link[3],
           }

           movies.push(movie)
       })

        console.log(movies)
        return movies
   })
}

function search(query) {
  return  fetch(`${searchURL}${query}`)
    .then(res => res.text())
    .then(body => {
       const movies = []
       const $ = cheerio.load(body)
       $('.link-image').each((i,element) => {
           const $element = $(element)
           const $idRawDirt = $element.find('img')
           const $idRaw = $idRawDirt.attr('src').split('/')
           const $id = $idRaw[8].split('.')
           const $link = $element.attr('href').split('/')
           const movie = {
               id: $id[0],
               link : $link[3],
           }

           movies.push(movie)
       })

        console.log(movies)
        return movies
   })
}

function getmagLink(link) {
  return fetch(`${magURL}${link}`)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body)
    const maglink =  $('.btn-primary').attr('href')
    return maglink

      })
    }

module.exports = {
  // body...
  getmagLink,
  search,
  listmovie,
};
