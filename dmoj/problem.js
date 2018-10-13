const https = require('https')

var lang = ''
var type = ''

function problemInfo (name, flag, message) {
  var url = 'https://dmoj.ca/api/problem/info/'
  url += name

  https.get(url, (resp) => {
    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {
      const final = JSON.parse(data)
      var out = ''
      out += final['name']
      if (final['points'] === 1) {
        out += ' (*1 point*):\n'
      } else {
        out += ' (*'
        out += final['points']
        out += ' points*):\n'
      }

      out += '***'
      out += final.group
      out += '***\n'

      if (final['time_limit'] === 1) {
        out += 'Time limit - **1** second\n'
      } else {
        out += 'Time limit - **'
        out += final['time_limit']
        out += '** seconds\n'
      }

      out += 'Memory limit - **'
      out += final['memory_limit']
      out += '**'

      out += '\nTypes: **'
      for (type in final.types) {
        out += final.types[type]
        out += ', '
      }
      out = out.slice(0, -2)
      out += '**'
      if (flag === true) {
        out += '\nSupported languages:\n`'
        for (lang of final['languages']) {
          out += lang
          out += ', '
        }
        out = out.slice(0, -2)
        out += '`'
      }

      out += '\nhttps://dmoj.ca/problem/'
      out += name

      message.channel.send(out)
    })
  }).on('error', (err) => {
    return err.message
  })
}

module.exports = {
  get: function (name, flag, message) {
    var url = 'https://dmoj.ca/api/problem/info/'
    url += name

    https.get(url, (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        var out = ''
        out += final['name']
        if (final['points'] === 1) {
          out += ' (*1 point*):\n'
        } else {
          out += ' (*'
          out += final['points']
          out += ' points*):\n'
        }

        out += '***'
        out += final.group
        out += '***\n'

        if (final['time_limit'] === 1) {
          out += 'Time limit - **1** second\n'
        } else {
          out += 'Time limit - **'
          out += final['time_limit']
          out += '** seconds\n'
        }

        out += 'Memory limit - **'
        out += final['memory_limit']
        out += '**'

        out += '\nTypes: **'
        for (type in final.types) {
          out += final.types[type]
          out += ', '
        }

        out = out.slice(0, -2)
        out += '**'
        if (flag === true) {
          out += '\nSupported languages:\n`'
          for (lang of final['languages']) {
            out += lang
            out += ', '
          }
          out = out.slice(0, -2)
          out += '`'
        }

        out += '\nhttps://dmoj.ca/problem/'
        out += name

        message.channel.send(out)
      })
    }).on('error', (err) => {
      return err.message
    })
  },
  search: function (problem, flag, message) {
    https.get('https://dmoj.ca/api/problem/list', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        if (final.hasOwnProperty(problem)) {
          problemInfo(problem, flag, message)
        } else {
          message.channel.send('No problem found!')
        }
      })
    })
  }

}
