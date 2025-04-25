import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Code, Globe, Lock, BarChart, Shield, Menu, Activity, Clock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col mx-2">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-cx`enter justify-between py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">DynamicAPI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="#features" className="text-sm font-medium hover:text-primary">
                  Features
                </Link>
                <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                  Pricing
                </Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                  Testimonials
                </Link>
                <Link href="/docs" className="text-sm font-medium hover:text-primary">
                  Documentation
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button asChild variant="outline">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex rounded-md px-3 py-1 text-sm" variant="secondary">
                    Powerful API Management
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Build and manage APIs with ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DynamicAPI empowers you to dynamically route, secure, and scale your APIs—without the complexity. Focus on your business logic; we’ll handle the rest.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/docs">View Documentation</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Free For First 1k Customers</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="Dashboard preview"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        {/* <section className="w-full py-12 md:py-16 lg:py-20 border-y bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                  Trusted by innovative companies worldwide
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 grayscale opacity-70">
                Replace with actual company logos
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xl font-bold">ACME Inc</span>
                </div>
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xl font-bold">TechCorp</span>
                </div>
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xl font-bold">Globex</span>
                </div>
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xl font-bold">Initech</span>
                </div>
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xl font-bold">Umbrella</span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Everything you need to build powerful APIs
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to create, secure, and scale your APIs with minimal
                  effort.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Code className="h-10 w-10 text-primary" />}
                title="Dynamic Routing"
                description="Manage your API routes with a simple interface. No complex configuration required."
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-primary" />}
                title="Authentication"
                description="Secure your APIs with JWT, API keys etc. Flexible authentication for any use case."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Rate Limiting"
                description="Protect your APIs from abuse with configurable rate limiting and usage policies."
              />
              <FeatureCard
                icon={<Activity className="h-10 w-10 text-primary" />}
                title="Request Tracking"
                description="Monitor and analyze every user request in real-time. Gain insights, enforce limits, and ensure seamless API performance."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10 text-primary" />}
                title="Analytics & Monitoring"
                description="Real-time insights into your API usage, performance metrics, and error tracking."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Custom Caching"
                description="Optimize performance with per-route caching controls. Set custom cache limits for each API endpoint to balance speed and freshness."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                  How It Works
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Seamlessly Manage Your API Traffic
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  DynamicAPI intelligently routes, secures, and optimizes every request—so you can focus on your core application.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <StepCard
                number="01"
                title="Define Routes & Authentication"
                description="Register your API endpoints and configure authentication with client secrets for secure access."
              />
              <StepCard
                number="02"
                title="Enable Rate Limiting & Caching"
                description="Control API usage with per-route rate limits and optimize performance using customizable caching rules."
              />
              <StepCard
                number="03"
                title="Forward & Analyze Requests"
                description="Requests are securely forwarded to your server while DynamicAPI tracks analytics and ensures compliance."
              />
            </div>
          </div>
        </section>


        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                  Pricing
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Completely Free, No Limits
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  DynamicAPI is **100% free**—no hidden costs, no paywalls. Get started instantly and scale without worries.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-12">
              <PricingCard
                title="Free Forever"
                price="$0"
                description="Access all features with no restrictions. Perfect for developers, startups, and enterprises alike."
                features={[
                  "Unlimited API routes",
                  "No request limits",
                  "Advanced authentication & security",
                  "Real-time monitoring & analytics",
                  "Full caching & rate limiting controls",
                  "Community & email support",
                ]}
                buttonText="Get Started"
                buttonVariant="default"
              />
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by developers worldwide</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  See what our customers have to say about DynamicAPI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="DynamicAPI has completely transformed how we build and manage our APIs. What used to take days now takes minutes."
                author="Sarah Johnson"
                role="CTO at TechStart"
              />
              <TestimonialCard
                quote="The authentication and security features are top-notch. We've been able to focus on our core product instead of worrying about API infrastructure."
                author="Michael Chen"
                role="Lead Developer at DataFlow"
              />
              <TestimonialCard
                quote="As a solo developer, DynamicAPI has been a game-changer. I can build and deploy production-ready APIs without a team of backend engineers."
                author="Alex Rodriguez"
                role="Independent Developer"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="rounded-md px-3 py-1 text-sm" variant="secondary">
                  FAQ
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Find answers to common questions about DynamicAPI.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does DynamicAPI work?</AccordionTrigger>
                  <AccordionContent>
                    DynamicAPI acts as an intelligent API gateway that dynamically routes, secures, and optimizes API requests. 
                    Each request is authenticated, processed with rate limiting and caching (if enabled), and then forwarded 
                    to your backend while tracking analytics in real time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do I need to modify my existing backend?</AccordionTrigger>
                  <AccordionContent>
                    No, DynamicAPI works as a proxy between your clients and your backend. Simply register your API routes 
                    and configure authentication, rate limits, and caching—DynamicAPI handles the rest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does authentication work?</AccordionTrigger>
                  <AccordionContent>
                    Every request to your API must include a client secret for authentication. You can configure custom 
                    authentication settings for each route, ensuring only authorized users can access your services.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How does caching and rate limiting work?</AccordionTrigger>
                  <AccordionContent>
                    Each API route can have custom caching settings, allowing you to store responses and reduce redundant 
                    backend calls. You can also enforce per-route rate limits to prevent abuse and ensure fair usage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is DynamicAPI completely free?</AccordionTrigger>
                  <AccordionContent>
                    Yes! DynamicAPI is **100% free**—no request limits, no hidden costs. We believe in making API management 
                    accessible to everyone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to transform your API development?
                </h2>
                <p className="max-w-[700px] md:text-xl">
                  Join thousands of developers who are building better APIs faster with DynamicAPI.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                <span className="text-xl font-bold">DynamicAPI</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Building the future of API development. Create, secure, and scale your APIs with ease.
              </p>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2H2v10h10V2zM22 2h-8v10h8V2zM12 14H2v8h10v-8zM22 14h-8v8h8v-8z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DynamicAPI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
        {number}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-primary shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="ml-1 text-muted-foreground">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full" asChild>
          <Link href="/signup">{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 text-4xl">&#34;</div>
        <p className="mb-4 text-muted-foreground">{quote}</p>
        <div className="mt-6">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

