<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <div @click="$emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
    <div class="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] min-h-[400px]">
      
      <div v-if="isFetching" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
         <p class="text-sm text-gray-500 font-medium">Memuat rincian gaji...</p>
      </div>

      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h2 class="text-lg font-bold text-slate-800">Rincian Lengkap Slip Gaji</h2>
          <p class="text-sm text-gray-500">Periode: <span class="font-semibold text-blue-600">{{ data.month }}</span></p>
        </div>
        <button @click="$emit('close')" class="p-2 bg-white rounded-full hover:bg-red-50 hover:text-red-500 transition-colors border border-gray-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto custom-scrollbar" v-show="!isFetching">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div class="flex flex-col gap-6">
            <div class="bg-blue-50/50 rounded-xl border border-blue-100/50 overflow-hidden">
               <div class="bg-blue-100/50 px-4 py-3 border-b border-blue-200/50">
                  <h4 class="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    RINCIAN GAJI (SIPD)
                  </h4>
               </div>
               
               <div class="p-4 space-y-4">
                 <div>
                    <h5 class="text-[10px] font-bold text-gray-400 mb-2 uppercase">Pendapatan</h5>
                    <ul class="space-y-1 text-xs mb-2">
                      <li v-for="(val, label) in getIncomeGaji(data)" :key="label" class="flex justify-between">
                        <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
                        <span :class="val > 0 ? 'font-medium text-slate-800' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
                      </li>
                    </ul>
                    <div class="flex justify-between border-t border-dashed border-blue-200 pt-1">
                      <span class="text-xs font-bold text-blue-700">Total Kotor Gaji</span>
                      <span class="text-xs font-bold text-blue-700">{{ formatRupiah(data.gaji.jumlah_kotor) }}</span>
                    </div>
                 </div>

                 <div>
                    <h5 class="text-[10px] font-bold text-gray-400 mb-2 uppercase">Potongan</h5>
                    <ul class="space-y-1 text-xs mb-2">
                      <li v-for="(val, label) in getDedGaji(data)" :key="label" class="flex justify-between">
                        <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
                        <span :class="val > 0 ? 'font-medium text-red-600' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
                      </li>
                    </ul>
                    <div class="flex justify-between border-t border-dashed border-red-200 pt-1">
                      <span class="text-xs font-bold text-red-600">Total Potongan Gaji</span>
                      <span class="text-xs font-bold text-red-600">{{ formatRupiah(data.gaji.jumlah_potongan) }}</span>
                    </div>
                 </div>
               </div>

               <div class="bg-blue-600/10 px-4 py-3 border-t border-blue-200 flex justify-between items-center">
                 <span class="text-xs font-bold text-blue-800">Gaji Bersih (Transfer)</span>
                 <span class="text-sm font-bold text-blue-800">{{ formatRupiah(data.gaji.jumlah_bersih) }}</span>
               </div>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div class="bg-emerald-50/50 rounded-xl border border-emerald-100/50 overflow-hidden">
               <div class="bg-emerald-100/50 px-4 py-3 border-b border-emerald-200/50">
                  <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    RINCIAN TPP (SIPD)
                  </h4>
               </div>
               
               <div class="p-4 space-y-4">
                 <div>
                    <h5 class="text-[10px] font-bold text-gray-400 mb-2 uppercase">Pendapatan</h5>
                    <ul class="space-y-1 text-xs mb-2">
                      <li v-for="(val, label) in getIncomeTpp(data)" :key="label" class="flex justify-between">
                        <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
                        <span :class="val > 0 ? 'font-medium text-slate-800' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
                      </li>
                    </ul>
                    <div class="flex justify-between border-t border-dashed border-emerald-200 pt-1">
                      <span class="text-xs font-bold text-emerald-700">Total Kotor TPP</span>
                      <span class="text-xs font-bold text-emerald-700">{{ formatRupiah(data.tpp.jumlah_kotor) }}</span>
                    </div>
                 </div>

                 <div>
                    <h5 class="text-[10px] font-bold text-gray-400 mb-2 uppercase">Potongan</h5>
                    <ul class="space-y-1 text-xs mb-2">
                      <li v-for="(val, label) in getDedTpp(data)" :key="label" class="flex justify-between">
                        <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
                        <span :class="val > 0 ? 'font-medium text-red-600' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
                      </li>
                    </ul>
                    <div class="flex justify-between border-t border-dashed border-red-200 pt-1">
                      <span class="text-xs font-bold text-red-600">Total Potongan TPP</span>
                      <span class="text-xs font-bold text-red-600">{{ formatRupiah(data.tpp.jumlah_potongan) }}</span>
                    </div>
                 </div>
               </div>

               <div class="bg-emerald-600/10 px-4 py-3 border-t border-emerald-200 flex justify-between items-center">
                 <span class="text-xs font-bold text-emerald-800">TPP Bersih (Transfer)</span>
                 <span class="text-sm font-bold text-emerald-800">{{ formatRupiah(data.tpp.jumlah_bersih) }}</span>
               </div>
            </div>
          </div>

        </div>
      </div>
      
      <div class="px-6 py-4 bg-slate-900 text-white flex justify-between items-center" v-show="!isFetching">
        <div>
           <span class="block text-xs text-slate-400">Total Take Home Pay</span>
           <span class="text-[10px] text-slate-500">(Gaji Bersih + TPP Bersih)</span>
        </div>
        <span class="text-2xl font-bold text-white">{{ formatRupiah(data.take_home_pay) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({ isOpen: Boolean, data: Object });
defineEmits(['close']);

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
const isFetching = ref(true);

onMounted(() => {
  isFetching.value = true;
  setTimeout(() => {
    isFetching.value = false;
  }, 700); 
});

const getIncomeGaji = (data) => ({
  "Gaji Pokok": data.gaji.pokok,
  "Tunj. Jabatan": data.gaji.tunj_jabatan,
  "Tunj. Keluarga": data.gaji.tunj_keluarga,
  "Tunj. Fungsional": data.gaji.tunj_fungsional,
  "Tunj. Fungsional Umum": data.gaji.tunj_fungsional_umum,
  "Tunj. Beras": data.gaji.tunj_beras,
  "Tunj. PPh": data.gaji.tunj_pph,
  "Pembulatan": data.gaji.pembulatan,
  "Tunj. Jaminan Kesehatan": data.gaji.tunj_bpjs_kes,
  "Tunj. Jaminan Kecelakaan": data.gaji.tunj_jkk,
  "Tunj. Jaminan Kematian": data.gaji.tunj_jkm,
  "Tunj. Jaminan Hari Tua": data.gaji.tunj_jht,
  "Tunj. Tapera": data.gaji.tunj_tapera,
});

const getIncomeTpp = (data) => ({
  "Beban Kerja": data.tpp.beban_kerja,
  "Prestasi Kerja": data.tpp.prestasi_kerja,
  "Kondisi Kerja": data.tpp.kondisi_kerja,
  "Kelangkaan Profesi": data.tpp.kelangkaan_profesi,
  "Tunj. BPJS (TPP)": data.tpp.tunj_bpjs_kes,
});

const getDedGaji = (data) => ({
  "IWP (1% + 8%)": data.gaji.potongan_iwp,
  "PPh 21": data.gaji.potongan_pph21,
  "BPJS Kesehatan": data.gaji.potongan_bpjs_kes,
  "Jaminan Kecelakaan": data.gaji.potongan_jkk,
  "Jaminan Kematian": data.gaji.potongan_jkm,
  "Jaminan Hari Tua": data.gaji.potongan_jht,
  "Tapera": data.gaji.potongan_tapera,
  "Zakat": data.gaji.potongan_zakat,
  "Bulog": data.gaji.potongan_bulog,
});

const getDedTpp = (data) => ({
  "IWP (TPP)": data.tpp.potongan_iwp,
  "PPh 21 (TPP)": data.tpp.potongan_pph21,
  "BPJS Kesehatan (TPP)": data.tpp.potongan_bpjs_kes,
});
</script>