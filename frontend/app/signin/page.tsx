import type { Metadata } from "next";
import Link from "next/link";
import SignInForm from "@/@src/components/signin";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | Vibe Connect",
  description: "Sign in to your Vibe Connect account to manage your loyalty program",
};

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-to-pink-500 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-2xl">VIBE CONNECT</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a secure sign-in link
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border">
          <SignInForm />
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            {"We'll never spam you or share your email address."}
            <br />
            <Link href="/privacy" className="underline hover:text-purple-600">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="/terms" className="underline hover:text-purple-600">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
