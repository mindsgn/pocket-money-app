import { create } from 'zustand'

interface UseBackup {
  writeToCloud: () => void,
  readFromCloud: () => void
}

const useBackup = create<UseBackup>((set, get) => ({
  writeToCloud: () => {},
  readFromCloud: () => {}
}));

export { useBackup }