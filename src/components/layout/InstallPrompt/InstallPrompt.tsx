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

  useEffect(() => {
    if (!isMobile()) return;

    function handler(e: BeforeInstallPromptEvent) {
      if (sessionStorage.getItem('isPromptShown')) {
        setIsVisible(false);
        return;
      }

      e.preventDefault();
      sessionStorage.setItem('isPromptShown', 'true');
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

  async function onAccept() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  }

  function onCancel() {
    setIsVisible(false);
    setDeferredPrompt(null);
  }

  if (!isVisible) return null;

  return (
    <div className={css.layout}>
      <h3>Встановити застосунок?</h3>
      <div className={css.btnWrapper}>
        <Button onClick={onAccept}>Встановити</Button>
        <Button onClick={onCancel}>Відмінити</Button>
      </div>
    </div>
  );
}
