const http = require("http");
const figlet = require("figlet");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  figlet("Hello World!!", (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }

    res.end(`Figlet Message:\n${data}`);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
