'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {X} from 'lucide-react';
export function Dialog({open,onClose,label,children,className=''}:{open:boolean;onClose:()=>void;label:string;children:ReactNode;className?:string}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const dialog=ref.current;if(!dialog)return;const focus=document.activeElement as HTMLElement; const previous=document.body.style.overflow;
    if(open){dialog.showModal();document.body.style.overflow='hidden';}else if(dialog.open)dialog.close();
    return ()=>{if(dialog.open)dialog.close();document.body.style.overflow=previous;if(open)focus?.focus();};
  },[open]);
  return <dialog ref={ref} className={`dialog ${className}`} aria-label={label} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="dialog-inner"><button className="icon-button close" onClick={onClose} aria-label={`Close ${label}`}><X size={22}/></button>{children}</div></dialog>;
}
