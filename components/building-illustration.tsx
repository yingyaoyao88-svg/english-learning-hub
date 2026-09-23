import type { BuildingKind, BuildingTheme } from "@/lib/resources/buildings";

const labels: Record<BuildingKind, string> = {
  "learning-center": "学习中心建筑",
  "clock-tower": "钟楼建筑",
  "cafe-cabin": "咖啡木屋建筑",
  bookshop: "书店建筑",
  "writing-workshop": "写作工坊建筑",
  "language-lab": "语言研究所建筑",
  office: "办公楼建筑",
  "academy-castle": "学院城堡建筑",
  "international-academy": "国际学院建筑",
  "inventor-workshop": "发明工坊建筑",
};

function KindDetails({ kind, accent, roof }: { kind: BuildingKind; accent: string; roof: string }) {
  if (kind === "clock-tower") return <>
    <rect x="88" y="28" width="64" height="92" rx="8" fill={roof}/>
    <circle cx="120" cy="60" r="19" fill="#fff8df" stroke="#173f37" strokeWidth="4"/>
    <path d="M120 60V48M120 60l11 7" stroke="#173f37" strokeWidth="4" strokeLinecap="round"/>
  </>;
  if (kind === "bookshop") return <>
    <path d="M47 104h146v22H47z" fill={accent}/>
    <path d="M55 104v22M75 104v22M95 104v22M115 104v22M135 104v22M155 104v22M175 104v22" stroke="#fff8df" strokeWidth="7"/>
    <rect x="58" y="135" width="48" height="36" rx="5" fill="#fff8df" opacity=".88"/>
  </>;
  if (kind === "cafe-cabin") return <>
    <path d="M48 113h144v18H48z" fill={accent}/>
    <path d="M62 113v18M86 113v18M110 113v18M134 113v18M158 113v18M182 113v18" stroke="#fff8df" strokeWidth="8"/>
    <path d="M163 82h17a10 10 0 010 20h-5" fill="none" stroke="#fff8df" strokeWidth="6"/>
  </>;
  if (kind === "academy-castle" || kind === "international-academy") return <>
    <rect x="36" y="73" width="38" height="104" rx="4" fill={roof}/>
    <rect x="166" y="73" width="38" height="104" rx="4" fill={roof}/>
    <path d="M30 73l12-25 9 15 10-15 19 25M160 73l12-25 9 15 10-15 19 25" fill={accent}/>
    <circle cx="120" cy="104" r="15" fill="#fff8df" opacity=".9"/>
  </>;
  if (kind === "inventor-workshop") return <>
    <rect x="55" y="42" width="22" height="58" rx="4" fill={roof}/>
    <path d="M57 39h18l7-15H50z" fill={accent}/>
    <circle cx="169" cy="108" r="23" fill="none" stroke={accent} strokeWidth="8" strokeDasharray="7 5"/>
    <circle cx="169" cy="108" r="7" fill={accent}/>
  </>;
  if (kind === "office") return <>
    {[61, 94, 127, 160].map((x) => <g key={x}><rect x={x} y="89" width="20" height="21" rx="3" fill="#fff8df"/><rect x={x} y="122" width="20" height="21" rx="3" fill="#fff8df"/></g>)}
  </>;
  if (kind === "language-lab") return <>
    <circle cx="120" cy="94" r="27" fill="#fff8df" opacity=".9"/>
    <path d="M98 94h44M120 67c-13 15-13 39 0 54M120 67c13 15 13 39 0 54" fill="none" stroke={roof} strokeWidth="4"/>
  </>;
  if (kind === "writing-workshop") return <>
    <path d="M152 72c27-26 39-9 13 16l-31 30-15 5 5-15z" fill={accent} stroke="#173f37" strokeWidth="3"/>
    <path d="M124 108l10 10" stroke="#173f37" strokeWidth="3"/>
  </>;
  return <path d="M92 104h56M104 90v28M120 82v36M136 90v28" stroke="#fff8df" strokeWidth="7" strokeLinecap="round"/>;
}

export function BuildingIllustration({ theme, active }: { theme: BuildingTheme; active: boolean }) {
  return <svg
    viewBox="0 0 240 220"
    role="img"
    aria-label={labels[theme.kind]}
    data-lit={String(active)}
    className="building-illustration"
  >
    <ellipse cx="120" cy="202" rx="94" ry="12" fill="#174f42" opacity=".12"/>
    <path d="M38 98L120 35l82 63v92H38z" fill={theme.wall} stroke="#173f37" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M24 104L120 24l96 80-13 13-83-68-83 68z" fill={theme.roof} stroke="#173f37" strokeWidth="5" strokeLinejoin="round"/>
    <KindDetails kind={theme.kind} accent={theme.accent} roof={theme.roof}/>
    <rect className="building-window" x="58" y="132" width="39" height="35" rx="6" fill={active ? theme.accent : "#dbece9"} stroke="#173f37" strokeWidth="4"/>
    <path d="M77.5 133v33M59 149.5h37" stroke="#173f37" strokeWidth="3"/>
    <rect className="building-window" x="143" y="132" width="39" height="35" rx="6" fill={active ? theme.accent : "#dbece9"} stroke="#173f37" strokeWidth="4"/>
    <path d="M162.5 133v33M144 149.5h37" stroke="#173f37" strokeWidth="3"/>
    <path d="M103 190v-48a17 17 0 0134 0v48z" fill={theme.roof} stroke="#173f37" strokeWidth="5"/>
    <circle cx="128" cy="166" r="3.5" fill={theme.accent}/>
    <path d="M25 191h190" stroke="#173f37" strokeWidth="5" strokeLinecap="round"/>
  </svg>;
}
