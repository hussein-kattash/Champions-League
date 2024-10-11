<template>
  <div
    class="min-h-screen bg-gradient-to-b relative from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
    <Loading v-if="isLoading"/>
    <div v-else class="flex w-full flex-col  gap-5">
      <div class="flex justify-center">
        <img :src="logo" alt="Champions League" class="w-[140px]" />
      </div>
      <!-- level 1 -->
      <div class="w-full gap-2  flex flex-col">
        <h2 class="text-xl font-bold">Level 1</h2>
        <div class="w-100 flex justify-start items-center gap-4">
          <ClubCard v-for="club in groups.first" :key="club.id" :clubData="club" />
        </div>
      </div>

      <!-- level 2 -->
      <div class="w-full gap-2 flex flex-col">
        <h2 class="text-xl font-bold">Level 2</h2>
        <div class="w-100 flex justify-start items-center gap-4">
          <ClubCard v-for="club in groups.second" :key="club.id" :clubData="club" />
        </div>
      </div>

      <!-- level 3 -->
      <div class="w-full gap-2 flex flex-col">
        <h2 class="text-xl font-bold">Level 3</h2>
        <div class="w-100 flex justify-start items-center gap-4">
          <ClubCard v-for="club in groups.third" :key="club.id" :clubData="club" />
        </div>
      </div>

      <!-- level 4 -->
      <div class="w-full gap-2 flex flex-col">
        <h2 class="text-xl font-bold">Level 4</h2>
        <div class="w-100 flex justify-start items-center gap-4">
          <ClubCard v-for="club in groups.fourth" :key="club.id" :clubData="club" />
        </div>
      </div>
      <VBtn @click="getMatchups" :disabled="Boolean(!selectedClub)" color="primary" size="large" class="my-10 w-[50%] mx-auto">Show the matchups</VBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '~/component/Loading.vue';
import ClubCard from '~/component/ClubCard.vue';
import logo from '@/assets/images/logo.png'
import { groups } from '~/constants/groups';
import { useClubStore } from '~/store/clubStore';
import type { ClubModel, MatchModel } from '~/types';
import { storeToRefs } from 'pinia'
const clubStore = useClubStore()
const { selectedClub, matchups, isLoading } = storeToRefs(clubStore)
const router = useRouter()

// Function to get 2 random teams from a group, excluding teams from the same country and no more than 2 from any country
function getTwoRandomTeams(group: ClubModel[], countryCount: Record<string, number>): ClubModel[] {
  const availableTeams = group.filter(team => 
    team.clubName !== selectedClub.value?.clubName && 
    team.country !== selectedClub.value?.country && 
    (countryCount[team.country] || 0) < 2
  );

  const selectedTeams: ClubModel[] = [];
  for (let i = 0; i < 2 && availableTeams.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const selectedTeam = availableTeams.splice(randomIndex, 1)[0];
    selectedTeams.push(selectedTeam);
    countryCount[selectedTeam.country] = (countryCount[selectedTeam.country] || 0) + 1;
  }
  return selectedTeams;
}

// Function to get matchups for a given team
function getMatchups() {
  if (!selectedClub.value) {
    console.error('No club selected');
    return;
  }

  const countryCount: Record<string, number> = { [selectedClub.value.country]: 1 };
  let teams: ClubModel[] = [];

  // Check which group the input team belongs to
  for (const [level, group] of Object.entries(groups)) {
    const teamInGroup = group.find((team: ClubModel) => team.clubName === selectedClub.value?.clubName);

    if (teamInGroup) {
      // Add 2 teams from the same group (excluding teams from the same country)
      teams = teams.concat(getTwoRandomTeams(group, countryCount));

      // Get matchups from the other groups (2 teams from each group, with conditions)
      for (const [otherGroupName, otherGroup] of Object.entries(groups)) {
        if (otherGroupName !== level) {
          teams = teams.concat(getTwoRandomTeams(otherGroup, countryCount));
        }
      }
      break; // Exit the loop once we've found and processed the group
    }
  }

  // Ensure we have exactly 8 teams
  teams = teams.slice(0, 8);

  // Create matchups with alternating Home and Away for each pair
  matchups.value = [];
  for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];

    if (Math.random() < 0.5) {
      // First match Home, second Away
      matchups.value.push(
        { club1: selectedClub.value, club2: team1, place: 'Home' },
        { club1: selectedClub.value, club2: team2, place: 'Away' }
      );
    } else {
      // First match Away, second Home
      matchups.value.push(
        { club1: selectedClub.value, club2: team1, place: 'Away' },
        { club1: selectedClub.value, club2: team2, place: 'Home' }
      );
    }
  }

  isLoading.value = true;
  setTimeout(() => {
    router.push('/matchups');
  }, 5000);
}

onMounted(()=>{
  selectedClub.value = null
  isLoading.value = false
  matchups.value = []
})

useHead({
  title: 'Champions League Matchups',
})
</script>
