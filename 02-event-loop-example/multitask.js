const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}
doRequest();
fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

/*
Output : 
Request 290
Hash: 736
FS: 736
Hash: 757
Hash: 769
Hash: 779
*/
/*

It's an impossible situation that 
FS module takes that much time for a single file 

So why node.js behave like that  ? 

fs module uses => Thread pool 
crypto module uses => Thread pool 
https module uses => OS itself
https is outside the thread pool

So the operations in the thread pool is 
4 times hash and one fs operation

Since the thread pool has 4 threads as a default , 
when the program begins all threads will be full.

While fs.readFile() working , it has be to be connected 
to the hard drive to take some information about the file . 
In the mean time , node.js detects that this operation
may cause too much time.
Because of that it will assign the 4th hashing operation 
to the fs's thread while fs operation is waiting for 
hard drive. 
Then fs will be reassigned a new thread
when a new thread is available. 

Hence , the fs operation will be completed after 
one hash operation despite it has started first .


*/
