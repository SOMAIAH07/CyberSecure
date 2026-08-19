/** Signal Ledger design reminder: show password evidence locally and discreetly, with restrained blue semantic emphasis. */
import { useMemo, useState } from "react";
import { Check, Eye, EyeOff, KeyRound, ShieldCheck, X } from "lucide-react";
import LabLayout, { EvidenceTag, TASKS, ToolExit, WorkspaceHeader } from "@/components/LabLayout";

const common = ["password", "qwerty", "letmein", "welcome", "admin", "123456", "iloveyou"];
function assess(value: string) {
  const criteria = [
    { label: "At least 12 characters", pass: value.length >= 12 },
    { label: "Uppercase and lowercase letters", pass: /[A-Z]/.test(value) && /[a-z]/.test(value) },
    { label: "A number", pass: /\d/.test(value) },
    { label: "A special character", pass: /[^A-Za-z0-9]/.test(value) },
    { label: "No common phrase or sequence", pass: value.length > 0 && !common.some((item) => value.toLowerCase().includes(item)) && !/(.)\1\1/.test(value) },
  ];
  const score = criteria.filter((item) => item.pass).length;
  const level: "Awaiting input" | "Weak" | "Medium" | "Strong" = value.length === 0 ? "Awaiting input" : score <= 2 ? "Weak" : score <= 3 ? "Medium" : "Strong";
  const suggestions = criteria.filter((item) => !item.pass).map((item) => item.label);
  return { criteria, score, level, suggestions };
}

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const result = useMemo(() => assess(password), [password]);
  const colors = { "Awaiting input": "neutral", Weak: "risk", Medium: "warn", Strong: "good" } as const;
  const bar = { "Awaiting input": "bg-slate-700", Weak: "bg-rose-400", Medium: "bg-[#f5b544]", Strong: "bg-emerald-400" };
  return (
    <LabLayout task={TASKS[1]}>
      <WorkspaceHeader task={TASKS[1]} eyebrow="Credential hygiene / private meter" title="Construct a password with useful friction." description="Evaluate the parts that make a credential harder to guess. Analysis happens only in this page’s temporary browser memory—your typed password is never sent, saved, or displayed in the report." status={<><ShieldCheck className="h-4 w-4 text-sky-300" /><div><p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Privacy state</p><p className="text-sm font-medium text-slate-200">Input stays local</p></div></>} />
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-[1.22fr_0.78fr]">
          <section className="rounded-2xl border border-white/10 bg-[#0b1b28] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6"><div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-300">01 / inspect composition</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">Private strength check</h2></div><EvidenceTag tone="info">No storage</EvidenceTag></div>
            <label className="mt-8 block"><span className="mb-2 block text-xs font-medium text-slate-300">Try a password structure</span><div className="relative"><input value={password} onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} autoComplete="new-password" placeholder="Enter a practice password" className="h-14 w-full rounded-xl border border-white/10 bg-[#07131d] px-4 pr-12 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#f5b544]/70 focus:ring-2 focus:ring-[#f5b544]/15" /><button type="button" onClick={() => setVisible((current) => !current)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-[#f5b544]" aria-label={visible ? "Hide password" : "Show password"}>{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
            <div className="mt-7"><div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-300">Strength signal</p><EvidenceTag tone={colors[result.level]}>{result.level}</EvidenceTag></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]"><div className={`h-full rounded-full transition-all duration-300 ${bar[result.level]}`} style={{ width: `${Math.max(password ? 8 : 0, result.score * 20)}%` }} /></div><div className="mt-3 flex justify-between font-mono text-[10px] text-slate-600"><span>WEAK</span><span>MEDIUM</span><span>STRONG</span></div></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{result.criteria.map((item) => <div key={item.label} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${item.pass ? "border-emerald-300/15 bg-emerald-300/[0.055] text-emerald-100" : "border-white/[0.08] bg-white/[0.02] text-slate-400"}`}>{item.pass ? <Check className="h-4 w-4 shrink-0 text-emerald-300" /> : <X className="h-4 w-4 shrink-0 text-slate-600" />}{item.label}</div>)}</div>
          </section>
          <aside className="overflow-hidden rounded-2xl border border-white/10 bg-[#07131d]"><div className="relative h-40 overflow-hidden"><img src="/manus-storage/cybersecure-password-material_3d2cac75.jpg" alt="Abstract segmented security aperture" className="h-full w-full object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#07131d] to-transparent" /></div><div className="p-6"><div className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-sky-300" /><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-300">Improvement note</p></div>{password ? <><h3 className="mt-4 text-lg font-semibold">The next useful change</h3><ul className="mt-4 space-y-3">{result.suggestions.length ? result.suggestions.map((item) => <li key={item} className="flex gap-3 font-serif text-sm leading-5 text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />Add {item.toLowerCase()}.</li>) : <li className="font-serif text-sm leading-6 text-emerald-100">This practice password meets each of the local construction checks. A unique password manager-generated value is still preferable for real accounts.</li>}</ul></> : <><h3 className="mt-4 text-lg font-semibold">Why construction matters</h3><p className="mt-3 font-serif text-sm leading-6 text-slate-400">Long, unique passwords built from varied characters increase the work required for common guessing attacks. Reuse is still risky—even a strong password should belong to one account only.</p></>}</div></aside>
        </div>
        <section className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><p className="font-mono text-[10px] text-slate-500">LOCAL_CHECKS</p><p className="mt-1 text-2xl font-semibold">{result.score}<span className="text-sm text-slate-500"> / 5</span></p></div><div className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><p className="font-mono text-[10px] text-slate-500">PASSWORD_LENGTH</p><p className="mt-1 text-2xl font-semibold">{password.length}<span className="text-sm text-slate-500"> chars</span></p></div><div className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><p className="font-mono text-[10px] text-slate-500">DATA_RETENTION</p><p className="mt-1 text-lg font-semibold text-emerald-200">None</p></div></section>
        <ToolExit nextTask={TASKS[2]} />
      </div>
    </LabLayout>
  );
}
