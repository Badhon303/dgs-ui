'use client';
import {useState,useEffect,useRef} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {Dialog} from './Dialog';
import {Media} from './Media';
export type LightboxImage={id:string;caption:string};
export default function Lightbox({images,initialIndex,onClose}:{images:LightboxImage[];initialIndex:number;onClose:()=>void}){
  const [index,setIndex]=useState(initialIndex);const touch=useRef<number|null>(null);
  const change=(direction:number)=>setIndex(i=>(i+direction+images.length)%images.length);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'){e.preventDefault();setIndex(i=>(i+1)%images.length);}if(e.key==='ArrowLeft'){e.preventDefault();setIndex(i=>(i-1+images.length)%images.length);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[images.length]);
  return <Dialog open onClose={onClose} label="Photo viewer" className="lightbox"><div className="lightbox-visual" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const distance=e.changedTouches[0].clientX-touch.current;if(Math.abs(distance)>50)change(distance<0?1:-1);touch.current=null;}}}><Media key={images[index].id} id={images[index].id} alt={images[index].caption} sizes="100vw" priority contain/></div><div className="lightbox-bar"><p aria-live="polite">{images[index].caption}<span>{index+1} / {images.length}</span></p><div><button className="icon-button" aria-label="Previous photograph" onClick={()=>change(-1)} disabled={images.length<2}><ChevronLeft/></button><button className="icon-button" aria-label="Next photograph" onClick={()=>change(1)} disabled={images.length<2}><ChevronRight/></button></div></div></Dialog>;
}
