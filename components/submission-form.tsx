"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const field = "space-y-2"; const label = "text-sm font-bold";
export function SubmissionForm() {
  const [state, setState] = useState<"idle"|"sending"|"success"|"error">("idle");
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "submit_english_resource", title: "推荐英语学习网站", description: "提交一个英语学习网站进入人工审核队列。",
      inputSchema: { type: "object", properties: { name:{type:"string"}, url:{type:"string"}, description:{type:"string"}, category:{type:"string"}, skills:{type:"array",items:{type:"string"}}, level:{type:"string"}, priceType:{type:"string"}, recommendation:{type:"string"} }, required:["name","url","description","category","skills","level","priceType","recommendation"], additionalProperties:false },
      annotations: { readOnlyHint:false, untrustedContentHint:true },
      async execute(input: unknown) { const response=await fetch("/api/submissions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)}); const result=await response.json(); if(!response.ok) throw new Error("资源提交失败"); setState("success"); return result; }
    }, { signal:lifecycle.signal })).catch(()=>undefined);
    return () => lifecycle.abort();
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setState("sending"); const data = new FormData(event.currentTarget); const payload = { name:data.get("name"), url:data.get("url"), description:data.get("description"), category:data.get("category"), skills:String(data.get("skills")||"").split(/[,，]/).map(v=>v.trim()).filter(Boolean), level:data.get("level"), priceType:data.get("priceType"), recommendation:data.get("recommendation") }; try { const response=await fetch("/api/submissions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)}); setState(response.ok?"success":"error"); } catch { setState("error"); } }
  return <form onSubmit={submit} className="grid gap-5" noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><div className={field}><label className={label} htmlFor="name">网站名称</label><Input id="name" name="name" required minLength={2} maxLength={80}/></div><div className={field}><label className={label} htmlFor="url">网站网址</label><Input id="url" name="url" type="url" placeholder="https://" required/></div></div>
    <div className={field}><label className={label} htmlFor="description">网站简介</label><Textarea id="description" name="description" required minLength={20} maxLength={300} className="min-h-28"/><p className="text-xs text-muted-foreground">请说明它能帮助学习者完成什么。</p></div>
    <div className="grid gap-5 sm:grid-cols-3"><div className={field}><label className={label} htmlFor="category">主要分类</label><NativeSelect id="category" name="category" className="h-11"><NativeSelectOption value="general">综合学习</NativeSelectOption><NativeSelectOption value="listening">听力</NativeSelectOption><NativeSelectOption value="speaking">口语</NativeSelectOption><NativeSelectOption value="reading">阅读</NativeSelectOption><NativeSelectOption value="writing">写作</NativeSelectOption><NativeSelectOption value="vocabulary-grammar">词汇语法</NativeSelectOption><NativeSelectOption value="business">职场英语</NativeSelectOption><NativeSelectOption value="ielts">雅思</NativeSelectOption><NativeSelectOption value="toefl">托福</NativeSelectOption><NativeSelectOption value="github-skills">GitHub Skills</NativeSelectOption></NativeSelect></div><div className={field}><label className={label} htmlFor="level">适合水平</label><NativeSelect id="level" name="level" className="h-11"><NativeSelectOption value="all">所有水平</NativeSelectOption><NativeSelectOption value="beginner">入门</NativeSelectOption><NativeSelectOption value="intermediate">中级</NativeSelectOption><NativeSelectOption value="advanced">高级</NativeSelectOption></NativeSelect></div><div className={field}><label className={label} htmlFor="priceType">价格</label><NativeSelect id="priceType" name="priceType" className="h-11"><NativeSelectOption value="free">免费</NativeSelectOption><NativeSelectOption value="freemium">部分免费</NativeSelectOption><NativeSelectOption value="paid">付费</NativeSelectOption></NativeSelect></div></div>
    <div className={field}><label className={label} htmlFor="skills">技能标签</label><Input id="skills" name="skills" placeholder="听力，口语" required/><p className="text-xs text-muted-foreground">用逗号分隔，最多 5 个。</p></div>
    <div className={field}><label className={label} htmlFor="recommendation">推荐理由</label><Textarea id="recommendation" name="recommendation" required minLength={20} maxLength={500} className="min-h-28"/></div>
    <div aria-live="polite">{state==="success"&&<p className="rounded-xl bg-[#e1f0de] p-4 font-semibold text-[#28653b]">已收到推荐，我们会在审核后发布。</p>}{state==="error"&&<p className="rounded-xl bg-red-50 p-4 font-semibold text-red-700">暂时无法提交，请检查内容后稍后再试。</p>}</div>
    <button type="submit" disabled={state==="sending"||state==="success"} className="w-fit rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground shadow-[0_5px_0_var(--accent-deep)] disabled:opacity-60">{state==="sending"?"正在提交…":"提交推荐"}</button>
  </form>;
}
