import type { Metadata } from "next"

import { RegisterForm } from "@/components/common/demo-forms"

export const metadata: Metadata = { title: "Create Account" }

export default function RegisterPage() {
  return (
    <div className="page-gutter flex justify-center py-12 lg:py-20">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-4xl lg:text-5xl">Join NOVA</h1>
        <p className="mt-3 mb-8 text-muted-foreground">
          This form only demonstrates validation. No account is created.
        </p>
        <RegisterForm />
      </div>
    </div>
  )
}
