import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function Toast() {
  const { toast } = useAppState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3400);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;
  const Icon = Icons[toast.icon] || Icons.Bell;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 bg-navy-900 text-white px-5 py-3.5 rounded-lg shadow-lg max-w-sm">
        <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Icon size={16} strokeWidth={2.25} />
        </span>
        <p className="text-sm leading-snug">{toast.msg}</p>
      </div>
    </div>
  );
}
