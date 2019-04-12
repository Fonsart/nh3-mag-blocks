const API_TOKEN = require('../../.nh3-api-token.json');
const API_URL = 'http://localhost:666'
const TRUE_API_URL = 'https://dev2.notrehistoire.ch/api/v1'

function getEntry(hash) {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${API_TOKEN}`);
  myHeaders.append("Origin", "");

  const URL = `${API_URL}/entries?filter[hash_id]=${hash}&include=media`;

  console.log(URL)

  return fetch(URL,
    {
      headers: myHeaders
    })
    .then(result => result.json())
}

module.exports = {
  getEntry
}
