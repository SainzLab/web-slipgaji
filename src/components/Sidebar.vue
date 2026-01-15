<template>
  <div>
    <div 
      v-if="isMobileOpen" 
      @click="$emit('close-mobile')" 
      class="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <aside 
      :class="['w-64 bg-[#1e293b] text-white flex flex-col h-screen fixed left-0 top-0 z-30 transition-transform duration-300 ease-in-out', isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']"
    >
      <div class="p-6 flex items-start space-x-3 border-b border-slate-700 relative">
        <div class="w-8 h-8 shrink-0 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 mt-1 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>
        </div>
        <div class="leading-tight overflow-hidden flex-1">
          <h1 class="text-xs font-bold text-gray-100 mb-0.5 break-words uppercase">{{ currentSalary.pegawai.nama }}</h1>
          <p class="text-[10px] text-blue-400 font-medium mb-0.5 break-words uppercase">{{ currentSalary.pegawai.jabatan }}</p>
          <p class="text-[9px] text-gray-500">NIP. {{ currentSalary.pegawai.nip }}</p>
        </div>
        <button @click="$emit('close-mobile')" class="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        
        <a href="#" @click.prevent="navigate('dashboard')" :class="['flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all', currentPage === 'dashboard' ? 'bg-blue-600/20 text-blue-400 border-blue-500' : 'text-gray-400 hover:bg-slate-800 hover:text-white border-transparent']">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
          <span class="font-medium text-sm">Gaji & Tunjangan</span>
        </a>

        <a href="#" @click.prevent="navigate('riwayat')" :class="['flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all', currentPage === 'riwayat' ? 'bg-blue-600/20 text-blue-400 border-blue-500' : 'text-gray-400 hover:bg-slate-800 hover:text-white border-transparent']">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>
          <span class="font-medium text-sm">Riwayat</span>
        </a>

        <a href="#" @click.prevent="navigate('potongan')" :class="['flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 transition-all', currentPage === 'potongan' ? 'bg-blue-600/20 text-blue-400 border-blue-500' : 'text-gray-400 hover:bg-slate-800 hover:text-white border-transparent']">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></svg>
          <span class="font-medium text-sm">Potongan</span>
        </a>

        <div>
          <button 
            @click="toggleSettings" 
            :class="['w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all border-l-4 border-transparent hover:border-slate-600', isSettingsOpen ? 'bg-slate-800 text-white' : '']"
          >
            <div class="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              <span class="font-medium text-sm">Pengaturan</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 transition-transform duration-200"
              :class="isSettingsOpen ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div 
            v-show="isSettingsOpen" 
            class="mt-1 space-y-1 pl-12 pr-4 transition-all duration-300 ease-in-out"
          >
            <a 
                href="#" 
                @click.prevent="navigate('reset-password')" 
                class="block py-2 px-3 text-xs text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors"
            >
                Reset Password
            </a>
            
            <a 
              href="#" 
              @click.prevent="$emit('show-unavailable')" 
              class="block py-2 px-3 text-xs text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors"
            >
              Tentang Aplikasi
            </a>
          </div>
        </div>

      </nav>

      <div class="px-4 py-6 border-t border-slate-700 space-y-2">
        <a href="#" @click.prevent="$emit('logout')" class="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span class="font-medium text-sm">Keluar</span>
        </a>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { currentSalary } from '../mocks/salaryData.js';

const props = defineProps(['currentPage', 'isMobileOpen']);
const emit = defineEmits(['change-page', 'show-unavailable', 'close-mobile', 'logout']);
const isSettingsOpen = ref(false);

const navigate = (page) => {
  emit('change-page', page);
  emit('close-mobile');
};

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

const handleResetPassword = () => {
  if(confirm("Apakah Anda yakin ingin mereset password? Link reset akan dikirim ke email terdaftar.")) {
    alert("Permintaan reset password berhasil dikirim.");
  }
};
</script>