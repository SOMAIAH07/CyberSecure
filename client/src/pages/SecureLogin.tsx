/** Signal Ledger design reminder: show defensive authentication as an understandable, isolated practice control with moss semantic feedback. */
import { useEffect, useState } from "react";
import { CheckCircle2, Fingerprint, LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import LabLayout, { EvidenceTag, TASKS, ToolExit, WorkspaceHeader } from "@/components/LabLayout";

type Account = { email: string; hash: string };
async function hashCredential(value: string) {
  const data = new TextEncoder().encode(`cybersecure-lab-demo::${value}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function SecureLogin() {
  const [account, setAccount] = useState<Account | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [notice, setNotice] = useState<{ text: string; tone: "neutral" | "good" | "warn" | "risk" } | null>(null);
  const [now, setNow] = useState(Date.now());
  const locked = lockUntil > now;
  const remaining = Math.max(0, Math.ceil((lockUntil - now) / 1000));

  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, []);

  async function register() {
    if (!email.includes("@") || password.length < 12) { setNotice({ text: "Use an email-shaped identifier and a password of at least 12 characters for this exercise.", tone: "warn" }); return; }
    const hash = await hashCredential(password);
    setAccount({ email: email.trim().toLowerCase(), hash });
    setPassword("");
    setMode("login");
    setFailedAttempts(0);
    setNotice({ text: "Practice account registered. Only a one-way hash is held in temporary browser memory.", tone: "good" });
  }
  async function login() {
    if (locked) { setNotice({ text: `Authentication is paused for ${remaining}s after repeated failed attempts.`, tone: "risk" }); return; }
    if (!account) { setNotice({ text: "Register a practice account in this dashboard before attempting a login.", tone: "warn" }); return; }
    const candidate = await hashCredential(password);
    const valid = account.email === email.trim().toLowerCase() && account.hash === candidate;
    setPassword("");
    if (valid) { setFailedAttempts(0); setNotice({ text: "Authentication accepted. The control ledger has been reset.", tone: "good" }); return; }
    const nextFailures = failedAttempts + 1;
    if (nextFailures >= 3) { setFailedAttempts(3); setLockUntil(Date.now() + 30000); setNotice({ text: "Three failed attempts triggered a 30-second temporary lockout.", tone: "risk" }); } else { setFailedAttempts(nextFailures); setNotice({ text: `Authentication rejected. ${3 - nextFailures} attempt${3 - nextFailures === 1 ? "" : "s"} remain before temporary lockout.`, tone: "warn" }); }
  }

  return (
    <LabLayout task={TASKS[2]}>
      <WorkspaceHeader task={TASKS[2]} eyebrow="Authentication controls / transient simulation" title="Make the login path defend itself." description="Register a practice identity, then observe credential hashing and temporary lockout behavior in a contained browser-only exercise. Refreshing or leaving this dashboard clears the transient training account." status={<><ShieldCheck className="h-4 w-4 text-emerald-300" /><div><p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Control set</p><p className="text-sm font-medium text-slate-200">Hash + lockout</p></div></>} />
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.86fr]">
          <section className="rounded-2xl border border-white/10 bg-[#0b1b28] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6"><div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300">01 / practice identity</p><h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{mode === "register" ? "Register a training account" : "Authenticate in the lab"}</h2></div><div className="flex rounded-lg border border-white/10 bg-[#07131d] p-1"><button type="button" onClick={() => setMode("register")} className={`rounded-md px-3 py-1.5 text-xs transition ${mode === "register" ? "bg-white/10 text-slate-100" : "text-slate-500 hover:text-slate-300"}`}>Register</button><button type="button" onClick={() => setMode("login")} className={`rounded-md px-3 py-1.5 text-xs transition ${mode === "login" ? "bg-white/10 text-slate-100" : "text-slate-500 hover:text-slate-300"}`}>Log in</button></div></div>
            <div className="mt-7 grid gap-5"><label><span className="mb-2 block text-xs font-medium text-slate-300">Email address</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="username" placeholder="student@lab.local" className="h-12 w-full rounded-xl border border-white/10 bg-[#07131d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#f5b544]/60 focus:ring-2 focus:ring-[#f5b544]/15" /></label><label><span className="mb-2 block text-xs font-medium text-slate-300">Password</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Use 12 or more characters" className="h-12 w-full rounded-xl border border-white/10 bg-[#07131d] px-4 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#f5b544]/60 focus:ring-2 focus:ring-[#f5b544]/15" /></label><button type="button" onClick={mode === "register" ? register : login} disabled={locked} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f5b544] px-5 text-sm font-semibold text-[#07131d] transition hover:bg-[#ffd06b] active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400">{mode === "register" ? <><UserPlus className="h-4 w-4" /> Create practice identity</> : locked ? <><LockKeyhole className="h-4 w-4" /> Locked for {remaining}s</> : <><Fingerprint className="h-4 w-4" /> Attempt authentication</>}</button></div>
            {notice && <div className={`mt-6 rounded-xl border p-4 text-sm leading-5 ${notice.tone === "good" ? "border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100" : notice.tone === "risk" ? "border-rose-300/20 bg-rose-300/[0.08] text-rose-100" : "border-[#f5b544]/20 bg-[#f5b544]/[0.07] text-[#ffe3a2]"}`}>{notice.text}</div>}
          </section>
          <aside className="rounded-2xl border border-white/10 bg-[#07131d] p-6 sm:p-8"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300">02 / defensive ledger</p><div className="mt-6 divide-y divide-white/10 border-y border-white/10">{[{ label: "Credential storage", value: account ? "One-way hash active" : "No account in memory", tone: account ? "good" : "neutral" }, { label: "Failed attempts", value: `${failedAttempts} of 3 before pause`, tone: failedAttempts ? "warn" : "neutral" }, { label: "Temporary lockout", value: locked ? `${remaining}s remaining` : "Standing by", tone: locked ? "risk" : "good" }].map((entry) => <div key={entry.label} className="flex items-center justify-between gap-4 py-5"><div><p className="text-xs text-slate-500">{entry.label}</p><p className="mt-1 text-sm font-medium text-slate-200">{entry.value}</p></div><EvidenceTag tone={entry.tone as "neutral" | "good" | "warn" | "risk"}>{entry.tone === "good" ? "Active" : entry.tone === "risk" ? "Paused" : entry.tone === "warn" ? "Watch" : "Idle"}</EvidenceTag></div>)}</div><div className="mt-7 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="flex items-center gap-2 text-sm font-medium text-slate-200"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> Why it matters</p><p className="mt-2 font-serif text-sm leading-6 text-slate-400">Hashing avoids storing a raw password. Rate controls slow automated guessing and give defenders a clear event to investigate. Real systems also need secure transport, salts, audited recovery, and server-side controls.</p></div></aside>
        </div>
        <ToolExit nextTask={TASKS[3]} />
      </div>
    </LabLayout>
  );
}
