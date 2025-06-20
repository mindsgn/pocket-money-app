import { create } from "zustand";

export type campaign = {
  campaignID: string;
  name: string;
  description: string;
  value: string;
  category: string;
  type: string;
  onchain: false;
  isActive: boolean;
};

export interface campaignStoreInterface {
  campaigns: campaign[];
  updateCampaign: (data: campaign[]) => void;
}

export const useCampaignStore = create<campaignStoreInterface>((set) => ({
  campaigns: [],
  updateCampaign: (data: campaign[]) => {
    set({ campaigns: data });
  },
}));
