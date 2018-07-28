module.exports = {
    info: function problemInfo(name, flag, message) {
    const https = require('https');
    var url = 'https://dmoj.ca/api/problem/info/';
    url += name;

    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const final = JSON.parse(data);
        console.log(final);
        var out = ""
        out += final["name"];
        if (final["points"] === 1) {
          out += " (1 point):\n";
        } else {
          out += " (";
          out += final["points"];
          out += "):\n";
        }
        if (final["time_limit"] === 1) {
          out += "Time limit - 1 second\n";
        } else {
          out += "Time limit - ";
          out += final["time_limit"];
          out += " seconds\n";
        }
        out += "Memory limit - ";
        out += final["memory_limit"];

        if (flag === true) {
          out += "\nSupported languages:\n"
          for (lang of final["languages"]) {
            out += lang;
            out += "\n";
          }
        }

        out += "\n https://dmoj.ca/problem/";
        out += name;

        message.channel.send(out);
      });

    }).on("error", (err) => {
      return err.message;
    });
  }
}
