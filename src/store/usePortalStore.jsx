
import { create } from 'zustand'

const usePortalStore = create((set) => ({
  active: '',
  setActive: (value) => set(() => ({ active: value })),
}))

export default usePortalStore; 
