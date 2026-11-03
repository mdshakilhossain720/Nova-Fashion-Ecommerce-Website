"use client"

import { useState, type ComponentProps, type ReactNode } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FieldError } from "@/components/common/bits"
import { Button } from "@/components/ui/button"
import { userProfile } from "@/data/content"
import { cn } from "@/lib/utils"
import { toast, useAuth } from "@/store"

/** Short pause so submitting feels like a real request. */
const fakeRequest = () => new Promise((resolve) => setTimeout(resolve, 600))

/** Only same-site paths are allowed, so `?next=` cannot send people off-site. */
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/account"
}

type FieldProps = {
  id: string
  label: string
  error?: string
  aside?: ReactNode
  inputClassName?: string
} & ComponentProps<"input">

function Field({
  id,
  label,
  error,
  aside,
  className,
  inputClassName,
  ...input
}: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm">
          {label}
        </label>
        {aside}
      </div>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn("field", inputClassName)}
        {...input}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

function PasswordField(props: Omit<FieldProps, "type">) {
  const [visible, setVisible] = useState(false)
  return (
    <div className={cn("relative", props.className)}>
      <Field
        {...props}
        className={undefined}
        inputClassName="pr-12"
        type={visible ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute top-[1.875rem] right-1 flex size-10 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {visible ? (
          <EyeOff className="size-4" aria-hidden />
        ) : (
          <Eye className="size-4" aria-hidden />
        )}
      </button>
    </div>
  )
}

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const signIn = useAuth((state) => state.signIn)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginValues) => {
    await fakeRequest()
    signIn(values.email)
    toast(`Welcome back, ${userProfile.firstName}`)
    router.push(next)
  }

  const fillDemo = () => {
    setValue("email", userProfile.email, { shouldValidate: true })
    setValue("password", "nova-demo", { shouldValidate: true })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="current-password"
        error={errors.password?.message}
        aside={
          <button
            type="button"
            onClick={() =>
              toast("Password reset isn't available in this demo store.")
            }
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </button>
        }
        {...register("password")}
      />

      <Button
        type="submit"
        size="cta"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In…" : "Sign In"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="cta"
        className="w-full"
        onClick={fillDemo}
      >
        Use Demo Account
      </Button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        New to NOVA?{" "}
        <Link
          href={next === "/account" ? "/register" : `/register?next=${encodeURIComponent(next)}`}
          className="text-foreground underline underline-offset-4 hover:text-gold-ink"
        >
          Create an account
        </Link>
      </p>
    </form>
  )
}

const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, "Please enter your first name"),
    lastName: z.string().trim().min(2, "Please enter your last name"),
    email: z.email("Please enter a valid email"),
    phone: z
      .string()
      .trim()
      .regex(/^01\d{9}$/, "Enter an 11-digit number starting with 01"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .regex(/\d/, "Include at least one number"),
    confirm: z.string(),
    terms: z.literal(true, "Please accept the terms to continue"),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  })

type RegisterValues = z.input<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const createAccount = useAuth((state) => state.register)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterValues) => {
    await fakeRequest()
    createAccount({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email,
      phone: values.phone.trim(),
    })
    toast(`Welcome to NOVA, ${values.firstName.trim()}. 200 points added.`)
    router.push(next)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="firstName"
          label="First name"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Field
          id="lastName"
          label="Last name"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Field
        id="phone"
        label="Phone number"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="01XXXXXXXXX"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        id="confirm"
        label="Confirm password"
        autoComplete="new-password"
        error={errors.confirm?.message}
        {...register("confirm")}
      />

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            className="mt-0.5 size-4 accent-[var(--gold-ink)]"
            {...register("terms")}
          />
          <span className="text-muted-foreground">
            I agree to the NOVA terms of service and privacy policy.
          </span>
        </label>
        <FieldError id="terms-error" message={errors.terms?.message} />
      </div>

      <Button
        type="submit"
        size="cta"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Account…" : "Create Account"}
      </Button>

      <p className="pt-2 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={next === "/account" ? "/login" : `/login?next=${encodeURIComponent(next)}`}
          className="text-foreground underline underline-offset-4 hover:text-gold-ink"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
