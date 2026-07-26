const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");

const specialMessage = document.getElementById("special-message");

let language = "ja";
let lastEvent = "";

document.getElementById("lang-ja").onclick=()=>{
    setLanguage("ja");
};

document.getElementById("lang-en").onclick=()=>{
    setLanguage("en");
};

document.documentElement.lang=language;
//message---------------------------------
const events = {
  "00:00": {
    ja: "新しい一日が始まる。",
    en: "A new beginning."
  },

  "04:44": {
    ja: "まだ夜は終わらない。",
    en: "The night is still here."
  },

  "05:00": {
    ja: "夜明け前の静寂",
    en: "The Silence Before Dawn."
  },

  "12:00": {
    ja: "今日はまだ半分。",
    en: "Halfway through today."
  },

  "18:00": {
    ja: "夕暮れは、いつも少しだけ優しい。",
    en: "Twilight is always gentle."
  },

  "23:59": {
    ja: "今日という時間は、もう戻らない。",
    en: "This day will never return."
  }
};

const texts = {

    ja:{
        title:"The Stages of Life",

        message:[
            "時間は、誰も待ってはくれない。過ぎ去った一秒は、もう戻らない。",
            "この小さな時計が、誰かの「今」を大切にするきっかけになれば幸いです。"
        ]
    },

    en:{
        title:"The Stages of Life",

        message:[
            "Time never waits for anyone. Every second that passes is gone forever.",
            "If this small clock inspires even one person to cherish the present, then it has fulfilled its purpose."
        ]
    }

};

function resize(){
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.55;
    canvas.width = size;
    canvas.height = size;
}
window.addEventListener("resize", resize);
resize();
function drawClock(){
    const w = canvas.width;
    const r = w / 2;
    ctx.clearRect(0,0,w,w);
    ctx.save();
    ctx.translate(r,r);
    // 外枠-----------------------------------
    ctx.beginPath();
    ctx.arc(0,0,r-5,0,Math.PI*2);
    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=4;
    ctx.stroke();
    // 目盛------------------------------------
    for(let i=0;i<60;i++){
        ctx.save();
        ctx.rotate(i*Math.PI/30);
        ctx.beginPath();
        ctx.moveTo(0,-r+15);
        ctx.lineTo(0,-r+(i%5===0?35:22));
        ctx.strokeStyle="#fff";
        ctx.lineWidth=i%5===0?3:1;
        ctx.stroke();
        ctx.restore();
    }

    const now=new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes() + sec / 60;
    const hour = (now.getHours() % 12) + min / 60;

    const hh = String(now.getHours()).padStart(2,"0");
    const mm = String(now.getMinutes()).padStart(2,"0");
    const current = `${hh}:${mm}`;

    if(events[current]){
        if(lastEvent !== current){
            specialMessage.textContent = events[current][language];
            specialMessage.style.opacity = 1;

            setTimeout(()=>{
            specialMessage.style.opacity = 0;
            },8000);

            lastEvent = current;
        }
    }else{
        lastEvent = "";
    }

    // 時針------------------------------------
    ctx.save();
    ctx.rotate(hour*Math.PI/6);
    ctx.beginPath();
    ctx.moveTo(0,10);
    ctx.lineTo(0,-r*0.45);
    ctx.lineWidth=7;
    ctx.stroke();
    ctx.restore();
    // 分針------------------------------------
    ctx.save();
    ctx.rotate(min*Math.PI/30);
    ctx.beginPath();
    ctx.moveTo(0,15);
    ctx.lineTo(0,-r*0.68);
    ctx.lineWidth=5;
    ctx.stroke();
    ctx.restore();
    // 秒針------------------------------------
    ctx.save();
    ctx.rotate(sec*Math.PI/30);
    ctx.beginPath();
    ctx.moveTo(0,25);
    ctx.lineTo(0,-r*0.78);
    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.restore();
    // 中心-------------------------------------
    ctx.beginPath();
    ctx.arc(0,0,6,0,Math.PI*2);
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.restore();
    requestAnimationFrame(drawClock);
}

function setLanguage(lang){

    language = lang;

    localStorage.setItem("language",lang);

    document.getElementById("title").textContent =
        texts[lang].title;

    document.getElementById("line1").textContent =
        texts[lang].message[0];

    document.getElementById("line2").textContent =
        texts[lang].message[1];

}

setLanguage(localStorage.getItem("language") || "ja");

drawClock();