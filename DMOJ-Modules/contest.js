const https = require('https')
var i = 0

function contestInfo (name, flag, message) {
  var url = 'https://dmoj.ca/api/contest/info/'
  url += name

  https.get(url, (resp) => {
    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {
      const final = JSON.parse(data)
      var out = ''

      out += name
      out += ' (**'
      out += final.time_limit / 3600
      out += '** hours)\n'

      out += 'Tags - '
      for (i = 0; i <= final.tags.length; i++) {
        out += final.tags[i]
        out += ', '
      }
      out = out.slice(0, -2)

      out += 'Problems:\n'
      for (i = 0; i < final.problems.length; i++) {
        out += '`'
        out += final.problems[i]['name']
        out += '` (**'
        out += final.problems[i]['points']
        out += '** points)\n'
      }
      out += 'https://dmoj.ca/contest/'
      out += name
      message.channel.send(out)
    })
  })
}

module.exports = {
  get: function (name, flag, message) {
    var url = 'https://dmoj.ca/api/contest/info/'
    url += name

    https.get(url, (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        var out = ''

        out += name
        out += ' (**'
        out += final.time_limit / 3600
        out += '** hours)\n'

        out += 'Tags - '
        for (i = 0; i <= final.tags.length; i++) {
          out += final.tags[i]
          out += ', '
        }
        out = out.slice(0, -2)

        out += 'Problems:\n'
        for (i = 0; i < final.problems.length; i++) {
          out += '`'
          out += final.problems[i]['name']
          out += '` (**'
          out += final.problems[i]['points']
          out += '** points)\n'
        }
        out += 'https://dmoj.ca/contest/'
        out += name
        message.channel.send(out)
      })
    })
  },
  search: function (contest, flag, message) {
    https.get('https://dmoj.ca/api/contest/list', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        if (final.hasOwnProperty(contest)) {
          contestInfo(contest, flag, message)
        } else {
          message.channel.send('No contest found!')
        }
      })
    })
  }
}
