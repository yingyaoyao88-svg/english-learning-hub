import type { Resource, ResourceCategory, ResourceLevel, PriceType } from "./types";

const now = "2026-09-11T00:00:00.000Z";
const make = (id: string, name: string, url: string, description: string, category: ResourceCategory, skills: string[], level: ResourceLevel, priceType: PriceType): Resource => ({ id, name, url, normalizedUrl: url.replace(/\/$/, ""), description, category, skills, level, priceType, recommendation: description, status: "published", createdAt: now, updatedAt: now, publishedAt: now });

export const curatedResources: Resource[] = [
  make("bbc", "BBC Learning English", "https://www.bbc.co.uk/learningenglish", "新闻、短视频和系列课程兼备，适合持续训练真实英语听力与表达。", "listening", ["听力", "口语"], "intermediate", "free"),
  make("voa", "VOA Learning English", "https://learningenglish.voanews.com", "用较慢语速的新闻与专题节目练习美式英语，内容更新稳定。", "listening", ["听力", "新闻"], "beginner", "free"),
  make("duolingo", "Duolingo", "https://www.duolingo.com", "通过短小练习建立每日学习习惯，适合零基础和碎片时间学习。", "general", ["综合", "入门"], "beginner", "freemium"),
  make("british-council", "British Council LearnEnglish", "https://learnenglish.britishcouncil.org", "覆盖听说读写、语法和商务英语，并按水平组织练习内容。", "general", ["综合", "语法"], "all", "free"),
  make("youglish", "YouGlish", "https://youglish.com", "从真实视频中检索单词与短语的发音语境，适合纠音和表达积累。", "speaking", ["口语", "发音"], "all", "free"),
  make("elsa", "ELSA Speak", "https://elsaspeak.com", "用语音反馈练习英语发音、重音和流利度，适合系统纠音。", "speaking", ["口语", "发音"], "all", "freemium"),
  make("breaking-news", "Breaking News English", "https://breakingnewsenglish.com", "把时事新闻改编成分级阅读、听力与讨论练习，方便精学。", "reading", ["阅读", "听力"], "all", "free"),
  make("gutenberg", "Project Gutenberg", "https://www.gutenberg.org", "免费阅读大量英文经典原著，适合中高级学习者进行泛读。", "reading", ["阅读", "原著"], "advanced", "free"),
  make("writeandimprove", "Write & Improve", "https://writeandimprove.com", "提交英文写作并获得即时反馈，适合反复修改与观察进步。", "writing", ["写作", "反馈"], "all", "free"),
  make("grammarly", "Grammarly", "https://www.grammarly.com", "检查英文语法、清晰度和语气，适合作为写作后的校对工具。", "writing", ["写作", "语法"], "all", "freemium"),
  make("vocabulary", "Vocabulary.com", "https://www.vocabulary.com", "用词义解释、语境例句和自适应练习扩充英语词汇。", "vocabulary-grammar", ["词汇", "例句"], "all", "freemium"),
  make("perfect-english", "Perfect English Grammar", "https://www.perfect-english-grammar.com", "以清晰讲解和针对性练习解决常见英语语法难点。", "vocabulary-grammar", ["语法", "练习"], "all", "freemium"),
  make("business-english-pod", "Business English Pod", "https://www.businessenglishpod.com", "围绕会议、谈判和演示等场景学习实用商务表达。", "business", ["职场", "听力"], "intermediate", "freemium"),
  make("hbr", "Harvard Business Review", "https://hbr.org", "通过高质量商业文章积累职场词汇，并理解真实管理语境。", "business", ["职场", "阅读"], "advanced", "freemium"),
  make("ielts-liz", "IELTS Liz", "https://ieltsliz.com", "免费提供雅思四科技巧、示例和常见问题，结构清晰易查找。", "ielts", ["雅思", "备考"], "intermediate", "free"),
  make("ielts-simon", "IELTS Simon", "https://www.ielts-simon.com", "以简洁示范拆解雅思写作与口语思路，适合长期跟练。", "ielts", ["雅思", "写作"], "intermediate", "freemium"),
  make("ets-toefl", "ETS TOEFL", "https://www.ets.org/toefl", "托福考试官方信息、题型说明和备考资源的权威入口。", "toefl", ["托福", "官方"], "intermediate", "freemium"),
  make("tst-prep", "TST Prep TOEFL", "https://tstprep.com", "通过课程、练习和策略讲解覆盖托福四科备考。", "toefl", ["托福", "备考"], "intermediate", "freemium"),
];
