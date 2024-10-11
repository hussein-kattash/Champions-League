import { defineStore } from "pinia";
import type { ClubModel, MatchModel } from "~/types";


export const useClubStore = defineStore('clubStore', {
    state:()=>({
        selectedClub: ref<ClubModel | null>(),
        matchups: ref<MatchModel[]>([]),
        isLoading: ref(false)
    }),
     persist: true,
})