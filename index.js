
const { Client, GatewayIntentBits } = require('discord.js');
const translate = require('translate-google');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('✅ Bot is ready with Translate function!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('/imagine')) {
    const inputText = message.content.replace('/imagine', '').trim();

    try {
      // 日本語→英語に翻訳
      const translated = await translate(inputText, { to: 'en' });

      // 翻訳結果をMidjourney用に送信！
      message.channel.send(`🎨 Generating: **${translated}**`);

    } catch (err) {
      console.error(err);
      message.channel.send('翻訳エラーが発生しました！');
    }
  }
});

client.login('あなたの新しいBotトークン');
