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
  User,
  Building2,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import SelectDropDown from "./select";
import { nanoid } from 'nanoid'

type OnboardingStep = "start" | "brief" | "resources" | "prize";

interface Details {
  title: string;
  industry?: string [];
}

const businessTypes = [
  "Apparel & Fashion",
  "Beauty & Cosmetics",
  "Child & Baby Products",
  "Finance & Insurance",
  "Eductation & Training",
  "Dating",
  "Food & Beverage",
  "Games & Toys",
  "Health & Wellness",
  "Home & Garden",
  "Pets & Animals",
  "Real Estate",
  "Sports & Fitness",
  "Technology & Gadgets",
  "Travel & Hospitality",
  "Other",
];

export default function OnboardingFlow() {
  const formID = nanoid() 
  const { makeAuthenticatedRequest } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("start");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<Details>({
    title:"",
    industry: [],
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

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeAuthenticatedRequest("/api/contests", {
        method: "PUT",
        body: JSON.stringify({
          formID,
          step: "start",
          ...details,
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

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await makeAuthenticatedRequest("/api/contests", {
        method: "PUT",
        body: JSON.stringify({
          formID,
          step: "start",
          ...details,
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
                Customize your Contest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add Contest Title
                  </Label>
                  <Input
                    title={"input-name"}
                    id="name"
                    type="text"
                    required
                    value={details.title}
                    onChange={(e) =>
                      setDetails({ ...details, title: e.target.value })
                    }
                    className="mt-1 h-12"
                    placeholder="Add Contest Title"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose Industry
                  </Label>
                  <SelectDropDown
                    label="Select Industry"
                    types={businessTypes}
                    onChange={(value) =>
                      setDetails({ ...details, industry: [value] })
                    }/>
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

        {/*Brief Step*/}
        {currentStep === "brief" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                Customize your Contest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add Contest Title
                  </Label>
                  <Input
                    title={"input-name"}
                    id="name"
                    type="text"
                    required
                    value={details.title}
                    onChange={(e) =>
                      setDetails({ ...details, title: e.target.value })
                    }
                    className="mt-1 h-12"
                    placeholder="Add Contest Title"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose Industry
                  </Label>
                  <SelectDropDown
                    label="Select Industry"
                    types={businessTypes}
                    onChange={(value) =>
                      setDetails({ ...details, industry: [value] })
                    }/>
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
      </div>
    </div>
  );
}
