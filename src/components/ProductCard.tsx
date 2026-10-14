import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import type {Product} from '@/data/products';
import {Media} from './Media';
export function ProductCard({product,index=0}:{product:Product;index?:number}){return <Link className={`product-card product-${index}`} href={`/products/${product.slug}/`}><div className="product-top"><span className="eyebrow">0{index+1} / {product.eyebrow}</span><span className="card-arrow"><ArrowUpRight size={20}/></span></div><Media id={product.image} alt={`${product.name} system illustration`} contain sizes="(max-width: 768px) 90vw, 40vw"/><div className="product-caption"><h3>{product.name}</h3><p>{product.description}</p></div></Link>;}
