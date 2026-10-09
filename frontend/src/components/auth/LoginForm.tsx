"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from "lucide-react";
import { loginSchema, type LoginInput } from "@/validators/auth.schema";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        try {
            const result = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                if (result.error.status === 429) {
                    toast.error("Too many attempts. Please wait before trying again.");
                } else {
                    toast.error("Invalid email or password.");
                }
                return;
            }

            toast.success("Welcome back!");
            router.push(callbackUrl);
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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

                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to your account to continue</p>

                {/* Social Auth */}
                <SocialAuthButtons />

                <div className="auth-divider">or continue with email</div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="login-email" className="form-label">Email address</label>
                        <div style={{ position: "relative" }}>
                            <Mail
                                size={16}
                                style={{
                                    left: 12,
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--color-text-muted)",
                                    pointerEvents: "none",
                                }}
                            />
                            <input
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                aria-invalid={!!errors.email}
                                style={{ paddingLeft: "2.375rem" }}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <span className="form-error">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label htmlFor="login-password" className="form-label">Password</label>
                            <Link
                                href="/forgot-password"
                                style={{ color: "var(--color-brand-primary)", fontSize: "0.8125rem" }}
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div style={{ position: "relative" }}>
                            <Lock
                                size={16}
                                style={{
                                    left: 12,
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--color-text-muted)",
                                    pointerEvents: "none",
                                }}
                            />
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Your password"
                                aria-invalid={!!errors.password}
                                style={{ paddingLeft: "2.375rem", paddingRight: "2.5rem" }}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--color-text-muted)",
                                    cursor: "pointer",
                                    padding: 0,
                                    position: "absolute",
                                    right: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="form-error">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        id="login-submit"
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={isLoading}
                        style={{ marginTop: "0.5rem", height: 44 }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="spinner" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" style={{ color: "var(--color-brand-primary)", fontWeight: 500 }}>
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}
