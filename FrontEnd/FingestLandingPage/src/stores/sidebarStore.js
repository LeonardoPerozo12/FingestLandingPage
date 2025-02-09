import { create } from "zustand";

export const useSidebarStore = create((set) => ({
    sidebarWidthPx: "260px",
    collapsed: false,

    toggleSidebar: () => set((state) => ({
        collapsed: !state.collapsed,
        sidebarWidthPx: state.collapsed ? "260px" : "60px",
    })),
}));
