/**
 * Signal Ledger design reminder: maintain an editorial SOC field-notebook feel—ink surfaces,
 * amber signal pins, thin ledger rules, and a clearly isolated task workspace.
 */
import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowUpRight,
  ChevronLeft,
  Fingerprint,
  KeyRound,
  Radar,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

export type TaskMeta = {
  index: string;
  name: string;
  shortName: string;
  path: string;
  description: string;
  icon: typeof Radar;
  color: "amber" | "blue" | "moss" | "rose";
};

export const TASKS: TaskMeta[] = [
  {
    index: "01",
    name: "Basic Vulnerability Scan",
    shortName: "Vulnerability Scan",
    path: "/vulnerability-scan",
    description: "Inspect a local training target for common exposure signals.",
    icon: Radar,
    color: "amber",
  },
  {
    index: "02",
    name: "Password Strength Checker",
    shortName: "Password Check",
    path: "/password-checker",
    description: "Measure password construction without storing the input.",
    icon: KeyRound,
    color: "blue",
  },
  {
    index: "03",
    name: "Secure Login Defense",
    shortName: "Secure Login",
    path: "/secure-login",
    description: "Register, authenticate, and observe brute-force controls.",
    icon: Fingerprint,
    color: "moss",
  },
  {
    index: "04",
    name: "Phishing Detection",
    shortName: "Phishing Detection",
    path: "/phishing-detection",
    description: "Review URL or email signals without opening links.",
    icon: SearchCheck,
    color: "rose",
  },
];

const colorClass = {
  amber: "text-[#f5b544] bg-[#f5b544]/10 border-[#f5b544]/20",
  blue: "text-[#f5b544] bg-[#f5b544]/10 border-[#f5b544]/20",
  moss: "text-[#f5b544] bg-[#f5b544]/10 border-[#f5b544]/20",
  rose: "text-[#f5b544] bg-[#f5b544]/10 border-[#f5b544]/20",
};

export function SignalMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/manus-storage/cybersecure-aperture-mark_589aaa72.png"
      alt="CyberSecure Lab mark"
      className={`object-contain ${className}`}
    />
  );
}

export function EvidenceTag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "risk" | "info";
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.035] text-slate-300",
    good: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    warn: "border-[#f5b544]/25 bg-[#f5b544]/10 text-[#ffd47f]",
    risk: "border-rose-300/20 bg-rose-300/10 text-rose-200",
    info: "border-sky-300/20 bg-sky-300/10 text-sky-200",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export default function LabLayout({
  task,
  children,
}: {
  task?: TaskMeta;
  children: ReactNode;
}) {
  const [location] = useLocation();
  return (
    <div className="min-h-screen bg-[#07131d] text-slate-100 selection:bg-[#f5b544] selection:text-[#07131d]">
      <div className="fixed inset-0 ledger-noise pointer-events-none" aria-hidden="true" />
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[270px] flex-col border-r border-white/10 bg-[#07131d]/95 px-5 py-6 backdrop-blur-xl lg:flex">
        <Link href="/" className="group flex items-center gap-3 rounded-lg px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#f5b544]">
          <SignalMark className="h-10 w-10 transition-transform duration-200 group-hover:rotate-6" />
          <span>
            <span className="block font-display text-[15px] font-semibold tracking-[0.01em] text-slate-100">CyberSecure</span>
            <span className="-mt-0.5 block text-[11px] uppercase tracking-[0.22em] text-[#f5b544]">Lab / Fieldwork</span>
          </span>
        </Link>

        <div className="mt-12">
          <p className="flex items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span className="signal-pin" /> Task dashboards
          </p>
          <nav className="mt-4 space-y-1.5" aria-label="Task dashboards">
            {TASKS.map((item) => {
              const Icon = item.icon;
              const active = item.path === location;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
                    active
                      ? "border-white/10 bg-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                      : "border-transparent hover:border-white/8 hover:bg-white/[0.035]"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${colorClass[item.color]}`}>
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold tracking-[0.14em] text-slate-500">TASK {item.index}</span>
                    <span className="block truncate pt-0.5 text-[13px] font-medium text-slate-200">{item.shortName}</span>
                  </span>
                  {active && <span className="signal-pin" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="rounded-xl border border-[#f5b544]/15 bg-[#f5b544]/[0.055] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5b544]">Practice boundary</p>
            <p className="mt-2 font-serif text-[13px] leading-5 text-slate-300">Every workflow is local, guided, and purpose-built for learning.</p>
          </div>
          <Link href="/" className="mt-4 flex items-center gap-2 px-2 text-xs text-slate-400 transition-colors hover:text-slate-100">
            <ChevronLeft className="h-3.5 w-3.5" /> Lab overview
          </Link>
        </div>
      </aside>

      <main className="relative min-h-screen lg:ml-[270px]">
        <div className="border-b border-white/10 bg-[#07131d]/75 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <SignalMark className="h-8 w-8" />
              <span className="text-sm font-semibold">CyberSecure Lab</span>
            </Link>
            <div className="hidden min-w-0 lg:block">
              {task ? (
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#f5b544]">TASK_{task.index}</span>
                  <span className="h-4 w-px bg-white/15" />
                  <span className="truncate text-sm text-slate-400">{task.name}</span>
                </div>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">Learning workspace / 04 controlled exercises</span>
              )}
            </div>
            <EvidenceTag tone="good">Local learning mode</EvidenceTag>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export function WorkspaceHeader({
  task,
  eyebrow,
  title,
  description,
  status,
}: {
  task: TaskMeta;
  eyebrow: string;
  title: string;
  description: string;
  status: ReactNode;
}) {
  const Icon = task.icon;
  return (
    <header className="border-b border-white/10 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colorClass[task.color]}`}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"><span className="signal-pin" /> {eyebrow}</span>
          </div>
          <h1 className="font-display max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-50 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl font-serif text-[17px] leading-7 text-slate-300">{description}</p>
        </div>
        <div className="flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 xl:self-auto">{status}</div>
      </div>
    </header>
  );
}

export function ToolExit({ nextTask }: { nextTask?: TaskMeta }) {
  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#f5b544]">
        <ChevronLeft className="h-4 w-4" /> Return to lab overview
      </Link>
      {nextTask && (
        <Link href={nextTask.path} className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 transition-colors hover:text-[#f5b544]">
          Continue to Task {nextTask.index} <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
