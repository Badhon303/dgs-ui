'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {motion,useReducedMotion} from 'motion/react';
import {ArrowUpRight,Expand,Plus} from 'lucide-react';
import {projects,categories,type Project} from '@/data/projects';
import {Media} from './Media';
const Lightbox=dynamic(()=>import('./Lightbox'));
export function Gallery({featured=false}:{featured?:boolean}){
  const [category,setCategory]=useState('All work'),[limit,setLimit]=useState(featured?6:9),[photo,setPhoto]=useState<number|null>(null);const reduced=useReducedMotion();
  const collection=featured?projects.filter(p=>p.featured):projects;
  const filtered=collection.filter(p=>category==='All work'||p.category===category);
  const visible=filtered.slice(0,limit);
  return <><div className="gallery-filters" aria-label="Filter photographs">{categories.map(c=><button className={category===c?'selected':''} key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setLimit(featured?6:9);}}>{c}{category===c&&<span className="filter-dot"/>}</button>)}<span className="gallery-count" aria-live="polite">{filtered.length.toString().padStart(2,'0')} views</span></div><motion.div layout={!reduced} className="project-grid">{visible.map((p,i)=><motion.article layout={!reduced} initial={false} animate={{opacity:1}} transition={{duration:reduced?0:.35}} key={p.slug} className={`project-card project-position-${i%6}`}><Link href={`/projects/${p.slug}/`} className="project-image-link"><Media id={p.image} alt={p.alt} sizes="(max-width: 600px) 92vw, (max-width: 1024px) 45vw, 33vw"/><span className="image-chip">{p.category}</span><span className="project-open"><ArrowUpRight/></span></Link><button className="project-zoom icon-button" aria-label={`Enlarge ${p.title}`} onClick={()=>setPhoto(i)}><Expand size={18}/></button><Link className="project-caption" href={`/projects/${p.slug}/`}><h3>{p.title}</h3><span>{p.subtitle}</span></Link></motion.article>)}</motion.div><div className="gallery-bottom"><p aria-live="polite">Showing {visible.length} of {filtered.length} photographs</p>{limit<filtered.length&&<button className="button button-outline" onClick={()=>setLimit(l=>l+9)}>Load more projects<Plus size={18}/></button>}{featured&&<Link href="/projects/" className="text-link">View the complete portfolio<ArrowUpRight size={18}/></Link>}</div>{photo!==null&&<Lightbox images={visible.map(p=>({id:p.image,caption:p.alt}))} initialIndex={photo} onClose={()=>setPhoto(null)}/>}</>;
}
export function StoryGallery({project}:{project:Project}){
  const [photo,setPhoto]=useState<number|null>(null);
  return <><button className="story-photo" onClick={()=>setPhoto(0)} aria-label={`Open photograph of ${project.title}`}><Media id={project.image} alt={project.alt} sizes="100vw" priority/><span className="button button-light">View full photograph<Expand size={18}/></span></button>{photo!==null&&<Lightbox images={[{id:project.image,caption:project.alt}]} initialIndex={photo} onClose={()=>setPhoto(null)}/>}</>;
}
