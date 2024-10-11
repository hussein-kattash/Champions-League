<template>
    <VCard @click="selectClub" :class="selectedClub?.id === props.clubData?.id && 'bg-black !text-white'" class="cursor-pointer club-card px-0 relative">
        <VCardText>
            <div class="flex flex-col gap-3 justify-center items-center">
                <img width="40px" :src="props.clubData?.logo"/>
                <div class="flex flex-col mt-2 justify-center items-center">
                    <h3 :class="selectedClub?.id === props.clubData?.id ? '!text-white' : 'text-black'" class="text-center">{{ props.clubData?.clubName }}</h3>
                    <span class="text-center">{{ props.clubData?.country }}</span>
                </div>
            </div>
        </VCardText>
    </VCard>
</template>

<script setup lang="ts">
import { useClubStore } from '~/store/clubStore';
import type { ClubModel } from '~/types';
import { storeToRefs } from 'pinia'
const clubStore = useClubStore()
const { selectedClub } = storeToRefs(clubStore)
const props = defineProps({
    clubData: Object as PropType<ClubModel>
})

const selectClub = ()=>{
  if(props.clubData){
     selectedClub.value = props.clubData
  }
}
</script>

<style scoped>
.club-card{
    width: 220px;
    height: 150px;
}
h3{
    font-weight: bold;
}
</style>