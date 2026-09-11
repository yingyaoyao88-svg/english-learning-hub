import { redirect } from "next/navigation";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { ReviewList } from "@/components/admin/review-list";
import { getAdmin } from "@/lib/auth/admin";
import { listResources } from "@/lib/resources/repository";
export const dynamic = "force-dynamic";
export default async function AdminPage() { const admin=await getAdmin(); if(!admin) redirect("/admin/login"); let resources=[]; try { resources=await listResources(); } catch {} return <main className="min-h-screen"><section className="mx-auto max-w-5xl px-5 py-10 sm:px-8"><div className="flex items-start justify-between gap-5"><div><p className="text-sm font-bold text-accent">管理员后台</p><h1 className="font-editorial mt-2 text-4xl">资源审核</h1><p className="mt-2 text-muted-foreground">登录账号：{admin.email}</p></div><a href={chatGPTSignOutPath("/")} className="category-pill">退出登录</a></div><ReviewList initial={resources}/></section></main>; }
