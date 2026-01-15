<template>
  <div>
    
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="n in 4" :key="n" class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
        <div class="w-10 h-10 bg-gray-200 rounded-lg mb-4"></div> 
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>   
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>       
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
      <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
        <div class="w-10 h-10 bg-blue-200/60 rounded-lg flex items-center justify-center mb-4 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
        </div>
        <p class="text-sm text-gray-600 mb-1 font-medium">Total Penerimaan Gaji</p>
        <h3 class="text-2xl font-bold text-slate-800">{{ formatRupiah(currentSalary.gaji.jumlah_kotor) }}</h3>
      </div>

      <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-md transition-shadow">
        <div class="w-10 h-10 bg-emerald-200/60 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        </div>
        <p class="text-sm text-gray-600 mb-1 font-medium">Total Penerimaan TPP</p>
        <h3 class="text-2xl font-bold text-slate-800">{{ formatRupiah(currentSalary.tpp.jumlah_kotor) }}</h3>
      </div>

      <div class="bg-red-50 p-6 rounded-2xl border border-red-100 hover:shadow-md transition-shadow">
        <div class="w-10 h-10 bg-red-200/60 rounded-lg flex items-center justify-center mb-4 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
        </div>
        <p class="text-sm text-gray-600 mb-1 font-medium">Total Potongan (Gaji+TPP)</p>
        <h3 class="text-2xl font-bold text-slate-800">{{ formatRupiah(totalPotongan) }}</h3>
      </div>

      <div class="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-shadow text-white relative overflow-hidden flex flex-col justify-between">
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
          </div>
          <div>
            <p class="text-xs text-blue-200 font-medium uppercase tracking-wider">Total Diterima</p>
            <h3 class="text-2xl font-bold leading-none">{{ formatRupiah(currentSalary.take_home_pay) }}</h3>
          </div>
        </div>

        <div class="h-px bg-blue-400/30 w-full mb-3"></div>

        <div class="space-y-2 text-sm">
           <div class="flex justify-between items-center">
             <span class="text-blue-100 flex items-center gap-1.5">
               <span class="w-1.5 h-1.5 bg-blue-200 rounded-full"></span> Transfer Gaji
             </span>
             <span class="font-bold">{{ formatRupiah(currentSalary.take_home_pay_gaji) }}</span>
           </div>
           <div class="flex justify-between items-center">
             <span class="text-emerald-100 flex items-center gap-1.5">
               <span class="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span> Transfer TPP
             </span>
             <span class="font-bold text-emerald-100">{{ formatRupiah(currentSalary.take_home_pay_tpp) }}</span>
           </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { currentSalary } from '../mocks/salaryData.js';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
};

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const totalPotongan = computed(() => {
  const potGajiSIPD = currentSalary.gaji.jumlah_potongan;
  const potTppSIPD = currentSalary.tpp.jumlah_potongan;
  const potGajiEksternal = currentSalary.potongan_eksternal.gaji.total;
  const potTppEksternal = currentSalary.potongan_eksternal.tpp.total;

  return potGajiSIPD + potTppSIPD + potGajiEksternal + potTppEksternal;
});
</script>