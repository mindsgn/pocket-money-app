"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/@src/components/ui/button";
import { Input } from "@/@src/components/ui/input";
import { Label } from "@/@src/components/ui/label";
import { Textarea } from "@/@src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/@src/components/ui/select";
import { Switch } from "@/@src/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/@src/components/ui/dialog";
import {
  Coffee,
  ShoppingBag,
  Percent,
  Star,
  Plus,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

interface Campaign {
  id: string
  title: string
  description: string
  budget: number
  status: "draft" | "active" | "completed"
  applicants: number
  createdAt: string
  category: string
}

interface User {
  id: string
  name: string
  email: string
  company: string
  type: "brand"
}

interface VoucherCreateModalProps {
  onVoucherCreated?: (voucher: any) => void;
  triggerButton?: React.ReactNode;
}

const voucherCategories = [
  { value: "food", label: "Food & Beverages", icon: Coffee },
  { value: "retail", label: "Retail Items", icon: ShoppingBag },
  { value: "discount", label: "Discounts", icon: Percent },
  { value: "special", label: "Special Offers", icon: Star },
];

const voucherTypes = [
  {
    value: "freeItem",
    label: "Free Item",
    description: "Customer gets a specific item for free",
  },
  {
    value: "discount",
    label: "Percentage Discount",
    description: "Customer gets a percentage off their purchase",
  },
  {
    value: "cashback",
    label: "Cash Value",
    description: "Customer gets a fixed cash amount off",
  },
  {
    value: "special",
    label: "Special Offer",
    description: "Custom special offer or bundle",
  },
];

export function VoucherCreateModal({
  onVoucherCreated,
  triggerButton,
}: VoucherCreateModalProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(false)
  const { makeAuthenticatedRequest } = useAuth();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)


   const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
    requirements: "",
  })
  
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await makeAuthenticatedRequest("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      })

      if (response.ok) {
        const data = await response.json()
        setCampaigns((prev) => [data.campaign, ...prev])
        setShowCreateCampaign(false)
        setNewCampaign({
          title: "",
          description: "",
          budget: "",
          category: "",
          requirements: "",
        })
      }
    } catch (error) {
      console.error("Failed to create campaign:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                    <DialogDescription>Create a new UGC campaign to connect with content creators</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCampaign} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Campaign Title</label>
                      <Input
                        placeholder="Summer Product Launch"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="fitness">Health & Fitness</SelectItem>
                          <SelectItem value="travel">Travel & Tourism</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget (ZAR)</label>
                      <Input
                        type="number"
                        placeholder="5000"
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign((prev) => ({ ...prev, budget: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Describe your campaign goals, target audience, and what you're looking for..."
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Requirements</label>
                      <Textarea
                        placeholder="Specific requirements for content creators (follower count, location, style, etc.)"
                        value={newCampaign.requirements}
                        onChange={(e) => setNewCampaign((prev) => ({ ...prev, requirements: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowCreateCampaign(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Campaign"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
  );
}
