# Releases Notifier #

## Releases ##
`2019-01-03`: Send one message to `slack` after `push` on branch `master` with all the `commits` and `authors`

---

## Configurations ##

### Github ####

Add in Webhooks the URL

```
https://{URL}/development/github
```

Content type
```
application/json
```

SSL verification
```
Enable SSL verification 
```

Which events would you like to trigger this webhook?
```
Send me everything.
```

{URL} - after the deploy with `serverless framework` they will return the address

### Slack ###

Use `Custom Integrations` and `Incoming WebHooks`

Add a new configuration, choose the Channel, Icon, etc and save the `Webhook URL`

### AWS Systems Manager (SSM) ###

Create a new `parameter store`

Production
```
Name: /Prod/Releases-Notifier/API_SLACK_PATH
Value: /services/ID/KEY - {The value after https://hooks.slack.com in Webhook URL of Slack Configuration}
```

Development
```
Name: /Dev/Releases-Notifier/API_SLACK_PATH
Value: /services/ID/KEY - {The value after https://hooks.slack.com in Webhook URL of Slack Configuration}
```

## Development ##

Add in your `.bash_profile` or similar
```
export AWS_ACCESS_KEY_ID={YOUR ACCESS KEY}
export AWS_SECRET_ACCESS_KEY={YOUR SECRET ACCESS KEY}
export AWS_DEFAULT_REGION={THE REGION. ex: us-east-1}
```

Install the serverless framework

```
$ sudo npm install -g serverless
```

### Postman ###

Execute the command above and you can use the address `localhost:3000`
```
$ serverless offline
```

### Methods and routes ###

POST /github

Header: application/json

Body: {You can use the file: `./mocks/master-merge.mock.json`}

## Terminal ##

```
$ serverless invoke local --function notifier --path mocks/master-merge.mock.json
```