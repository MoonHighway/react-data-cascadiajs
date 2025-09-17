"use client";

import type { Ref } from "react";
import { useEffect } from "react";

export function LiftButton({
  ref: buttonRef,
  onClick,
}: {
  ref?: Ref<HTMLButtonElement>;
  onClick?: () => void;
}) {
  useEffect(() => {
    (buttonRef as React.RefObject<HTMLButtonElement>)?.current?.focus?.();
  }, [buttonRef]);

  return (
    <button ref={buttonRef} onClick={onClick} className="px-3 py-1 border rounded">
      Load Chair 🚡
    </button>
  );
}
