const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  console.log(ip)
  res.sendFile(__dirname + "/index.html");
});
app.get("/amous", (req, res)=>{
  res.sendFile(__dirname + "/amous.html");
});
app.get("/script.js", (req, res)=>{
  res.sendFile(__dirname + "/script.js");
});

const date1 = new Date();
const datetime = date1.toLocaleString();

console.log(datetime);

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    io.emit("member-post", msg);
  });
  
  socket.on("disconnect" , () =>{
    
    console.log("dis");
    
    io.emit("member-post" , "ユーザーの切断がありました")
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});