'use strict'

const https = require('https')

const ACTIVE_BRANCHES = [
  'refs/heads/master'
]

module.exports.handler = async (event, context, callback) => {

  const body = event.body
  console.log(event)

  if (!body.ref.includes(ACTIVE_BRANCHES)) {
    callback('[400] Not permitted branch')
  }

  const message = `GOOD NEWS!!! A new version of \`${body.repository.name}\` has just gone into production`
  const attachments = []

  for (let commit of body.commits) {
    attachments.push({
      "color": "#36a64f",
      "pretext": "All the commits in the new version",
      "author_name": `${commit.author.name} <${commit.author.email}>`,
      "title": commit.message
    })
  }

  const options = {
    hostname: process.env.API_SLACK_HOST,
    method: "POST",
    path: process.env.API_SLACK_PATH,
  };
  
  const payload = JSON.stringify({
    text: message,
    attachments: attachments
  })

  const req = https.request(options,
      (res) => res.on("data", () => callback(null, "OK")))
  req.on("error", (error) => callback(JSON.stringify(error)));
  req.write(payload);
  req.end();

  callback(null, {
    success: true
  })
}