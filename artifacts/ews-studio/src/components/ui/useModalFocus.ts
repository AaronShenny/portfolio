import { useEffect, useRef, type RefObject } from 'react';

let returnFocus: HTMLElement | null = null;
let returnFocusId: string | null = null;

/** Modal content is portaled outside #root so the rest of the app can be inert. */
export function useModalFocus(ref: RefObject<HTMLDivElement | null>, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const active = document.activeElement;
    // A menu-to-details transition can temporarily leave focus on body while
    // the original trigger unmounts. Keep that original trigger's stable ID.
    if (active instanceof HTMLElement && active !== document.body && !active.closest('[role="dialog"]')) {
      returnFocus = active;
      returnFocusId = active.id || null;
    }
    const root = document.getElementById('root');
    const wasInert = root?.inert ?? false;
    if (root) root.inert = true;
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ) ?? []).filter(element => element.getClientRects().length > 0);
    focusables()[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close.current();
      }
      if (event.key !== 'Tab') return;
      const elements = focusables();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) { event.preventDefault(); ref.current?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !ref.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !ref.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      if (root) root.inert = wasInert;
      const target = returnFocus?.isConnected ? returnFocus : returnFocusId ? document.getElementById(returnFocusId) : null;
      target?.focus();
    };
  }, [ref]);
}
