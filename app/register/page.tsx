import { Suspense } from "react"
import type { Metadata } from "next"

import { RegisterForm } from "@/components/common/demo-forms"

export const metadata: Metadata = { title: "Create Account" }

export default function RegisterPage() {
  return (
    <div className="page-gutter flex justify-center py-12 lg:py-20">
      <div className="w-full max-w-md">
        <p className="eyebrow mb-4">My Account</p>
        <h1 className="font-heading text-4xl lg:text-5xl">Join NOVA</h1>
        <p className="mt-3 mb-8 text-muted-foreground">
          Demo only: your details are saved in this browser and never sent
          anywhere. New members get 200 NOVA points.
        </p>
        <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-sm bg-surface" />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  )
}
