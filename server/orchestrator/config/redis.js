const Redis = require("ioredis");
module.exports = new Redis({
  port: 12623,
  host: "redis-12623.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "OxEqKoarETQC41qIenLPC8GLRW3NzE7g"
})
