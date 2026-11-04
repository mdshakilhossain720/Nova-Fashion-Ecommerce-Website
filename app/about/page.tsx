import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Gem,
  HeartHandshake,
  ShieldCheck,
  Tag,
  Target,
  Truck,
  type LucideIcon,
} from "lucide-react"

import { StatCounter } from "@/components/about/stat-counter"
import { SectionHeading, Stars } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { buttonVariants } from "@/components/ui/button"
import { brandStats, milestones, team, testimonials } from "@/data/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind NOVA: considered fashion, home and fragrance made for modern Bangladesh.",
}

const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make beautifully made clothing, fragrance and homeware easy to find, fair to buy and a pleasure to own.",
  },
  {
    icon: Compass,
    title: "Our Vision",
    text: "To be the first place modern Bangladesh looks for quality, where heritage craft and everyday style sit side by side.",
  },
  {
    icon: Gem,
    title: "Our Values",
    text: "Honest pricing, natural materials, respect for the makers we work with, and care at every step of your order.",
  },
]

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Gem,
    title: "Premium Quality",
    text: "Natural fabrics, careful finishing and pieces tested to last wash after wash.",
  },
  {
    icon: Tag,
    title: "Affordable Prices",
    text: "Fair, transparent pricing with no inflated mark-ups before a sale.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "1–2 days inside Dhaka, 3–5 days nationwide, and free over ৳2,000.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Shopping",
    text: "Cash on delivery across all 64 districts and an easy 7-day exchange.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    text: "A real team that answers every message, seven days a week.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-title"
        className="relative isolate flex h-[78svh] max-h-[860px] min-h-[560px] items-end overflow-hidden text-white"
      >
        <SmartImage
          src="/images/hero-season.webp"
          alt=""
          priority
          sizes="100vw"
          className="-z-10 object-[62%_30%]"
        />
        <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="page-gutter pt-32 pb-14 lg:pb-24">
          <p className="mb-4 text-[0.6875rem] font-medium tracking-[0.22em] text-gold uppercase">
            About NOVA
          </p>
          <h1
            id="about-title"
            className="max-w-3xl font-heading text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Discover Our Story
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 lg:text-xl">
            More than shopping, it&apos;s an experience.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className={buttonVariants({ size: "cta", variant: "gold" })}
            >
              Explore Collection
              <ArrowRight aria-hidden />
            </Link>
            <a
              href="#journey"
              className={cn(
                buttonVariants({ size: "cta", variant: "outline" }),
                "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/50 dark:bg-transparent"
              )}
            >
              Our Journey
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="py-14 lg:py-28">
        <div className="page-gutter grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
              <SmartImage
                src="/images/store.webp"
                alt="Rails of shirts and jackets inside a softly lit NOVA studio"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 left-4 rounded-sm bg-background p-5 shadow-lg sm:-right-6 sm:left-auto lg:p-6">
              <p className="font-heading text-4xl text-gold-ink">2019</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Founded in Dhaka
              </p>
            </div>
          </div>
          <div className="pt-6 lg:pt-0">
            <p className="eyebrow mb-3">Our story</p>
            <h2
              id="story-title"
              className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Made With Care, Worn With Confidence
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                NOVA started in a small Dhaka studio with a simple idea: the
                clothes you wear every day deserve the same care as the ones you
                save for special occasions.
              </p>
              <p>
                We design in-house, choose natural fabrics and work closely with
                local makers, from handloom weavers in Tangail to the perfumers
                who blend our alcohol-free attars. Every piece is made in small
                batches, so quality never gets lost in the rush.
              </p>
              <p>
                Today NOVA brings fashion, fragrance and home together in one
                calm, considered store, delivered to your door anywhere in
                Bangladesh.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Designed in Dhaka",
                "Natural, breathable fabrics",
                "Small-batch production",
                "Fairly paid local makers",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm">
                  <BadgeCheck
                    className="size-4 shrink-0 text-gold-ink"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-label="Mission, vision and values"
        className="bg-surface py-14 lg:py-24"
      >
        <div className="page-gutter">
          <SectionHeading
            eyebrow="What drives us"
            title="Mission, Vision & Values"
          />
          <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className="relative flex flex-col rounded-sm bg-background p-7 lg:p-9"
              >
                <span className="absolute top-6 right-7 font-heading text-5xl text-foreground/[0.06]">
                  0{index + 1}
                </span>
                <span className="flex size-12 items-center justify-center rounded-full bg-gold/15">
                  <Icon className="size-5 text-gold-ink" aria-hidden />
                </span>
                <h3 className="mt-6 font-heading text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Why choose us" className="py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="The NOVA promise"
            title="Why Choose Us"
            description="Five things we never compromise on, from the first stitch to your doorstep."
          />
          <ul className="grid gap-px overflow-hidden rounded-sm border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group bg-background p-6 transition-colors hover:bg-surface lg:p-7"
              >
                <Icon
                  className="size-6 text-gold-ink transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                <h3 className="mt-5 font-heading text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label="NOVA in numbers"
        className="bg-[#171717] text-[#f5f4f1]"
      >
        <div className="page-gutter py-14 lg:py-20">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {brandStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col px-2 text-center lg:border-l lg:border-white/10 lg:first:border-l-0"
              >
                <dt className="order-2 mt-2 text-xs tracking-[0.16em] text-white/65 uppercase">
                  {stat.label}
                </dt>
                <dd className="font-heading text-4xl text-gold sm:text-5xl lg:text-6xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="journey"
        aria-labelledby="journey-title"
        className="scroll-mt-24 py-14 lg:py-28"
      >
        <div className="page-gutter">
          <div className="mb-12 text-center lg:mb-16">
            <p className="eyebrow mb-3">Since 2019</p>
            <h2
              id="journey-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl"
            >
              Our Journey
            </h2>
          </div>
          <ol className="relative mx-auto max-w-4xl before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-border md:before:left-1/2">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.year}
                className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 size-[15px] rounded-full border-4 border-background bg-gold-ink ring-1 ring-gold-ink md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={cn(
                    index % 2 === 0
                      ? "md:col-start-1 md:text-right"
                      : "md:col-start-2"
                  )}
                >
                  <p className="font-heading text-3xl text-gold-ink lg:text-4xl">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-lg font-medium">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {milestone.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Our team" className="bg-surface py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="The people behind NOVA"
            title="Meet Our Team"
            description="A small, close-knit team of designers, buyers and carers who look after every detail."
          />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {team.map((member) => (
              <li key={member.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                  <SmartImage
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    style={{ objectPosition: member.focus }}
                    className="grayscale-[35%] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-4 font-heading text-xl lg:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Customer testimonials" className="py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="In their words"
            title="What Our Customers Say"
          />
          <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {testimonials.map((item) => (
              <li key={item.id}>
                <figure className="flex h-full flex-col rounded-sm bg-surface p-7 transition-shadow hover:shadow-lg lg:p-8">
                  <Stars value={item.rating} />
                  <blockquote className="mt-5 flex-1 font-heading text-xl leading-relaxed">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t pt-5">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-muted">
                      {item.image && (
                        <SmartImage
                          src={item.image}
                          alt=""
                          sizes="256px"
                          style={{
                            objectPosition: item.focus,
                            transformOrigin: item.focus,
                            transform: `scale(${item.zoom ?? 1})`,
                          }}
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {item.city}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-success">
                      <BadgeCheck className="size-3.5" aria-hidden />
                      Verified
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cta-title"
        className="relative isolate overflow-hidden text-white"
      >
        <SmartImage
          src="/images/rack-neutral.webp"
          alt=""
          sizes="100vw"
          className="-z-10"
        />
        <span className="absolute inset-0 -z-10 bg-black/60" />
        <div className="page-gutter flex flex-col items-center py-20 text-center lg:py-32">
          <p className="mb-4 text-[0.6875rem] font-medium tracking-[0.22em] text-gold uppercase">
            Join {brandStats[0].value.toLocaleString("en-US")}
            {brandStats[0].suffix} happy customers
          </p>
          <h2
            id="cta-title"
            className="max-w-2xl font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            Experience Shopping Differently
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            New arrivals every week, cash on delivery nationwide and a 7-day
            exchange on every order.
          </p>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "cta", variant: "light" }),
              "mt-9"
            )}
          >
            Shop Now
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
