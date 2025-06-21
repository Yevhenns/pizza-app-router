'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/shared/Button/Button';

import css from './InstallPrompt.module.scss';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<null | BeforeInstallPromptEvent>(null);
  const [isVisible, setIsVisible] = useState(false);
  console.log(deferredPrompt);

  useEffect(() => {
    // if (!isMobile()) return;

    function handler(e: BeforeInstallPromptEvent) {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    }
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      );
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
    <div className={css.layout}>
      <h3>Встановити застосунок?</h3>
      <div className={css.btnWrapper}>
        <Button onClick={onClick}>Встановити</Button>
        <Button onClick={() => setIsVisible(false)}>Відмінити</Button>
      </div>
    </div>
  );
}
