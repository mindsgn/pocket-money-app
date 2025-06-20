import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { Button } from "@/@src/components/ui/button";
import { Input } from "@/@src/components/ui/input";
import { Card, CardContent } from "@/@src/components/ui/card";
import { Badge } from "@/@src/components/ui/badge";

export default function Main() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Transform Your Business Today
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Turn One-Time Customers Into Loyal Brand Advocates
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Abakcus empowers small businesses with enterprise-level
                  loyalty programs. Increase repeat purchases by 40%, boost
                  customer lifetime value, and reduce acquisition costs—all
                  without the complexity.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">
                    500+ businesses waiting
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">
                    Early access program
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Loyalty Dashboard</h3>
                    <Badge className="bg-green-100 text-green-700">Live</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        847
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Members
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        R12.4k
                      </div>
                      <div className="text-sm text-gray-600">
                        Points Redeemed
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600">
                            JS
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">John Smith</div>
                          <div className="text-xs text-gray-500">
                            Gold Member
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">2,450 pts</div>
                        <div className="text-xs text-green-600">+150 today</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            MJ
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Maria Johnson
                          </div>
                          <div className="text-xs text-gray-500">
                            Silver Member
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">1,890 pts</div>
                        <div className="text-xs text-green-600">+75 today</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-lg shadow-lg">
                <div className="text-xs font-medium">+40% Repeat Sales</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg">
                <div className="text-xs font-medium">-60% Churn Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Small Business Challenge
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
              While big brands keep customers coming back with sophisticated
              loyalty programs, small businesses are left behind.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  High Customer Acquisition Costs
                </h3>
                <p className="text-gray-600 text-sm">
                  It costs 5-25x more to acquire new customers than to retain
                  existing ones, yet most SMBs focus only on acquisition.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Low Customer Retention
                </h3>
                <p className="text-gray-600 text-sm">
                  Without loyalty programs, businesses see 70% of customers
                  never return after their first purchase.
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Complex Solutions
                </h3>
                <p className="text-gray-600 text-sm">
                  Existing loyalty platforms are expensive, complex, and
                  designed for enterprises—not small businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="features"
        className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              The Abakcus Solution
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Enterprise-Level Loyalty, Small Business Simplicity
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
              Launch a professional loyalty program in minutes, not months. No
              technical expertise required.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Quick Setup & Launch
                  </h3>
                  <p className="text-gray-600">
                    Get your loyalty program running in under 10 minutes. No
                    coding, no complex integrations—just results.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Mobile-First Experience
                  </h3>
                  <p className="text-gray-600">
                    Your customers can earn and redeem points seamlessly on any
                    device, with a beautiful mobile interface.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Smart Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track customer behavior, measure program ROI, and get
                    actionable insights to grow your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Automated Engagement
                  </h3>
                  <p className="text-gray-600">
                    Send personalized rewards, birthday offers, and win-back
                    campaigns automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Measurable Results for Your Business
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
              Join hundreds of small businesses already seeing dramatic
              improvements in customer retention and revenue.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="text-center border-purple-200 bg-purple-50/50">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  40%
                </div>
                <div className="font-semibold text-lg mb-2">
                  Increase in Repeat Purchases
                </div>
                <p className="text-gray-600 text-sm">
                  Customers with loyalty points return 40% more often than those
                  without.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">25%</div>
                <div className="font-semibold text-lg mb-2">
                  Higher Average Order Value
                </div>
                <p className="text-gray-600 text-sm">
                  Loyalty members spend 25% more per transaction to earn more
                  points.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 bg-green-50/50">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  60%
                </div>
                <div className="font-semibold text-lg mb-2">
                  Reduction in Churn Rate
                </div>
                <p className="text-gray-600 text-sm">
                  {
                    "Keep customers engaged and reduce the likelihood they'll switch to competitors."
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Customer Relationships?
            </h2>
            <p className="text-xl text-purple-100">
              Join 500+ businesses on our waitlist and be among the first to
              launch your loyalty program.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-purple-200">
                  Businesses Waiting
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-purple-200">Beta Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
