require('dotenv').config()
const {
  compose,
  pick,
  path,
  map,
  find,
  propEq,
  prop,
  set,
  lensProp,
  propOr
} = require('ramda')
const cors = require('micro-cors')()
const jwtAuth = require('micro-jwt-auth')
const query = require('micro-query')
const fetch = require('isomorphic-fetch')
const token = new Buffer(
  `${process.env.CLIENT}:${process.env.SECRET}`
).toString('base64')
let accessToken = null

module.exports = cors(
  jwtAuth(process.env.JWT)(async (req, res) => {
    if (!accessToken) {
      accessToken = await getToken()
      setTimeout(_ => (accessToken = null), 3500 * 1000)
    }
    const results = await search(propOr('duran duran', 'q', query(req)))
    return results
  })
)

// search
function search(query) {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=album`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(
      compose(
        map(pick(['id', 'href', 'name', 'poster'])),
        map(album => {
          //console.log(prop('images', album))
          const poster = find(propEq('width', 300), prop('images', album))

          return set(lensProp('poster'), poster ? poster.url : '', album)
        }),
        path(['albums', 'items'])
      )
    )
}

// get token
function getToken() {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(res => res.json())
    .then(res => res.access_token)
    .catch(err => console.log(err))
}
