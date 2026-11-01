"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FieldError } from "@/components/common/bits"
import { Button } from "@/components/ui/button"
import { toast } from "@/store"

const schema = z.object({
  email: z.email("Please enter a valid email address"),
})

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {
        toast("You're on the list. This is a demo, so no email was stored.")
        reset()
      })}
      className="w-full max-w-md"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="min-w-0 flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-error" : undefined}
            className="field"
            {...register("email")}
          />
        </div>
        <Button type="submit" size="cta">
          Subscribe
        </Button>
      </div>
      <FieldError id="newsletter-error" message={errors.email?.message} />
    </form>
  )
}
