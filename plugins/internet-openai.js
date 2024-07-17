import axios from 'axios';

async function askGpt4(prompt) {
  // token id
  const session_hash = Math.random().toString(36).substring(2).slice(1);
  const unique_id = Math.random().toString(36).substring(2).slice(1);
  
  const res = await axios({
    method: "POST",
    url: "https://finechatserver.erweima.ai/api/v1/gpt2/free-gpt2/chat",
    data: {
      prompt,
      sessionId: session_hash
    },
    headers: {
      "Uniqueid": unique_id,
      "User-Agent": "okhttp/4.9.0",
      "Referer": "https://www.yeschat.ai/",
      "Origin": "https://www.yeschat.ai",
      "Content-Type": "application/json"
    }
  });

  const messages = res.data.match(/"message":"(.*?)"/g) || []; 
  const response = messages.map(message => message.replace(/"message":"(.*?)"/, '$1')).join('');
  return response;
}

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw "Input Teks";
  }
  
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
  
  try {
    const response = await askGpt4(text);
    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
    await conn.reply(m.chat, response, m);
  } catch (e) {
    await conn.reply(m.chat, 'Maaf, terjadi kesalahan saat memproses permintaan Anda.', m);
    console.error(e);
  }
}

handler.help = ['ai','openai','gpt'];
handler.tags = ["ai"];
handler.command = /^(openai|ai|gpt)$/i

export default handler;