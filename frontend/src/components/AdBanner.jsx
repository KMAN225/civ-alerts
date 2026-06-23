import { useEffect, useRef } from 'react';

export default function AdBanner({ slot, format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !slot) return;

    try {
      const win = window;
      (win.adsbygoogle = win.adsbygoogle || []).push({});
      loaded.current = true;
    } catch {
      // AdSense peut échouer silencieusement
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto flex justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4484826917625401"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
