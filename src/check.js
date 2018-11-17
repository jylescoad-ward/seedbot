const config = require('./config.json');
function clientToken(herokutoken, configtoken, token){
  if (config.token === "token-here") {
    token = herokutoken
  }
  if (config.token !== "token-here") {
    token = configtoken
  }
}
function ytToken(hyttoken, cyttoken, yttoken) {
  if (config.ytapi === "youtube-api-token") {
    yttoken = hyttoken
  }
  else if (config.ytapi !== "youtube-api-token") {
    yttoken = cyttoken
  }
}
