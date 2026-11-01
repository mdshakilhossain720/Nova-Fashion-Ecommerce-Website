import type { Metadata } from "next"

import { LoginForm } from "@/components/common/demo-forms"

export const metadata: Metadata = { title: "Sign In" }

export default function LoginPage() {
  return (
    <div className="page-gutter flex justify-center py-12 lg:py-20">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-4xl lg:text-5xl">Welcome Back</h1>
        <p className="mt-3 mb-8 text-muted-foreground">
          Demo sign-in: any valid email and a password of 6 or more characters
          will work.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
