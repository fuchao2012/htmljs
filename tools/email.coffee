mail = require './../lib/mail.js'
mustache = require 'mu2'
config = require './../config.coffee'

buffer = ""

mustache.compileAndRender('./../static/htmljs-weekly-1.html', {})
.on 'data',(c)->
   buffer += c.toString()
.on 'end',()->
  mail({
    subject:"乱炖周刊第一期,每周会为您推送本站精选的新鲜速递",
    # to:"xinyu198736@gmail.com",
    to:"weekly@htmljs.sendcloud.org",
    use_maillist:"true",
    api_user:config.mail.api_user_list,
    api_key: config.mail.api_key_list,
    html:buffer
  })

