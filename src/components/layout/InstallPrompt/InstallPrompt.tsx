'use client';

import { useEffect, useState } from 'react';

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMobile()) return; // показуємо лише на мобільних

    function handler(e: any) {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    }
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function onClick() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
    console.log(choiceResult);
  }

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        background: '#eee',
        padding: '1rem',
        borderRadius: 8,
      }}
    >
      <p>Встановити застосунок?</p>
      <button onClick={onClick}>Встановити</button>
      <button onClick={() => setIsVisible(false)}>Відмінити</button>
    </div>
  );
}
