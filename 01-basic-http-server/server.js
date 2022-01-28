const {
    stat
} = require("fs");
const http = require("http");
const todos = [{
        id: 1,
        text: "Todo One",
    },
    {
        id: 2,
        text: "Todo two",
    },
];
const server = http.createServer((req, res) => {
    const {
        method,
        url
    } = req;

    let body = [];
    req
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            let status = 404;
            const response = {
                success: false,
                data: null,
            };
            if (method == 'GET' && url == '/todos') {
                status == 200;
                response.success = true;
                response.data = todos;
            } else if (method == 'POST' && url == '/todos') {
                const {
                    id,
                    text
                } = JSON.parse(body);
                todos.push({
                    id,
                    text
                })
                status = 201;
                response.success = true;
                response.data = todos;
            }
            res.writeHead(200, {
                // Decides to type of the data
                "Content-Type": "application/json",
                // X-Powered-By : information about the server side language
                "X-Powered-By": "Node.js",
            });


            res.end(
                JSON.stringify({
                    response,
                })
            );
        });


});
const PORT = 1111;
server.listen(PORT, () => {
    console.log("works");
});