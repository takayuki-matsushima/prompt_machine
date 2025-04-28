import translate from 'translate-google';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { text } = req.body;

  try {
    const translatedText = await translate(text, { to: 'en' });
    res.status(200).json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: '翻訳失敗' });
  }
}