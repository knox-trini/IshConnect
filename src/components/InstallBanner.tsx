import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const STORAGE_KEY = "ishconnect_install_dismissed";

export function InstallBanner() {
  const { global: siteGlobal } = useSiteContent();
  const copy = siteGlobal.installBanner;
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    setVisible(false);
    (deferredPrompt as Event & { prompt: () => Promise<void> }).prompt();
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up border-t border-orange-100 bg-white p-4 shadow-2xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-900">
          {copy.before} <span className="font-semibold text-[#F97316]">{copy.highlight}</span>{" "}
          {copy.after}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstall}
            className="rounded-xl bg-[#F97316] px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#FB923C]"
          >
            {copy.install}
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label={copy.dismiss}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
