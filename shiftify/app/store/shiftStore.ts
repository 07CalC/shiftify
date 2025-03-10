import { Shift } from "~/utils/types"
import { create } from "zustand"
import { BASE_URL } from "~/utils/env";

type TaskStoreType = {
    shifts: Shift[];
    loading: boolean;
    fetchShifts: () => void;
}

export const useShiftStore = create<TaskStoreType>((set) => ({
    shifts: [],
    loading: true,
    fetchShifts: async () => {
        set({loading: true})
        const response = await fetch(BASE_URL?.trim()+"/shifts", {
            method: "GET"
        })
        const data = await response.json()
        set({shifts: data, loading: false})
    }
}))