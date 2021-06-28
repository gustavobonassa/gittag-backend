const axios = require("axios");

async function getStarredRepositories(username, etag) {
  try {
    const starred = await axios.get(`https://api.github.com/users/${username}/starred`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'If-None-Match': `${etag}`
      }
    })
    return starred
  } catch (error) {
    return "error"
  }
}

async function checkUserExistGithub(username) {
  try {
    const user = await axios.get(`https://api.github.com/users/${username}`)
    return user.data
  } catch (error) {
    return "error"
  }
}

module.exports = { getStarredRepositories, checkUserExistGithub }
