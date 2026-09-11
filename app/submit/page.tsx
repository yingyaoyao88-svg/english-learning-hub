import { ArrowLeft } from "lucide-react";
import { SubmissionForm } from "@/components/submission-form";
import { SiteHeader } from "@/components/site-header";

export default function SubmitPage() { return <main className="min-h-screen"><SiteHeader/><section className="mx-auto max-w-3xl px-5 py-10 sm:px-8"><a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"><ArrowLeft className="h-4 w-4"/>返回资源目录</a><div className="mt-7 rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10"><p className="text-sm font-bold text-accent">分享一个好网站</p><h1 className="font-editorial mt-2 text-4xl">推荐英语学习资源</h1><p className="mt-4 leading-7 text-muted-foreground">告诉我们它为什么值得加入。每条推荐都会经过人工审核，审核通过后才会公开。</p><div className="mt-8"><SubmissionForm/></div></div></section></main>; }
