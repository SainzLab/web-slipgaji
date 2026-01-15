<template>
  <div class="mb-8">
    
    <div class="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Rincian Potongan Lainnya</h1>
        <p class="text-sm text-gray-500 mt-1">Potongan Koperasi, Bank, dan Iuran Wajib Organisasi</p>
      </div>

      <div class="relative w-full md:w-64">
        <label class="block text-xs font-bold text-gray-500 mb-1 uppercase">Pilih Periode</label>
        <div class="relative">
           <select 
            v-model="selectedMonthId"
            class="w-full appearance-none bg-white border border-gray-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
          >
            <option v-for="item in salaryHistory" :key="item.id" :value="item.id">
              {{ item.month }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div v-for="n in 2" :key="n" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div class="space-y-4">
          <div v-for="i in 8" :key="i" class="flex justify-between">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative overflow-hidden transition-all duration-300">
        <div class="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
        
        <h3 class="relative z-10 text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
          <span class="w-2 h-6 bg-red-500 rounded-full"></span>
          Potongan Gaji
          <span class="ml-auto text-xs font-normal bg-red-50 text-red-600 px-2 py-1 rounded">{{ currentData.month }}</span>
        </h3>
        
        <div class="relative z-10 space-y-3">
          <div v-for="(value, label) in potonganGajiList" :key="label" class="flex justify-between items-center text-sm group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <span :class="value > 0 ? 'text-gray-700 font-medium' : 'text-gray-400'">{{ label }}</span>
            <span :class="value > 0 ? 'font-bold text-red-600' : 'text-gray-300'">{{ formatRupiah(value) }}</span>
          </div>
        </div>

        <div class="relative z-10 mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
          <span class="text-sm font-bold text-slate-700">Total Potongan Gaji</span>
          <span class="text-lg font-bold text-red-600">{{ formatRupiah(currentData.potongan_eksternal.gaji.total) }}</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative overflow-hidden transition-all duration-300">
        <div class="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>

        <h3 class="relative z-10 text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
          <span class="w-2 h-6 bg-orange-500 rounded-full"></span>
          Potongan TPP
          <span class="ml-auto text-xs font-normal bg-orange-50 text-orange-600 px-2 py-1 rounded">{{ currentData.month }}</span>
        </h3>
        
        <div class="relative z-10 space-y-3">
          <div v-for="(value, label) in potonganTppList" :key="label" class="flex justify-between items-center text-sm group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <span :class="value > 0 ? 'text-gray-700 font-medium' : 'text-gray-400'">{{ label }}</span>
            <span :class="value > 0 ? 'font-bold text-orange-600' : 'text-gray-300'">{{ formatRupiah(value) }}</span>
          </div>
        </div>

        <div class="relative z-10 mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
          <span class="text-sm font-bold text-slate-700">Total Potongan TPP</span>
          <span class="text-lg font-bold text-orange-600">{{ formatRupiah(currentData.potongan_eksternal.tpp.total) }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { salaryHistory } from '../mocks/salaryData.js';

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
const isLoading = ref(false);
const selectedMonthId = ref(1);

const currentData = computed(() => {
  return salaryHistory.find(item => item.id === selectedMonthId.value) || salaryHistory[0];
});

watch(selectedMonthId, () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 400); 
});

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => { isLoading.value = false; }, 800);
});

const potonganGajiList = computed(() => ({
  "Koperasi": currentData.value.potongan_eksternal.gaji.koperasi,
  "Korpri": currentData.value.potongan_eksternal.gaji.korpri,
  "Dharma Wanita": currentData.value.potongan_eksternal.gaji.dharma_wanita,
  "Bank BJB": currentData.value.potongan_eksternal.gaji.bjb,
  "Bank BJB Syariah": currentData.value.potongan_eksternal.gaji.bjb_syariah,
  "Bank BRI": currentData.value.potongan_eksternal.gaji.bri,
  "Bank Syariah Mandiri (BSM)": currentData.value.potongan_eksternal.gaji.bsm,
  "Zakat Fitrah & Infak": currentData.value.potongan_eksternal.gaji.zakat_fitrah,
  "Zakat Mal": currentData.value.potongan_eksternal.gaji.zakat,
  "Zakat Profesi": currentData.value.potongan_eksternal.gaji.zakat_profesi,
}));

const potonganTppList = computed(() => ({
  "Bank BJB": currentData.value.potongan_eksternal.tpp.bjb,
  "Gotong Royong (Gotroy)": currentData.value.potongan_eksternal.tpp.gotroy,
  "BPR Otista": currentData.value.potongan_eksternal.tpp.bpr_otista,
  "BPR Pasar": currentData.value.potongan_eksternal.tpp.bpr_pasar,
  "Bendahara": currentData.value.potongan_eksternal.tpp.bendahara,
}));
</script>