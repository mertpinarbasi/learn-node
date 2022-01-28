const http = require('http');
const todos = [{
        id: 1,
        text: 'Todo One'
    },
    {
        id: 2,
        text: 'Todo two'
    }
]
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'Node.js');

    res.end(JSON.stringify({
        success: true,
        data: todos
    }));
});
const PORT = 32000;
server.listen(PORT, () => {
    console.log("works")
})