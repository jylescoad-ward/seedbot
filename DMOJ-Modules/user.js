const https = require('https')

function userInfo (name, flag, message) {
  var url = 'https://dmoj.ca/api/user/info/'
  url += name

  https.get(url, (resp) => {
    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {
      const final = JSON.parse(data)
      var out = '**'

      out += final.rank
      out += '**: '
      out += name
      out += ' (*'
      out += final.points
      out += ' points*)'

      if (final.organizations.length !== 0) {
        out += '\n'
        for (var i = 0; i < final.organizations.length; i++) {
          out += '***'
          out += final.organizations[i]
          out += '***, '
        }
        out = out.slice(0, -2)
      } else {
        out += '*Not associated with any organisations*'
      }

      out += '\n'

      if (final.solved_problems.length !== 1) {
        out += '*'
        out += final.solved_problems.length
        out += ' problems solved*'
      } else {
        out += '*1 problem solved*'
      }

      out += '\nhttps://dmoj.ca/user/'
      out += name

      message.channel.send(out)
    })
  })
}

module.exports = {
  get: function (name, flag, message) {
    var url = 'https://dmoj.ca/api/user/info/'
    url += name

    https.get(url, (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        var out = '**'

        out += final.rank
        out += '**: '
        out += name
        out += ' (*'
        out += final.points
        out += ' points*)'

        if (final.organizations.length !== 0) {
          out += '\n'
          for (var i = 0; i < final.organizations.length; i++) {
            out += '***'
            out += final.organizations[i]
            out += '***, '
          }
          out = out.slice(0, -2)
        } else {
          out += '*Not associated with any organisations*'
        }

        out += '\n'

        if (final.solved_problems.length !== 1) {
          out += '*'
          out += final.solved_problems.length
          out += ' problems solved*'
        } else {
          out += '*1 problem solved*'
        }

        out += '\nhttps://dmoj.ca/user/'
        out += name

        message.channel.send(out)
      })
    })
  },
  search: function (user, flag, message) {
    https.get('https://dmoj.ca/api/user/list', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => {
        const final = JSON.parse(data)
        if (final.hasOwnProperty(user)) {
          userInfo(user, flag, message)
        } else {
          message.channel.send('No user found!')
        }
      })
    })
  }
}
