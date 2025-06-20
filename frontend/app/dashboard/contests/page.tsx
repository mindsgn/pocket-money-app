"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/@src/components/ui/card";
import { Button } from "@/@src/components/ui/button";
import { VoucherCreateModal } from "@/@src/components/voucherCreateModal";
import { Alert } from "@/@src/components/ui/alert";
import { AlertDescription } from "@/@src/components/ui/alert";
import { CardHeader } from "@/@src/components/ui/card";
import { Table } from "@/@src/components/ui/table";
import { TableHeader } from "@/@src/components/ui/table"; 
import { Skeleton } from "@/@src/components/ui/skeleton";
import { TableRow } from "@/@src/components/ui/table";
import { TableHead } from "@/@src/components/ui/table";
import { TableBody } from "@/@src/components/ui/table";
import { TableCell } from "@/@src/components/ui/table";
import { Badge } from "@/@src/components/ui/badge";
import {
  Edit,
  Trash2,
  Gift,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
  Coffee,
  ShoppingBag,
  Star,
  Percent,
} from "lucide-react";
import { useCampaignStore } from "@/@src/store/campaign";
import { useAuth } from "@/lib/auth";

const voucherCategories = [
  { value: "food", label: "Food & Beverages", icon: Coffee },
  { value: "retail", label: "Retail Items", icon: ShoppingBag },
  { value: "discount", label: "Discounts", icon: Percent },
  { value: "special", label: "Special Offers", icon: Star },
];

export default function DashboardPage() {
  const { campaigns } = useCampaignStore();
  const [error] = useState<boolean>(false);
  const [isLoading] = useState<boolean>(false);
  const { makeAuthenticatedRequest } = useAuth();

  const handleVoucherCreated = async () => {};

  const getCategoryIcon = (category: string) => {
    const categoryData = voucherCategories.find((c) => c.value === category);
    const Icon = categoryData?.icon || Gift;
    return <Icon className="h-4 w-4" />;
  };

  const handleToggleActive = async (campaignID: string) => {
    try {
      console.log(campaignID);
    } catch (err) {
      console.log(err);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "freeItem":
        return "bg-green-100 text-green-800";
      case "discount":
        return "bg-blue-100 text-blue-800";
      case "cashback":
        return "bg-purple-100 text-purple-800";
      case "special":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteVoucher = async (campaignID: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      makeAuthenticatedRequest("/api/campaign", {
        method: "DELETE",
        body: JSON.stringify({
          campaignID,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Dashboard
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4, mb-4">
          <div />
          <VoucherCreateModal onVoucherCreated={handleVoucherCreated} />
        </div>
        {/* Success/Error Messages */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Vouchers Table */}
        <Card>
          <CardHeader>
           
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                    <Skeleton className="h-8 w-[100px]" />
                  </div>
                ))}
              </div>
            ) : campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Voucher</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Points Cost</TableHead>
                      <TableHead>Redemptions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.campaignID}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.description}
                            </div>
                            {campaign.value && (
                              <div className="text-sm font-medium text-primary">
                                Value: {campaign.value}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(campaign.category)}
                            <span className="capitalize">
                              {campaign.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(campaign.type)}>
                            {campaign.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleToggleActive(campaign.campaignID)
                              }
                              className="h-8 w-8 p-0"
                            >
                              {campaign.isActive ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Badge
                              variant={
                                campaign.isActive ? "default" : "secondary"
                              }
                            >
                              {campaign.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteVoucher(campaign.campaignID)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Hey there 👋, welcome aboard!</h3>
                <p className="text-muted-foreground mb-4">
                 Learn what makes Posted different, the problems it solves for your brand, and the four wins you’ll gain from using Posted.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
