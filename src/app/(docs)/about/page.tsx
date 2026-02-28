"use client";

export default function AboutVesper() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
      {/* Subtle Dot Grid Background */}
      <div className="fixed inset-0 z-[-2] bg-background" />
      <div
        className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />

      {/* Vesper Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <main className="flex-1 w-full pt-32 flex flex-col items-center justify-center">
        <section className="max-w-4xl px-4 mx-auto text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground mb-6">
            About <span className="text-brand-accent italic">Vesper</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground mb-8">
            Vesper isn’t just a Minecraft launcher — it’s a tool made for a reason.<br />
            Built for creators, tinkerers, and anyone who wants <b>control</b>, <b>performance</b>, and no extra stuff they don’t need.
          </p>
          <div className="mt-8 text-left text-base md:text-lg max-w-2xl space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">The Problem</h2>
              <p>
                Minecraft launchers today are cluttered, slow, and try to do too much for everyone.
                <span className="block mt-2" />
                You juggle mod folders, deal with ad-filled CurseForge lists, and lose control for the sake of “user experience.”
                Vesper exists because we want <b>raw speed</b> and <b>full control</b> — not have our hands held. No more confusing mod managers or tools that just hide what’s really happening.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">Why Vesper?</h2>
              <p>
                <b>People don’t just use tools. They use tools that make sense to them.</b> Vesper is for those who want to have real control over their game.
                It does things vanilla launchers, Fabric, and CurseForge don’t do:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <b>Real file editing:</b> Not just a mod folder — Vesper shows you your full Minecraft setup like a real project. Need to change configs, add patches, or manage resource packs? It’s a <span className="text-brand-accent">real editor</span>, not a fake one.
                </li>
                <li>
                  <b>Git-like versioning:</b> Your setup is like a code repo — branch, save, and roll back modpacks, worlds, and configs fast. You don’t lose changes or work.
                </li>
                <li>
                  <b>No-bloat means performance:</b> Everything has a reason. No analytics, no forced themes, no plugins you didn’t ask for. Simple design, full control.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">Philosophy</h2>
              <p>
                <b>Performance.</b> <span className="text-muted-foreground">Starts up in milliseconds. No lag launching. Your mods, your way.</span><br />
                <b>Minimalism.</b> <span className="text-muted-foreground">Everything is clear and on purpose. No distractions. Every screen matters.</span><br />
                <b>Control.</b> <span className="text-muted-foreground">Change, tinker, and automate as much as you like. You’re in charge.</span><br />
                <b>Anti-bloat.</b> <span className="text-muted-foreground">No popups, no ads, nothing extra. You always see exactly what’s happening.</span>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">The Vesper Difference</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <b>No more guessing:</b> You can see every mod, every change, every file.
                </li>
                <li>
                  <b>Not for everyone:</b> Vesper is made for people who want more power and care how things work. If that’s you, you’ll get it.
                </li>
                <li>
                  <b>Own your setup:</b> Vesper is a toolkit for people who want to <span className="italic">build</span> their own Minecraft experience, not just <span className="italic">use</span> what others built.
                </li>
              </ul>
            </div>
            <div className="pt-8 text-center text-muted-foreground text-sm">
              <span>
                Vesper is for people who look at Minecraft as more than a game — it’s something you can change, automate, and <b>own</b>.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}