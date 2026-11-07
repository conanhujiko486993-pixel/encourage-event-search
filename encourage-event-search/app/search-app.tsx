'use client'
import {useMemo,useState} from 'react'
type EventItem={id:string;status:string;title:string;genre:string;needs:string;start:string;startLabel:string;endLabel:string;url:string}
const dateKey=(s:string)=>s?s.slice(0,10):''
export default function SearchApp({initialEvents}:{initialEvents:EventItem[]}){
 const [q,setQ]=useState(''); const [genre,setGenre]=useState(''); const [needs,setNeeds]=useState(''); const [from,setFrom]=useState(''); const [to,setTo]=useState(''); const [onlyOpen,setOnlyOpen]=useState(true)
 const genres=useMemo(()=>Array.from(new Set(initialEvents.flatMap(e=>e.genre.split(',').map(x=>x.trim())).filter(Boolean))).sort(),[initialEvents])
 const needOptions=useMemo(()=>Array.from(new Set(initialEvents.flatMap(e=>e.needs.split(',').map(x=>x.trim())).filter(Boolean))).sort(),[initialEvents])
 const filtered=useMemo(()=>initialEvents.filter(e=>{
   const needle=q.trim().toLowerCase(); const d=dateKey(e.start)
   return (!onlyOpen||e.status.includes('受付中'))&&(!needle||e.title.toLowerCase().includes(needle))&&(!genre||e.genre.includes(genre))&&(!needs||e.needs.includes(needs))&&(!from||!!d&&d>=from)&&(!to||!!d&&d<=to)
 }).sort((a,b)=>(a.start||'9999').localeCompare(b.start||'9999')),[initialEvents,q,genre,needs,from,to,onlyOpen])
 const clear=()=>{setQ('');setGenre('');setNeeds('');setFrom('');setTo('');setOnlyOpen(true)}
 return <main>
  <header><div className="wrap"><p className="eyebrow">EN-COURAGE EVENT FINDER</p><h1>イベントを、必要なときに。</h1><p className="lead">日時・イベント名・ジャンル・ニーズから絞り込み、申込ページへ直接移動できます。</p></div></header>
  <div className="wrap body">
   <section className="filters" aria-label="検索条件">
    <label className="wide">イベント名<input value={q} onChange={e=>setQ(e.target.value)} placeholder="例：面接対策、コンサル、自己分析" /></label>
    <label>開始日<input type="date" value={from} onChange={e=>setFrom(e.target.value)} /></label>
    <label>終了日<input type="date" value={to} onChange={e=>setTo(e.target.value)} /></label>
    <label>ジャンル<select value={genre} onChange={e=>setGenre(e.target.value)}><option value="">すべて</option>{genres.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>ニーズ<select value={needs} onChange={e=>setNeeds(e.target.value)}><option value="">すべて</option>{needOptions.map(x=><option key={x}>{x}</option>)}</select></label>
    <label className="check"><input type="checkbox" checked={onlyOpen} onChange={e=>setOnlyOpen(e.target.checked)} />受付中のみ</label>
    <button className="clear" onClick={clear}>条件をクリア</button>
   </section>
   <div className="summary"><strong>{filtered.length.toLocaleString()}</strong> 件のイベント</div>
   <section className="cards">{filtered.slice(0,300).map(e=><article key={e.id}>
    <div className="meta"><span className="status">{e.status||'イベント'}</span><time>{e.startLabel||'日時未登録'} {e.endLabel}</time></div>
    <h2>{e.title}</h2>
    <div className="tags">{e.genre.split(',').filter(Boolean).slice(0,6).map(x=><span key={x}>{x.trim()}</span>)}</div>
    {e.needs&&<p className="needs"><b>こんな方に：</b>{e.needs}</p>}
    <a className="go" href={e.url} target="_blank" rel="noopener noreferrer">イベント詳細・申込みへ <span>↗</span></a>
   </article>)}</section>
   {filtered.length>300&&<p className="limit">表示を300件に制限しています。条件を追加して絞り込んでください。</p>}
   {filtered.length===0&&<div className="empty">条件に一致するイベントがありません。検索条件を変えてみてください。</div>}
  </div>
 </main>
}
