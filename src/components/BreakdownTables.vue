<template>
  <div>
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="h-5 bg-gray-100 rounded w-1/4"></div>
        </div>
        <div class="space-y-4">
          <div class="h-3 bg-blue-50 rounded w-1/4 mb-2"></div> 
          <div v-for="n in 6" :key="n" class="flex justify-between">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="border-t border-gray-100 my-4"></div>
          <div class="h-3 bg-emerald-50 rounded w-1/4 mb-2"></div> 
          <div v-for="n in 4" :key="`tpp-${n}`" class="flex justify-between">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-6 border-b border-gray-100 pb-4"></div>
        <div class="space-y-4">
          <div class="h-3 bg-red-50 rounded w-1/4 mb-2"></div>
          <div v-for="n in 8" :key="n" class="flex justify-between">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="border-t border-gray-100 my-4"></div>
          <div class="h-3 bg-orange-50 rounded w-1/4 mb-2"></div>
           <div v-for="n in 4" :key="`tpp-ded-${n}`" class="flex justify-between">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex justify-between">
          <span>Income Breakdown</span>
          <span class="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Semua Komponen</span>
        </h3>
        <div class="space-y-2">
          
          <div class="mb-2"><span class="text-xs font-bold text-blue-600 uppercase tracking-wider block">Komponen Gaji</span></div>
          <div v-for="(val, label) in gajiIncomeList" :key="label" class="flex justify-between items-center text-sm">
            <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
            <span :class="val > 0 ? 'font-semibold text-slate-800' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
          </div>
          
          <div class="border-t border-dashed my-3"></div>
          
          <div class="mb-2"><span class="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Komponen TPP</span></div>
          <div v-for="(val, label) in tppIncomeList" :key="label" class="flex justify-between items-center text-sm">
             <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
             <span :class="val > 0 ? 'font-semibold text-slate-800' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
          </div>

        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 class="text-lg font-bold text-slate-800 mb-6 border-b pb-4">Deduction Breakdown</h3>
        <div class="space-y-2">
          
          <div class="mb-2"><span class="text-xs font-bold text-red-600 uppercase tracking-wider block">Potongan Gaji (SIPD & Lainnya)</span></div>
          <div v-for="(val, label) in gajiDeductionList" :key="label" class="flex justify-between items-center text-sm">
            <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
            <span :class="val > 0 ? 'font-semibold text-red-600' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
          </div>

          <div class="border-t border-dashed my-3"></div>

          <div class="mb-2"><span class="text-xs font-bold text-orange-600 uppercase tracking-wider block">Potongan TPP (SIPD & Lainnya)</span></div>
          <div v-for="(val, label) in tppDeductionList" :key="label" class="flex justify-between items-center text-sm">
            <span :class="val > 0 ? 'text-gray-600' : 'text-gray-400 italic'">{{ label }}</span>
            <span :class="val > 0 ? 'font-semibold text-red-600' : 'text-gray-400'">{{ formatRupiah(val) }}</span>
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

const gajiIncomeList = computed(() => ({
  "Gaji Pokok": currentSalary.gaji.pokok,
  "Tunj. Jabatan": currentSalary.gaji.tunj_jabatan,
  "Tunj. Keluarga": currentSalary.gaji.tunj_keluarga,
  "Tunj. Fungsional": currentSalary.gaji.tunj_fungsional,
  "Tunj. Fungsional Umum": currentSalary.gaji.tunj_fungsional_umum,
  "Tunj. Beras": currentSalary.gaji.tunj_beras,
  "Tunj. PPh": currentSalary.gaji.tunj_pph,
  "Pembulatan": currentSalary.gaji.pembulatan,
  "Tunj. Jaminan Kesehatan (BPJS)": currentSalary.gaji.tunj_bpjs_kes,
  "Tunj. Jaminan Kecelakaan (JKK)": currentSalary.gaji.tunj_jkk,
  "Tunj. Jaminan Kematian (JKM)": currentSalary.gaji.tunj_jkm,
  "Tunj. Hari Tua (JHT)": currentSalary.gaji.tunj_jht,
  "Tunj. Tapera": currentSalary.gaji.tunj_tapera,
}));

const tppIncomeList = computed(() => ({
  "Beban Kerja": currentSalary.tpp.beban_kerja,
  "Prestasi Kerja": currentSalary.tpp.prestasi_kerja,
  "Kondisi Kerja": currentSalary.tpp.kondisi_kerja,
  "Kelangkaan Profesi": currentSalary.tpp.kelangkaan_profesi,
}));

const gajiDeductionList = computed(() => ({
  "Potongan IWP": currentSalary.gaji.potongan_iwp,
  "PPh 21": currentSalary.gaji.potongan_pph21,
  "BPJS Kesehatan": currentSalary.gaji.potongan_bpjs_kes,
  "Jaminan Kecelakaan (JKK)": currentSalary.gaji.potongan_jkk,
  "Jaminan Kematian (JKM)": currentSalary.gaji.potongan_jkm,
  "Jaminan Hari Tua (JHT)": currentSalary.gaji.potongan_jht,
  "Tapera": currentSalary.gaji.potongan_tapera,
  "Bulog": currentSalary.gaji.potongan_bulog,
  "Korpri": currentSalary.potongan_eksternal.gaji.korpri,
  "Dharma Wanita": currentSalary.potongan_eksternal.gaji.dharma_wanita,
  "Zakat Fitrah + Infak": currentSalary.potongan_eksternal.gaji.zakat_fitrah,
  "Zakat Mal": currentSalary.potongan_eksternal.gaji.zakat,
  "Koperasi": currentSalary.potongan_eksternal.gaji.koperasi,
  "Bank BJB": currentSalary.potongan_eksternal.gaji.bjb,
  "Bank BJB Syariah": currentSalary.potongan_eksternal.gaji.bjb_syariah,
  "Bank BRI": currentSalary.potongan_eksternal.gaji.bri,
  "Bank Syariah Mandiri": currentSalary.potongan_eksternal.gaji.bsm,
}));

const tppDeductionList = computed(() => ({
  "Potongan IWP (TPP)": currentSalary.tpp.potongan_iwp,
  "PPh 21 (TPP)": currentSalary.tpp.potongan_pph21,
  "BPJS Kesehatan (TPP)": currentSalary.tpp.potongan_bpjs_kes,
  "Bank BJB (TPP)": currentSalary.potongan_eksternal.tpp.bjb,
  "Gotong Royong": currentSalary.potongan_eksternal.tpp.gotroy,
  "BPR Otista": currentSalary.potongan_eksternal.tpp.bpr_otista,
  "BPR Pasar": currentSalary.potongan_eksternal.tpp.bpr_pasar,
  "Bendahara": currentSalary.potongan_eksternal.tpp.bendahara,
}));
</script>