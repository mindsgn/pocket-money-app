"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/@src/components/ui/button";
import { Input } from "@/@src/components/ui/input";
import { Label } from "@/@src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/@src/components/ui/card";
import { Alert, AlertDescription } from "@/@src/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/@src/components/ui/select";
import { Textarea } from "@/@src/components/ui/textarea";
import {
  User,
  Building2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MapPin,
  Globe,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useSearchParams } from "next/navigation";

type OnboardingStep = "start" | "brief" | "resources" | "prize";

interface UserProfile {
  name: string;
}

interface BusinessProfile {
  businessName: string;
  businessType: string;
  businessAddress: string;
  website: string;
  description: string;
}

interface LoyaltyToken {
  tokenName: string;
  tokenSymbol: string;
  description: string;
}

const businessTypes = [
  "Restaurant",
  "Retail Store",
  "Service Business",
  "Health & Beauty",
  "Fitness & Wellness",
  "Professional Services",
  "Entertainment",
  "Other",
];

export default function OnboardingFlow() {
  const searchParams = useSearchParams();
  const { makeAuthenticatedRequest } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("start");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        setCurrentStep("start");
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeAuthenticatedRequest("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          ...userProfile,
        }),
      });

      if (response.ok) {
        setCurrentStep("brief");
        return;
      }

      throw Error("Failed to save profile. Please try again.");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeAuthenticatedRequest("/api/business", {
        method: "PUT",
        body: JSON.stringify({
          ...businessProfile,
        }),
      });

      if (response.ok) {
        console.log("Business profile saved:", businessProfile);
        setCurrentStep("resources");

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "onboarding_completed", {
            event_category: "user_journey",
            event_label: "business_setup",
          });
        }
        return;
      }

      // Track onboarding completion
      throw Error("Failed to save profile. Please try again.");
    } catch (err) {
      setError("Failed to save business profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard/contests";
  };

  const renderProgressBar = () => {
    const steps = [
      { key: "start", label: "Get Started", icon: User },
      { key: "brief", label: "Create Brief", icon: Building2 },
      { key: "resources", label: "Resources", icon: CheckCircle },
      { key: "prize", label: "Prize", icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex((step) => step.key === currentStep);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-2 mr-4">
                <div
                  className={`text-sm font-medium ${isCompleted || isActive ? "text-gray-900" : "text-gray-400"}`}
                >
                  {step.label}
                </div>
              </div>
              {!isLast && (
                <div
                  className={`w-12 h-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-300"} mr-4`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeAuthenticatedRequest("/api/token", {
        method: "POST",
        body: JSON.stringify({
          ...loyaltyToken,
        }),
      });

      if (response.ok) {
        // setCurrentStep("complete");

        // Track token creation completion
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "token_created", {
            event_category: "onboarding",
            event_label: "loyalty_token",
            token_symbol: loyaltyToken.tokenSymbol,
          });
        }
        return;
      }
      throw new Error("Failed to create loyalty token. Please try again.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create loyalty token. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderProgressBar()}

        {/* Profile Step */}
        {currentStep === "start" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                Personal Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Tell us a bit about yourself
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </Label>
                  <Input
                    title={"input-name"}
                    id="name"
                    type="text"
                    required
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                    className="mt-1 h-12"
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  title={"button-submit-name"}
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-500 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Business Step */}
        {currentStep === "brief" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-pink-500" />
                Business Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Set up your business profile for your loyalty program
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBusinessSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Name *
                  </Label>
                  <Input
                    title={"input-business-name"}
                    id="businessName"
                    type="text"
                    required
                    value={businessProfile.businessName}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        businessName: e.target.value,
                      })
                    }
                    className="mt-1 h-12"
                    placeholder="Enter your business name"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Type *
                  </Label>
                  <Select
                    value={businessProfile.businessType}
                    onValueChange={(value) =>
                      setBusinessProfile({
                        ...businessProfile,
                        businessType: value,
                      })
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger className="mt-1 h-12">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="businessAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Address
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      title={"input-business-address"}
                      id="businessAddress"
                      type="text"
                      value={businessProfile.businessAddress}
                      onChange={(e) =>
                        setBusinessProfile({
                          ...businessProfile,
                          businessAddress: e.target.value,
                        })
                      }
                      className="h-12 pl-10"
                      placeholder="123 Main St, City, State"
                      disabled={isLoading}
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Website
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      title={"input-business-website"}
                      id="website"
                      type="url"
                      value={businessProfile.website}
                      onChange={(e) =>
                        setBusinessProfile({
                          ...businessProfile,
                          website: e.target.value,
                        })
                      }
                      className="h-12 pl-10"
                      placeholder="https://yourbusiness.com"
                      disabled={isLoading}
                    />
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Description
                  </Label>
                  <Textarea
                    title={"input-business-description"}
                    id="description"
                    value={businessProfile.description}
                    onChange={(e) =>
                      setBusinessProfile({
                        ...businessProfile,
                        description: e.target.value,
                      })
                    }
                    className="mt-1"
                    placeholder="Tell us about your business..."
                    rows={3}
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("start")}
                    className="flex-1 h-12"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    title={"button-submit-business"}
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-500 hover:to-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
