<script setup>
import { ref } from 'vue';

import LoginView from './components/LoginView.vue';
import Sidebar from './components/Sidebar.vue';
import DashboardHeader from './components/DashboardHeader.vue';
import StatCards from './components/StatCards.vue';
import BreakdownTables from './components/BreakdownTables.vue';
import HistoryView from './components/HistoryView.vue';
import PotonganView from './components/PotonganView.vue';
import ResetPasswordView from './components/ResetPasswordView.vue';
import FeatureModal from './components/FeatureModal.vue';

const isLoggedIn = ref(true);
const currentPage = ref('dashboard');
const isFeatureModalOpen = ref(false);
const isMobileSidebarOpen = ref(false);

const handleLoginSuccess = () => {
  isLoggedIn.value = true;
};

const handleLogout = () => {
  if(confirm('Apakah Anda yakin ingin keluar?')) {
    isLoggedIn.value = false;
    currentPage.value = 'dashboard';
    isMobileSidebarOpen.value = false;
  }
};

const changeView = (pageName) => {
  currentPage.value = pageName;
  const contentArea = document.querySelector('.custom-scrollbar');
  if (contentArea) contentArea.scrollTop = 0;
};
</script>

<template>
  <div class="h-screen bg-[#f1f5f9] font-sans overflow-hidden">
    
    <LoginView 
      v-if="!isLoggedIn" 
      @login-success="handleLoginSuccess"
    />

    <div v-else class="flex h-full">
      
      <Sidebar 
        :currentPage="currentPage" 
        :isMobileOpen="isMobileSidebarOpen"
        @change-page="changeView" 
        @show-unavailable="isFeatureModalOpen = true"
        @close-mobile="isMobileSidebarOpen = false"
        @logout="handleLogout"
      />

      <main class="flex-1 w-full md:ml-64 h-full flex flex-col">
        
        <div class="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
          <button @click="isMobileSidebarOpen = true" class="p-2 text-gray-600 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div class="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <div class="max-w-6xl mx-auto">
            
            <div v-if="currentPage === 'dashboard'">
              <DashboardHeader />
              <div class="bg-white p-4 md:p-8 rounded-b-xl rounded-tr-xl shadow-sm border border-gray-100 -mt-2 min-h-[500px]">
                <StatCards />
                <BreakdownTables />
              </div>
            </div>

            <div v-else-if="currentPage === 'riwayat'">
               <HistoryView />
            </div>

            <div v-else-if="currentPage === 'potongan'">
               <PotonganView />
            </div>

            <div v-else-if="currentPage === 'reset-password'">
               <ResetPasswordView />
            </div>

          </div>
        </div>
      </main>

      <FeatureModal 
        :isOpen="isFeatureModalOpen" 
        @close="isFeatureModalOpen = false" 
      />
      
    </div>

  </div>
</template>

<!-- 
<template>
  <div class="h-screen bg-[#f1f5f9] font-sans overflow-hidden">
    
    <LoginView 
      v-if="!isLoggedIn" 
      @login-success="handleLoginSuccess"
    />

    <div v-else class="flex h-full">
      
      <Sidebar 
        :currentPage="currentPage" 
        :isMobileOpen="isMobileSidebarOpen"
        @change-page="changeView" 
        @show-unavailable="isFeatureModalOpen = true"
        @close-mobile="isMobileSidebarOpen = false"
      />

      <main class="flex-1 w-full md:ml-64 h-full flex flex-col">
        
        <div class="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
          <button @click="isMobileSidebarOpen = true" class="p-2 text-gray-600 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div class="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <div class="max-w-6xl mx-auto">
            
            <div v-if="currentPage === 'dashboard'">
              <DashboardHeader />
              <div class="bg-white p-4 md:p-8 rounded-b-xl rounded-tr-xl shadow-sm border border-gray-100 -mt-2 min-h-[500px]">
                <StatCards />
                <BreakdownTables />
              </div>
            </div>

            <div v-else-if="currentPage === 'riwayat'">
               <HistoryView />
            </div>

          </div>
        </div>
      </main>

      <FeatureModal 
        :isOpen="isFeatureModalOpen" 
        @close="isFeatureModalOpen = false" 
      />
      
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginView from './components/LoginView.vue'; // Import Component Login Baru
import Sidebar from './components/Sidebar.vue';
import DashboardHeader from './components/DashboardHeader.vue';
import StatCards from './components/StatCards.vue';
import BreakdownTables from './components/BreakdownTables.vue';
import HistoryView from './components/HistoryView.vue';
import FeatureModal from './components/FeatureModal.vue';

// STATE
const isLoggedIn = ref(false); // Default false (harus login dulu)
const currentPage = ref('dashboard');
const isFeatureModalOpen = ref(false);
const isMobileSidebarOpen = ref(false);

// ACTIONS
const handleLoginSuccess = () => {
  isLoggedIn.value = true;
};

const changeView = (pageName) => {
  currentPage.value = pageName;
};
</script> -->