function htmlspecialchars(unsafeText){
  if(typeof unsafeText !== 'string'){
    return unsafeText;
  }
  return unsafeText.replace(
    /[&'`"<>]/g, 
    function(match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    }
  );
}
  
  const socket = io();//来ました
  const date1 = new Date();
const datetime = date1.toLocaleString();

console.log(datetime);
  
  socket.emit("post", {text:datetime+"-"+"ユーザーの接続がありました。"});

  document.querySelector("#frm-post").addEventListener("submit", (e)=>{
    e.preventDefault();
    const msg = document.querySelector("#msg");
    const name = document.querySelector("#name");
      const date1 = new Date();
const datetime = date1.toLocaleString();
    if( msg.value === "" ){
      return(false);
    }
        if( name.value === "" ){
      return(false);
    }
    socket.emit("post", {text:datetime+"  -  "+name.value+"  :  "+msg.value});
    msg.value = "";
  });

  const music_on = new Audio('https://cdn.glitch.global/0c35bbf2-29f4-43cf-8da1-7eff1fbec4ae/%E3%83%9D%E3%83%83%E3%83%97.mp3?v=1656230627758');
  
  socket.on("member-post", (msg)=>{
    music_on.play();
    const list = document.querySelector("#msglist");
    const li = document.createElement("li");
    let safeText = htmlspecialchars(msg.text);
    li.innerHTML = `${safeText}`;
    list.insertBefore(li, list.firstChild);
  });

  window.onload = ()=>{
    document.querySelector("#msg").focus();
  }
