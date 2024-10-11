<template>
    <div class="md:!p-10 p-5">
        <div class="grid grid-cols-12 gap-4">
            <div v-for="(match, i) in matchups" :key="i"  class="xl:!col-span-3 lg:!col-span-4 sm:!col-span-6 col-span-12">
                <MatchCard :match="match"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MatchCard from '~/component/MatchCard.vue';
import { useClubStore } from '~/store/clubStore';
import { storeToRefs } from 'pinia'
const clubStore = useClubStore()
const { selectedClub, matchups, isLoading} = storeToRefs(clubStore)
isLoading.value = false
</script>