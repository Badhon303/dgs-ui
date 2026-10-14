'use client';
import {motion,useReducedMotion,MotionConfig} from 'motion/react';
import {usePathname} from 'next/navigation';
import {useRef,type ReactNode} from 'react';
export function Reveal({children,className=''}:{children:ReactNode;className?:string}) {
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:reduced?0:0.7}} onViewportEnter={e=>{if(!reduced && e?.target) (e.target as HTMLElement).animate([{transform:'translateY(35px)',opacity:.25},{transform:'translateY(0)',opacity:1}],{duration:750,easing:'cubic-bezier(.2,.7,.2,1)'});}}>{children}</motion.div>;
}
export function RouteTransition({children}:{children:ReactNode}) {
  const path=usePathname();
  return <MotionConfig reducedMotion="user"><motion.div key={path} initial={{opacity:.85}} animate={{opacity:1}} transition={{duration:.25}}>{children}</motion.div></MotionConfig>;
}
export function Magnetic({children,className=''}:{children:ReactNode;className?:string}) {
  const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedMotion();
  return <span ref={ref} className={`magnetic ${className}`} onPointerMove={e=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;const box=e.currentTarget.getBoundingClientRect();if(ref.current)ref.current.style.transform=`translate(${(e.clientX-box.left-box.width/2)*.09}px,${(e.clientY-box.top-box.height/2)*.12}px)`;}} onPointerLeave={()=>{if(ref.current)ref.current.style.transform='translate(0,0)';}}>{children}</span>;
}
