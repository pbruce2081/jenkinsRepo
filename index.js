const http = require('http');

const server = http.createServer((req, res) => {
    res.write("Welcome to NODE App");
    res.end();
});

// server.listen(process.env.PORT);
server.listen(3000);

/*

Envrionment + Resources
------------------------

OS (Linux)
NodeJs (Software/CLI)
Port (3000)
index.js
package.json

Command Terminal
-----------------------
node index.js

*/