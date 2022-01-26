const { get } = require("https");
const req = get("https://www.google.com", (res) => {
  res.on("data", (info) => {
    console.log(`Result : ${info}`);
    
  });
  res.on("end", () => {
      console.log("Completed");
    });
});

