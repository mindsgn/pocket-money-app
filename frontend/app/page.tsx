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
import Header from "@/@src/components/header";

export default function VibeConnectLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-pink-50 to-to-pink-500">
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
                  <Link href="">
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
