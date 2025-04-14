let os = require("os");
// console.log(os);

console.log(os.hostname());
console.log(os.totalmem() / (1024 * 1024 * 1024)); // total memory of RAM in bytes
console.log(os.freemem() / (1024 * 1024 * 1024));
console.log(os.cpus().length); // number of threads present
// console.log(os.constants);
console.log(os.platform());

console.log(os.uptime() / (60 * 60));

console.log(os.userInfo());
