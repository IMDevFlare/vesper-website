"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
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

            <main className="flex-1 w-full pt-16">
                <section className="max-w-2xl mx-auto px-6 py-20">
                    <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-8 text-center">
                        Privacy <span className="text-brand-accent">Policy</span>
                    </h1>
                    <div className="prose dark:prose-invert prose-neutral mx-auto text-muted-foreground">
                        <p>
                            <strong>Vesper Launcher</strong> is committed to protecting your privacy. This Privacy Policy explains what information we collect and how it is handled.
                        </p>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Personal Information</h2>
                        <ul className="list-disc pl-6 mt-2 mb-6">
                            <li>
                                <span className="font-medium">No Telemetry:</span> We do <span className="text-brand-accent font-medium">not collect any telemetry, tracking, or analytics data</span> from the launcher or this website.
                            </li>
                            <li>
                                <span className="font-medium">Account Data:</span> If you log in to the launcher, your credentials are handled securely by Microsoft’s authentication services. We do not store or process your login details.
                            </li>
                            <li>
                                <span className="font-medium">No Cookies:</span> We do not use cookies or similar tracking technologies on this website.
                            </li>
                        </ul>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Third-Party Services</h2>
                        <p>
                            Vesper Launcher may access external APIs (for example, <a href="https://modrinth.com" rel="noopener noreferrer" target="_blank" className="text-brand-accent underline underline-offset-4">Modrinth</a> or <a href="https://curseforge.com" rel="noopener noreferrer" target="_blank" className="text-brand-accent underline underline-offset-4">CurseForge</a>) to provide mod and resource integration features. These services may have their own privacy policies, which apply when you use them through Vesper.
                        </p>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Discord Integration</h2>
                        <p>
                            If you connect Discord for Rich Presence, the launcher interacts only with the local Discord client on your machine. No Discord data is sent to us.
                        </p>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Data Security</h2>
                        <p>
                            We use industry-standard security practices to protect your information. As we do <span className="font-medium">not store personal or usage data</span>, there is minimal risk of data exposure.
                        </p>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Your Rights</h2>
                        <p>
                            As we do not process or retain any personal data, there are no data subject rights requirements under the GDPR or similar regulations. If you contact us, any information provided will be used solely for communication regarding your inquiry.
                        </p>
                        <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
                        <p>
                            For privacy questions, email <a href="mailto:support@devflare.de" className="text-brand-accent underline underline-offset-2">support@devflare.de</a>. Inquiries requesting support should use our <Link href="/legal" className="text-brand-accent underline underline-offset-4">Legal Notice</Link> for reference.
                        </p>
                        <hr className="my-10 border-border/40" />
                        <p className="text-xs text-muted-foreground text-center">
                            Privacy Policy last updated: February 2026
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}