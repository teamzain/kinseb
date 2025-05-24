'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#0A1017',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}>
      <Head>
        <title>Stacked Design Text Effect</title>
        <meta name="description" content="Stacked design text effect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        position: 'relative',
        textAlign: 'center',
      }}>
        {mounted && Array(5).fill('DESIGN').map((text, index) => (
          <h1 key={index} style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '7rem',
            fontWeight: 'bold',
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: `${index * 12}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#0EB0C5',
            opacity: index === 0 ? 1 : (1 - index * 0.2),
            letterSpacing: '0.05em',
            textShadow: index === 0 ? '0 0 10px rgba(14, 176, 197, 0.3)' : 'none',
            userSelect: 'none',
          }}>
            {text}
          </h1>
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}