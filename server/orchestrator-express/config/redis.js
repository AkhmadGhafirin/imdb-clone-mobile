const Redis = require("ioredis");

const redis = new Redis({
    port: 12623, // Redis port
    host: "redis-12623.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
    // username: "default", // needs Redis >= 6
    password: "OxEqKoarETQC41qIenLPC8GLRW3NzE7g",
    // db: 0, // Defaults to 0
});

redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// ioredis supports the node.js callback style
redis.get("mykey", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Prints "value"
  }
})
