"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield, User } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/validators/auth.schema";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SocialAuthButtons } from "./SocialAuthButtons";

function getPasswordStrength(password: string): number {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "active-weak", "active-fair", "active-good", "active-strong"];

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [watchedPassword, setWatchedPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    // Watch password for strength indicator
    const passwordValue = watch("password", "");
    const strength = getPasswordStrength(passwordValue);

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true);
        try {
            const result = await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            });

            if (result.error) {
                if (result.error.status === 429) {
                    toast.error("Too many attempts. Please wait before trying again.");
                } else if (result.error.code === "USER_ALREADY_EXISTS") {
                    toast.error("An account with this email already exists.");
                } else {
                    toast.error(result.error.message || "Registration failed. Please try again.");
                }
                return;
            }

            toast.success("Account created! Please check your email to verify your account.");
            router.push("/login");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    void watchedPassword; // suppress unused warning

    return (
        <div className="auth-layout">
            <div className="auth-card">
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">
                        <Shield size={20} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)" }}>
                        Auth Lifecycle Kit
                    </span>
                </div>

                <h1 className="auth-title">Create an account</h1>
                <p className="auth-subtitle">Start your journey — it&apos;s completely free</p>

                {/* Social Auth */}
                <SocialAuthButtons />

                <div className="auth-divider">or register with email</div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="register-name" className="form-label">Full name</label>
                        <div style={{ position: "relative" }}>
                            <User
                                size={16}
                                style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }}
                            />
                            <input
                                id="register-name"
                                type="text"
                                autoComplete="name"
                                placeholder="John Doe"
                                aria-invalid={!!errors.name}
                                style={{ paddingLeft: "2.375rem" }}
                                {...register("name")}
                            />
                        </div>
                        {errors.name && <span className="form-error">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="register-email" className="form-label">Email address</label>
                        <div style={{ position: "relative" }}>
                            <Mail
                                size={16}
                                style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }}
                            />
                            <input
                                id="register-email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                aria-invalid={!!errors.email}
                                style={{ paddingLeft: "2.375rem" }}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="register-password" className="form-label">Password</label>
                        <div style={{ position: "relative" }}>
                            <Lock
                                size={16}
                                style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }}
                            />
                            <input
                                id="register-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                aria-invalid={!!errors.password}
                                style={{ paddingLeft: "2.375rem", paddingRight: "2.5rem" }}
                                {...register("password", {
                                    onChange: (e) => setWatchedPassword(e.target.value),
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", padding: 0, position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordValue && (
                            <>
                                <div className="password-strength">
                                    {[1, 2, 3, 4].map((bar) => (
                                        <div
                                            key={bar}
                                            className={`password-strength-bar ${bar <= strength ? strengthColors[strength] : ""}`}
                                        />
                                    ))}
                                </div>
                                <span className="form-hint" style={{ fontSize: "0.8rem" }}>
                                    Password strength: {strengthLabels[strength]}
                                </span>
                            </>
                        )}

                        {errors.password && <span className="form-error">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="register-confirm" className="form-label">Confirm password</label>
                        <div style={{ position: "relative" }}>
                            <Lock
                                size={16}
                                style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }}
                            />
                            <input
                                id="register-confirm"
                                type={showConfirm ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                aria-invalid={!!errors.confirmPassword}
                                style={{ paddingLeft: "2.375rem", paddingRight: "2.5rem" }}
                                {...register("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                                style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", padding: 0, position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword.message}</span>}
                    </div>

                    <button
                        id="register-submit"
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={isLoading}
                        style={{ marginTop: "0.5rem", height: 44 }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="spinner" />
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?{" "}
                    <Link href="/login" style={{ color: "var(--color-brand-primary)", fontWeight: 500 }}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
