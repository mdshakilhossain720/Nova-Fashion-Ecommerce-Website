import type { Metadata } from "next"
import {
  CalendarClock,
  Cookie,
  Database,
  Lock,
  Mail,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from "lucide-react"

import { Breadcrumbs } from "@/components/common/bits"
import { PolicyToc } from "@/components/privacy/policy-toc"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NOVA collects, uses and protects your personal information.",
}

const lastUpdated = "2026-11-01"

const sections: {
  id: string
  title: string
  icon: LucideIcon
  intro: string
  points?: string[]
  outro?: string
}[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: Database,
    intro:
      "We only collect the information we need to run the store, deliver your orders and look after your account.",
    points: [
      "Account details: your name, email address, phone number and password.",
      "Order details: delivery addresses, the items you buy and how you choose to pay.",
      "Communication: messages you send to our customer care team and your newsletter preferences.",
      "Device and usage data: browser type, pages visited and approximate location, collected automatically.",
    ],
    outro:
      "We never store full card numbers. Card payments are handled directly by our payment provider.",
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    icon: Sparkles,
    intro: "We use your information to:",
    points: [
      "Process, deliver and keep you updated on your orders.",
      "Manage your account, wishlist and NOVA Rewards points.",
      "Answer questions and handle exchanges or returns.",
      "Send offers and new arrivals, only if you have opted in.",
      "Improve our website, prevent fraud and meet legal requirements.",
    ],
    outro: "We do not sell your personal information to anyone.",
  },
  {
    id: "cookies-policy",
    title: "Cookies Policy",
    icon: Cookie,
    intro:
      "Cookies are small files stored on your device that help the website work and remember your choices.",
    points: [
      "Essential cookies keep your bag, sign-in and checkout working.",
      "Preference cookies remember settings such as light or dark theme.",
      "Analytics cookies tell us, anonymously, which pages are most useful.",
    ],
    outro:
      "You can block or delete cookies in your browser settings, though some parts of the store may stop working properly.",
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    intro:
      "We take reasonable technical and organisational steps to protect your information from loss, misuse and unauthorised access.",
    points: [
      "All data is sent over encrypted HTTPS connections.",
      "Passwords are stored in hashed form, never as plain text.",
      "Only trained staff who need it can access customer data.",
      "We keep data only as long as needed for orders, accounts and legal records.",
    ],
    outro:
      "No system is completely secure, so please keep your password private and let us know straight away if you notice anything unusual.",
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    icon: Share2,
    intro:
      "We share information only with trusted partners who help us run the store, and only what they need to do their job.",
    points: [
      "Courier partners, to deliver your orders.",
      "Payment providers, for card and mobile banking payments.",
      "Email and SMS services, to send order updates.",
      "Analytics tools, to understand how the website is used.",
    ],
    outro:
      "These partners must keep your information secure and may not use it for their own marketing.",
  },
  {
    id: "user-rights",
    title: "Your Rights",
    icon: UserCheck,
    intro: "You stay in control of your personal information. You can:",
    points: [
      "Access and download a copy of the data we hold about you.",
      "Correct details that are wrong or out of date.",
      "Ask us to delete your account and personal data.",
      "Unsubscribe from marketing emails or SMS at any time.",
      "Object to or limit certain types of processing.",
    ],
    outro:
      "To use any of these rights, contact us and we will respond within 30 days.",
  },
  {
    id: "policy-changes",
    title: "Changes to This Policy",
    icon: CalendarClock,
    intro:
      "We may update this policy from time to time. The date at the top of this page shows when it last changed, and we will tell you by email about any important changes.",
  },
  {
    id: "contact-us",
    title: "Contact Us",
    icon: Mail,
    intro:
      "If you have any questions about this policy or how we handle your data, email privacy@nova.example or call 01700-000000, seven days a week.",
  },
]

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-surface">
        <div className="page-gutter py-8 lg:py-14">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          <div className="mt-6 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-gold/15">
              <ShieldCheck className="size-5 text-gold-ink" aria-hidden />
            </span>
            <p className="eyebrow">Legal</p>
          </div>
          <h1 className="mt-4 font-heading text-4xl leading-tight lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground lg:text-lg">
            Your trust matters to us. This policy explains what information NOVA
            collects, why we collect it and how we keep it safe.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground">
            <CalendarClock className="size-3.5 text-gold-ink" aria-hidden />
            Last updated:{" "}
            <time dateTime={lastUpdated} className="text-foreground">
              {formatDate(lastUpdated)}
            </time>
          </p>
        </div>
      </header>

      <div className="page-gutter grid gap-10 py-10 lg:grid-cols-[260px_1fr] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-sm border p-5 lg:border-0 lg:p-0">
            <PolicyToc
              items={sections.map(({ id, title }) => ({ id, title }))}
            />
          </div>
        </aside>

        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            This policy applies to the NOVA website and to any order you place
            with us. By using the store, you agree to the practices described
            below. NOVA is a demo storefront, so no real orders, payments or
            accounts are processed.
          </p>

          {sections.map(
            ({ id, title, icon: Icon, intro, points, outro }, index) => (
              <section
                key={id}
                id={id}
                aria-labelledby={`${id}-title`}
                className="scroll-mt-28 border-t pt-10 first-of-type:mt-10 [&:not(:first-of-type)]:mt-12"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <Icon className="size-5 text-gold-ink" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${id}-title`}
                      className="font-heading text-2xl leading-tight lg:text-3xl"
                    >
                      {title}
                    </h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground sm:pl-15">
                  <p>{intro}</p>
                  {points && (
                    <ul className="space-y-2.5">
                      {points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-ink"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {outro && <p className="text-foreground">{outro}</p>}
                </div>
              </section>
            )
          )}

          <div className="mt-14 flex flex-col items-start gap-5 rounded-sm bg-surface p-7 sm:flex-row sm:items-center sm:justify-between lg:p-9">
            <div>
              <h2 className="font-heading text-2xl">Still have questions?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Our team is happy to explain how we look after your data.
              </p>
            </div>
            <a
              href="mailto:privacy@nova.example"
              className={buttonVariants({ size: "cta" })}
            >
              <Mail aria-hidden />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
