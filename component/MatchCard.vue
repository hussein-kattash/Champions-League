<template>
    <VCard data-aos="zoom-in"
 
     data-aos-duration="1500" class="h-[60px] w-full border">
        <VCardText>
            <div class="flex flex-col justify-center items-center">
                <div class="flex w-full justify-between items-center">
                    <div class=" w-full flex flex-col gap-1 items-center">
                        <img width="40" :src="props.match?.club1?.logo" />
                        <span class="font-bold mt-1">{{ props.match?.club1?.clubName }}</span>
                    </div>
                    <img :src="versus" width="40" />
                    <div class="w-full flex flex-col gap-1 items-center">
                        <img width="40" :src="props.match?.club2.logo" />
                        <span class="font-bold mt-1">{{ props.match?.club2.clubName }}</span>
                    </div>
                </div>
                <div class="mt-4 flex justify-center w-full text-center">
                    <img width="40" :src="props.match?.place === 'Home' ? home : plane"/>
                </div>
            </div>
        </VCardText>
    </VCard>
</template>

<script setup lang="ts">
import versus from '@/assets/images/versus2.png'
import home from '@/assets/images/home.png'
import plane from '@/assets/images/plane.png'
import { useClubStore } from '~/store/clubStore';
import type { MatchModel } from '~/types';
import { storeToRefs } from 'pinia'
const clubStore = useClubStore()
const { selectedClub } = storeToRefs(clubStore)
const props = defineProps({
    match: Object as PropType<MatchModel>
})
</script>

<style scoped></style>