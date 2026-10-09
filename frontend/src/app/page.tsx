import Link from "next/link";

export default function HomePage() {
    return (
        <div className="auth-layout" style={{ display: "block", padding: 0 }}>
            {/* Hero Section */}
            <section
                style={{
                    alignItems: "center",
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(99,102,241,0.18) 0%, transparent 65%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "100dvh",
                    padding: "4rem 1.5rem",
                    textAlign: "center",
                }}
            >
                {/* Badge */}
                <div
                    style={{
                        background: "rgba(99,102,241,0.12)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        borderRadius: "9999px",
                        color: "#818cf8",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        marginBottom: "2rem",
                        padding: "0.375rem 1rem",
                    }}
                >
                    <span
                        style={{
                            background: "#22c55e",
                            borderRadius: "50%",
                            display: "inline-block",
                            height: 6,
                            width: 6,
                        }}
                    />
                    Production-ready · Open Source · MIT License
                </div>

                {/* Logo */}
                <div
                    style={{
                        alignItems: "center",
                        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        borderRadius: 16,
                        display: "inline-flex",
                        height: 64,
                        justifyContent: "center",
                        marginBottom: "1.75rem",
                        width: 64,
                        boxShadow: "0 0 40px rgba(99,102,241,0.4)",
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>

                {/* Headline */}
                <h1
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.1,
                        marginBottom: "1.25rem",
                        maxWidth: 700,
                    }}
                >
                    Auth{" "}
                    <span className="text-gradient">Lifecycle</span>
                    {" "}Kit
                </h1>

                <p
                    style={{
                        color: "#a1a1aa",
                        fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        maxWidth: 560,
                    }}
                >
                    A complete, production-ready authentication baseline. Clone,
                    configure, and integrate in under 15 minutes.
                </p>

                {/* CTAs */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        justifyContent: "center",
                    }}
                >
                    <Link href="/register" className="btn btn-primary btn-lg">
                        Get Started Free
                    </Link>
                    <Link href="/login" className="btn btn-secondary btn-lg">
                        Sign In
                    </Link>
                </div>

                {/* Tech stack pills */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.625rem",
                        justifyContent: "center",
                        marginTop: "3rem",
                    }}
                >
                    {["Next.js 16", "Better Auth", "PostgreSQL", "Upstash Redis", "Resend", "Zod", "Vitest", "Playwright"].map(
                        (tech) => (
                            <span
                                key={tech}
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid #27272a",
                                    borderRadius: "6px",
                                    color: "#71717a",
                                    fontSize: "0.8125rem",
                                    padding: "0.3rem 0.75rem",
                                }}
                            >
                                {tech}
                            </span>
                        )
                    )}
                </div>
            </section>

            {/* Feature Grid */}
            <section
                style={{
                    background: "#111113",
                    borderTop: "1px solid #1f1f22",
                    padding: "5rem 1.5rem",
                }}
            >
                <div style={{ maxWidth: 960, margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            marginBottom: "0.75rem",
                            textAlign: "center",
                        }}
                    >
                        Everything you need,{" "}
                        <span className="text-gradient">nothing you don&apos;t</span>
                    </h2>
                    <p
                        style={{
                            color: "#71717a",
                            fontSize: "1rem",
                            marginBottom: "3.5rem",
                            textAlign: "center",
                        }}
                    >
                        Covering the complete user lifecycle with security at every layer.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gap: "1rem",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        }}
                    >
                        {features.map((feat) => (
                            <div key={feat.title} className="card" style={{ display: "flex", gap: "1rem" }}>
                                <div
                                    style={{
                                        alignItems: "center",
                                        background: feat.iconBg,
                                        borderRadius: 10,
                                        display: "flex",
                                        flexShrink: 0,
                                        height: 40,
                                        justifyContent: "center",
                                        width: 40,
                                    }}
                                >
                                    <span style={{ fontSize: "1.25rem" }}>{feat.icon}</span>
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            color: "#f4f4f5",
                                            fontSize: "0.9375rem",
                                            fontWeight: 600,
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {feat.title}
                                    </h3>
                                    <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: 1.6 }}>
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section
                style={{
                    background: "var(--color-bg-base)",
                    borderTop: "1px solid #1f1f22",
                    padding: "4rem 1.5rem",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Ready to get started?
                </h2>
                <p style={{ color: "#71717a", marginBottom: "2rem" }}>
                    Create your account and explore the full authentication lifecycle.
                </p>
                <Link href="/register" className="btn btn-primary btn-lg">
                    Create Account →
                </Link>
            </section>
        </div>
    );
}

const features = [
    {
        icon: "🔐",
        iconBg: "rgba(99,102,241,0.15)",
        title: "Email & Password Auth",
        desc: "Secure registration and login with bcrypt hashing and mandatory email verification.",
    },
    {
        icon: "🌐",
        iconBg: "rgba(6,182,212,0.15)",
        title: "OAuth 2.0 (Google & GitHub)",
        desc: "Social login with PKCE flow, CSRF protection, and automatic account linking.",
    },
    {
        icon: "📱",
        iconBg: "rgba(34,197,94,0.15)",
        title: "Session & Device Management",
        desc: "View all active sessions with IP and device info. Revoke specific or all other sessions.",
    },
    {
        icon: "📧",
        iconBg: "rgba(245,158,11,0.15)",
        title: "Transactional Emails",
        desc: "Branded verification and password reset emails via Resend with expiring tokens.",
    },
    {
        icon: "🛡️",
        iconBg: "rgba(239,68,68,0.15)",
        title: "Rate Limiting",
        desc: "Sliding-window rate limiting via Upstash Redis. Brute-force and DDoS protection.",
    },
    {
        icon: "🔑",
        iconBg: "rgba(168,85,247,0.15)",
        title: "Two-Factor Auth (TOTP)",
        desc: "Optional 2FA via TOTP with QR code setup and encrypted backup codes.",
    },
    {
        icon: "👤",
        iconBg: "rgba(99,102,241,0.12)",
        title: "Profile Management",
        desc: "Update profile details, change password with current password validation.",
    },
    {
        icon: "🗑️",
        iconBg: "rgba(239,68,68,0.12)",
        title: "Account Deletion",
        desc: "Permanent account deletion with cascading session and data cleanup.",
    },
];
