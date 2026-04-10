import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type userState = {
    idUser: number;
    setIdUser: (idUser: number) => void;
}

export const useUserStore = create<userState>()(
    persist(
        (set) => ({
            idUser: 0,
            setIdUser: (idUser: number) => {
                set({ idUser });
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);