import { create } from 'zustand'

interface Toast {
  show: false,
  messsage: null,
  title: null
}

interface UseUser {
  terms: boolean,
  updateUser: () => void,
  toast: Toast,
  currency: "zar" | "usd" | "eur",
  encrypted: boolean
}

const useUser = create<UseUser>((set, get) => ({
    terms: true,
    encrypted: false,
    currency: "zar",
    toast: {
      show: false,
      messsage: null,
      title: null
    },
    updateUser: () => {
        set({terms: true})
    }
}));

export { useUser }