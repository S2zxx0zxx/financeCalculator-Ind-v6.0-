import { useEffect, useRef, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaManager() {
  const [online, setOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const refreshForUpdate = useRef(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    let controllerListener: (() => void) | undefined;
    if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_PWA === "true" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(registration => {
        if (registration.waiting) setWaitingWorker(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) setWaitingWorker(worker);
          });
        });
      }).catch(() => undefined);

      controllerListener = () => {
        if (refreshForUpdate.current) window.location.reload();
      };
      navigator.serviceWorker.addEventListener("controllerchange", controllerListener);
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (controllerListener) navigator.serviceWorker?.removeEventListener("controllerchange", controllerListener);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  function update() {
    if (!waitingWorker) return;
    refreshForUpdate.current = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }

  if (online && !installPrompt && !waitingWorker) return null;

  return (
    <div className="pwa-status-stack" aria-live="polite">
      {!online ? (
        <div className="pwa-notice offline">
          <div><strong>You’re offline</strong><span>Cached FinCalc routes remain available where possible.</span></div>
        </div>
      ) : null}
      {waitingWorker ? (
        <div className="pwa-notice">
          <div><strong>FinCalc update ready</strong><span>Reload once to use the newest app version.</span></div>
          <button type="button" onClick={update}>Update</button>
        </div>
      ) : null}
      {installPrompt ? (
        <div className="pwa-notice">
          <div><strong>Install FinCalc</strong><span>Open faster from your home screen.</span></div>
          <button type="button" onClick={install}>Install</button>
        </div>
      ) : null}
    </div>
  );
}
