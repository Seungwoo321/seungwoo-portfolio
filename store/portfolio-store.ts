import { create } from 'zustand';

interface PortfolioState {
  isLoading: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isLoading: false,
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  selectedProject: null,
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
}));