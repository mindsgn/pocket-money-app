import { Button } from "@/@src/components/ui/button";
import { Card, CardContent } from "@/@src/components/ui/card";
import { Badge } from "@/@src/components/ui/badge";
import {
  Users,
  Zap,
  Target,
  Shield,
  DollarSign,
  TrendingUp,
  Camera,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VibeConnectLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">
            Vibe Connect
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    🇿🇦 Proudly South African
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Vibe Connect: Your Gateway to Authentic{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                      South African Content
                    </span>{" "}
                    & Creators
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Seamlessly connect brands with local talent to generate
                    powerful User-Generated Content and amplify your social
                    impact.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      For Brands: Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/signin">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      For Creators: Join Now
                      <Camera className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="South African creators and brands collaborating"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  The Challenge
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Brands struggle to find authentic local creators who
                      understand their audience
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                     {"Content creators can't easily discover paid collaboration opportunities"}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">
                      Complex negotiations and unclear content rights create
                      friction
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                  Our Solution
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-600">
                      Bridges the gap between brands and creators with smart
                      matching
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-600">
                      Simplifies collaboration with streamlined workflows and
                      clear agreements
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <p className="text-gray-600">
                      Ensures fair value for all parties with transparent
                      pricing and secure payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple steps to connect, create, and succeed
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-orange-100 text-orange-800">
                    For Brands
                  </Badge>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <p className="text-gray-700 font-medium">
                        Create your UGC campaign with clear briefs and budgets
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <p className="text-gray-700 font-medium">
                        Discover and connect with verified local creators
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <p className="text-gray-700 font-medium">
                        Receive amazing UGC with full content rights
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    For Creators
                  </Badge>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <p className="text-gray-700 font-medium">
                        Browse and apply for exciting brand collaborations
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <p className="text-gray-700 font-medium">
                        Create authentic content that showcases your talent
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <p className="text-gray-700 font-medium">
                        Get paid fairly and grow your creator portfolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width="500"
                  height="400"
                  alt="How Vibe Connect works"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                Why Choose Vibe Connect?
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Unlock the power of authentic South African content creation
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {/* For Brands */}
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <Badge className="bg-orange-100 text-orange-800 mb-4">
                    For Brands
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Amplify Your Brand Authentically
                  </h3>
                </div>
                <div className="grid gap-4">
                  <Card className="border-orange-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Users className="w-8 h-8 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Access Diverse Local Talent
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Connect with creators who truly understand South
                          African culture and your target audience
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Zap className="w-8 h-8 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Drive Authentic Engagement
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Generate content that resonates with local audiences
                          and builds genuine connections
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Target className="w-8 h-8 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cost-Effective UGC Campaigns
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Maximize your marketing budget with efficient creator
                          partnerships and measurable results
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Shield className="w-8 h-8 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Secure Content Rights
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Clear agreements ensure you own the content and can
                          use it across all your marketing channels
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* For Creators */}
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <Badge className="bg-blue-100 text-blue-800 mb-4">
                    For Creators
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Monetize Your Creative Passion
                  </h3>
                </div>
                <div className="grid gap-4">
                  <Card className="border-blue-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Camera className="w-8 h-8 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Discover Paid Opportunities
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Access a curated marketplace of brand collaborations
                          that match your style and interests
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <TrendingUp className="w-8 h-8 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Showcase Your Portfolio
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Build a professional profile that highlights your
                          unique creative voice and past successes
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <DollarSign className="w-8 h-8 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Earn Fairly
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {"Transparent pricing and secure payments ensure you're compensated fairly for your creative work"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-100">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <Heart className="w-8 h-8 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Grow Your Reach
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Partner with established brands to expand your
                          audience and build lasting professional relationships
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-green-50"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                What Our Community Says
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {"Real stories from brands and creators who've found success with Vibe Connect"}
              </p>
            </div>
           
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Ready to Vibe? Sign Up Today!
              </h2>
              <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the growing community of South African brands and creators
                making authentic connections
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signin">
                  <Button
                    size="lg"
                    className="bg-white text-orange-500 hover:bg-gray-100"
                  >
                    For Brands: Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-orange-500"
                  >
                    For Creators: Join Now
                    <Camera className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Vibe Connect. Connecting South African brands and creators.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs hover:underline underline-offset-4 text-gray-600"
          >
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  );
}
