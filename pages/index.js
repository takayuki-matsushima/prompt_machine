import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input })
      });
      const data = await res.json();
      setOutput(data.translatedText);
    } catch (error) {
      setOutput('エラーが発生しました');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Helvetica Neue, sans-serif',
      padding: '1rem'
    }}>

      {/* ロゴ */}
      <div style={{ marginTop: '20px' }}>
        <img src="/logo/gj_logo_white.png" alt="GENERATIVE JUNKIE" style={{ width: '150px' }} />
      </div>

      {/* 中央エリア */}
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <textarea
          rows="4"
          placeholder="日本語で入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '1rem', fontSize: '1rem', backgroundColor: '#000', color: '#fff', border: '1px solid #fff', marginBottom: '1rem' }}
        />
        <br />
        <button
          onClick={handleTranslate}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#000', color: '#fff', border: '1px solid #fff', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? '翻訳中...' : '翻訳する'}
        </button>

        {output && (
          <div style={{ marginTop: '2rem', background: '#111', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '18px' }}>翻訳結果</h2>
            <p>{output}</p>
          </div>
        )}
      </div>

      {/* フッター */}
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '10px' }}>
        © GENERATIVE JUNKIE
      </div>
    </div>
  );
}