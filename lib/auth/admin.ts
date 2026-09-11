import { getChatGPTUser } from "@/app/chatgpt-auth";

export async function getAdmin() { const user = await getChatGPTUser(); if (!user) return null; const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase(); return !allowed || user.email.toLowerCase() === allowed ? user : null; }
