const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const weather = require('weather-js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const convertEmoji = (who) => {
    if(who === "가위"){
      return "🤘";
    }
    else if(who === "바위"){
      return "👊";
    }
    else if(who === "보"){
      return "✋";
    }
  }


client.on('message', msg => {
  if (msg.content === '!!!안녕') {
    msg.reply('안녕!');
  }

  if(msg.content === "가위" || msg.content === "바위" || msg.content === "보") {
    const human = msg.content;
    const list = ["가위", "바위", "보"];
    const random = Math.floor(Math.random() * 3);
    const bot = list[random];
    let winner = "";

    if(human === bot) {
      winner = "비김";
    }
    else {
      human === "가위" ? (winner = bot === "바위" ? "봇" : "인간") : "";
      human === "바위" ? (winner = bot === "보" ? "봇" : "인간") : "";
      human === "보" ? (winner = bot === "가위" ? "봇" : "인간") : "";
    }

    const result =
`
사람 : ${convertEmoji(human)} vs 철이봇 : ${convertEmoji(bot)}
${winner === "비김" ? "비겼네요..." : winner + "의 승리네요!"}
`
    msg.reply(result);
  }

});

client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.author.id === client.user.id) return;
  
    const id = msg.author.id;
    const name = msg.author.username;
  
    const filePath = `./data/${id}.json`;
  
    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성
  
    const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const today = new Date();
    const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
    const howMuch = 1;
  
    if(msg.content === "!!!출석"){
      let saveUser = {};
      if(user.id) {
        if(user.date === date) {
          msg.reply(`오늘은 이미 출석했어`);
          saveUser = user;
        }
        else {
          msg.reply(`${howMuch}번 더 출석했어!\n${name}의 현재 출석횟수는 ${user.money} -> ${user.money + howMuch}이야!`);
          saveUser = {
            id,
            name,
            date,
            money : user.money + howMuch,
          }
        }
      }
      else {
        msg.reply(`${name}!! 출석하는걸 환영해! ${howMuch}번 출석을 지급헀어!`);
        saveUser = {id, name, date, money : howMuch};
      }
  
      fs.writeFileSync(filePath, JSON.stringify(saveUser));
    }
  
    if(msg.content === "!!!출석 몇번"){
      user.id ? msg.reply(`${name}의 현재 출석횟수은 ${user.money}이야!`) : msg.reply(`출석부에 등록되지 않은 유저야! 출석를 입력해봐!`);
    }
  
  
  });



client.login('ODM4NDAxMDk4MjA5MTY1MzEz.YI6j3g.sjtdeiStpU5w2bKbuc1XzPeoSpI');