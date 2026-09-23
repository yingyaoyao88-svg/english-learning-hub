"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SpatialResourceTrack } from "./spatial-resource-track";
import { filterResources } from "@/lib/resources/filter";
import type { Resource, ResourceCategory, ResourceLevel, PriceType } from "@/lib/resources/types";

const categories: [ResourceCategory | "all", string][] = [["all","全部"],["general","综合"],["listening","听力"],["speaking","口语"],["reading","阅读"],["writing","写作"],["vocabulary-grammar","词汇语法"],["business","职场"],["ielts","雅思"],["toefl","托福"],["github-skills","GitHub Skills"]];
const categoryLabel = Object.fromEntries(categories) as Record<ResourceCategory | "all", string>;

export function ResourceDirectory({ resources }: { resources: Resource[] }) {
  const [allResources, setAllResources] = useState(resources); const [query, setQuery] = useState(""); const [category, setCategory] = useState<ResourceCategory | "all">("all"); const [level, setLevel] = useState<ResourceLevel | "all">("all"); const [price, setPrice] = useState<PriceType | "all">("all"); const [showFilters, setShowFilters] = useState(false); const [expandedResourceId, setExpandedResourceId] = useState<string | null>(null);
  useEffect(() => { fetch("/api/resources").then((response)=>response.json()).then((data:{resources?:Resource[]})=>{ if(data.resources?.length) setAllResources([...resources, ...data.resources.filter((item)=>!resources.some((base)=>base.normalizedUrl===item.normalizedUrl))]); }).catch(()=>undefined); }, [resources]);
  const filtered = useMemo(() => filterResources(allResources, { query, category, level, price }), [allResources, query, category, level, price]);
  useEffect(() => { setExpandedResourceId(null); }, [query, category, level, price]);
  const clear = () => { setQuery(""); setCategory("all"); setLevel("all"); setPrice("all"); };
  return <>
    <div className="hero-grid rounded-[2rem] border border-border bg-card px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-11"><p className="text-sm font-semibold text-[var(--forest-soft)]">为成人自学者精心整理</p><h1 className="font-editorial mt-4 max-w-3xl text-4xl leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-6xl">找到适合你的英语学习资源</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">从日常听说到职场沟通、雅思托福，把真正好用的网站放进你的学习路径。</p>
      <div className="relative mt-8 max-w-3xl"><Search aria-hidden="true" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(e)=>setQuery(e.target.value)} type="search" aria-label="搜索学习资源" placeholder="搜索网站、技能或学习目标…" className="h-14 w-full rounded-2xl border border-border bg-white pl-13 pr-5 text-base outline-none focus:ring-4 focus:ring-[var(--focus-halo)]"/></div>
      <div className="mt-6 flex flex-wrap gap-2">{categories.map(([value,label])=><button key={value} type="button" onClick={()=>setCategory(value)} aria-pressed={category===value} className={category===value?"category-pill category-pill-active":"category-pill"}>{label}</button>)}</div>
    </div>
    <div id="resources" className="mt-9 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.14em] text-accent">资源目录</p><h2 className="font-editorial mt-1 text-3xl">{filtered.length} 个学习网站</h2></div><button type="button" onClick={()=>setShowFilters(!showFilters)} className="category-pill flex items-center gap-2"><SlidersHorizontal className="h-4 w-4"/>更多筛选</button></div>
    {showFilters&&<div className="mt-4 flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-4"><label className="text-sm font-semibold">水平 <select value={level} onChange={(e)=>setLevel(e.target.value as ResourceLevel|"all")} className="ml-2 rounded-lg border border-border bg-white p-2"><option value="all">不限</option><option value="beginner">入门</option><option value="intermediate">中级</option><option value="advanced">高级</option></select></label><label className="text-sm font-semibold">价格 <select value={price} onChange={(e)=>setPrice(e.target.value as PriceType|"all")} className="ml-2 rounded-lg border border-border bg-white p-2"><option value="all">不限</option><option value="free">免费</option><option value="freemium">部分免费</option><option value="paid">付费</option></select></label><button type="button" onClick={clear} className="ml-auto flex items-center gap-1 text-sm font-bold"><X className="h-4 w-4"/>清除筛选</button></div>}
    {filtered.length?<SpatialResourceTrack resources={filtered} categoryLabel={categoryLabel[category]} expandedResourceId={expandedResourceId} onToggle={(id)=>setExpandedResourceId((current)=>current===id?null:id)} onDismiss={()=>setExpandedResourceId(null)}/>:<div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-12 text-center"><h3 className="text-xl font-bold">没有找到匹配的资源</h3><p className="mt-2 text-muted-foreground">换个关键词，或者清除筛选条件试试。</p><button type="button" onClick={clear} className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">清除筛选</button></div>}
  </>;
}
