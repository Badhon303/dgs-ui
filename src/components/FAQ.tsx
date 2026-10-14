import {Plus} from 'lucide-react';
import {faqs} from '@/data/site';
export function FAQ(){return <section className="faq section-pad"><div><p className="eyebrow">A little clarity</p><h2>Good questions.<br/><em>Clear answers.</em></h2><p>A few things to know before<br/>we start a conversation.</p></div><div>{faqs.map((faq,i)=><details key={faq.question}><summary><span className="faq-number">0{i+1}</span>{faq.question}<Plus size={19}/></summary><p>{faq.answer}</p></details>)}</div></section>;}
