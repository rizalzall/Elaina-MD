let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://api.ssateam.my.id/api/gemini?message=${text}`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.data.response}`,
      contextInfo: {
      externalAdReply: {
        title: 'GOOGLE',
        body: 'E L A I N A  M U L T I D E V I C E',
        thumbnailUrl: 'https://i.pinimg.com/originals/d8/a7/8e/d8a78ed85e6232c4137ce0e4850bea98.png',
        sourceUrl: 'https://whatsapp.com/channel/0029VaF8RYn9WtC16ecZws0H',
        mediaType: 1,
        renderLargerThumbnail: false, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(gemini|bard)$/i
handler.help = ['gemini','bard']
handler.tags = ['ai']
handler.premium = false

export default handler;