<template>
  <div class="mb-8">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold text-slate-900 w-full md:w-auto">Salary History</h1>
      
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
        <div class="relative w-full sm:w-64">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari bulan..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
          <svg class="absolute left-3 top-2.5 text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div class="flex space-x-2">
          <select 
            v-model="selectedYear"
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-1 sm:flex-none"
          >
            <option value="All">Semua Tahun</option>
            <option v-for="year in uniqueYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          
          <button @click="resetFilter" class="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600 transition-colors active:scale-95" title="Reset Filter">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100">
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase">Month</th>
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase">Gaji Kotor</th>
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase">TPP Kotor</th>
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase">Potongan</th>
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase">Net Amount</th>
              <th class="p-4 text-xs font-semibold text-gray-600 uppercase text-right">Action</th>
            </tr>
          </thead>
          
          <tbody v-if="isLoading">
            <tr v-for="n in 5" :key="n" class="animate-pulse border-b border-gray-50">
              <td class="p-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
              <td class="p-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
              <td class="p-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
              <td class="p-4"><div class="h-4 bg-red-100 rounded w-16"></div></td>
              <td class="p-4"><div class="h-4 bg-blue-100 rounded w-24"></div></td>
              <td class="p-4 text-right"><div class="h-4 bg-gray-200 rounded w-16 ml-auto"></div></td>
            </tr>
          </tbody>

          <TransitionGroup v-else tag="tbody" name="list" class="divide-y divide-gray-100 relative">
            <tr 
              v-for="(item, index) in filteredHistory" 
              :key="item.id" 
              class="group hover:bg-blue-50/50 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.005] hover:relative hover:z-10 bg-white"
              :style="{ transitionDelay: `${index * 50}ms` }"
            >
              <td class="p-4 text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">{{ item.month }}</td>
              <td class="p-4 text-sm text-gray-600">{{ formatRupiah(item.gaji.jumlah_kotor) }}</td>
              <td class="p-4 text-sm text-gray-600">{{ formatRupiah(item.tpp.jumlah_kotor) }}</td>
              <td class="p-4 text-sm text-red-500">{{ formatRupiah(item.gaji.jumlah_potongan + item.tpp.jumlah_potongan) }}</td>
              <td class="p-4 text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{{ formatRupiah(item.take_home_pay) }}</td>
              <td class="p-4 text-sm">
                <div class="flex items-center justify-end space-x-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button @click="openModal(item)" class="flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer transform hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Detail
                  </button>
                  
                  <button class="flex items-center text-slate-600 hover:text-slate-800 text-xs font-medium transform hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </td>
            </tr>
          </TransitionGroup>
        </table>

        <div v-if="!isLoading && filteredHistory.length === 0" class="p-12 text-center text-gray-500">
           <p>Tidak ada data ditemukan.</p>
        </div>
      </div>
    </div>

    <div class="md:hidden space-y-4">
      <div v-if="isLoading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-pulse">
           <div class="flex justify-between border-b pb-3 mb-3 border-gray-100">
             <div class="h-4 bg-gray-200 rounded w-1/3"></div>
             <div class="h-6 bg-blue-100 rounded w-1/4"></div>
           </div>
           <div class="space-y-2">
             <div class="h-3 bg-gray-200 rounded w-full"></div>
             <div class="h-3 bg-gray-200 rounded w-2/3"></div>
           </div>
        </div>
      </div>

      <TransitionGroup v-else name="list" tag="div" class="space-y-4">
        <div 
          v-for="(item, index) in filteredHistory" 
          :key="item.id"
          class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 active:scale-[0.98] transition-all"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="flex justify-between items-start border-b border-dashed border-gray-200 pb-3">
            <div>
              <p class="text-xs text-gray-400 font-medium mb-1">Periode</p>
              <h3 class="text-lg font-bold text-slate-800">{{ item.month }}</h3>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-400 font-medium mb-1">Take Home Pay</p>
              <span class="text-base font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                {{ formatRupiah(item.take_home_pay) }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            <div><p class="text-xs text-gray-500">Gaji Kotor</p><p class="font-medium text-slate-700">{{ formatRupiah(item.gaji.jumlah_kotor) }}</p></div>
            <div><p class="text-xs text-gray-500">TPP Kotor</p><p class="font-medium text-slate-700">{{ formatRupiah(item.tpp.jumlah_kotor) }}</p></div>
            <div class="col-span-2"><p class="text-xs text-gray-500">Total Potongan</p><p class="font-medium text-red-500">{{ formatRupiah(item.gaji.jumlah_potongan + item.tpp.jumlah_potongan) }}</p></div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mt-1 pt-3 border-t border-gray-100">
            <button @click="openModal(item)" class="flex justify-center items-center py-2 px-4 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Lihat Detail
            </button>
            <button class="flex justify-center items-center py-2 px-4 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Download PDF
            </button>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="!isLoading && filteredHistory.length === 0" class="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200 border-dashed">
         <p>Tidak ada data.</p>
      </div>
    </div>

    <SalaryDetailModal 
      v-if="selectedItem"
      :isOpen="isModalOpen" 
      :data="selectedItem"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { salaryHistory } from '../mocks/salaryData.js';
import SalaryDetailModal from './SalaryDetailModal.vue';

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);

// --- SEARCH & FILTER ---
const searchQuery = ref('');
const selectedYear = ref('All');
const isLoading = ref(false); // State Loading

const uniqueYears = computed(() => {
  const years = salaryHistory.map(item => item.month.split(' ')[1]);
  return [...new Set(years)].sort((a, b) => b - a);
});

// Watcher untuk memicu animasi loading saat filter berubah
watch([searchQuery, selectedYear], () => {
  isLoading.value = true;
  // Simulasi delay API (500ms)
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

const filteredHistory = computed(() => {
  return salaryHistory.filter(item => {
    const itemYear = item.month.split(' ')[1];
    const matchYear = selectedYear.value === 'All' || itemYear === selectedYear.value;
    const searchLower = searchQuery.value.toLowerCase();
    const matchSearch = item.month.toLowerCase().includes(searchLower);
    return matchYear && matchSearch;
  });
});

const resetFilter = () => {
  searchQuery.value = '';
  selectedYear.value = 'All';
};

// --- MODAL ---
const isModalOpen = ref(false);
const selectedItem = ref(null);

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedItem.value = null;
  }, 200);
};
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(20px); }
.list-leave-active { position: absolute; width: 100%; }
</style>