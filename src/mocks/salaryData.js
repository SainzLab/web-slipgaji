// src/mocks/salaryData.js

export const currentSalary = {
  periode: "Januari 2026",
  pegawai: {
    nama: "FATHURRACHMAN ABDUL MALIK",
    nip: "19970311 202012 1 004",
    jabatan: "PRANATA KOMPUTER PERTAMA",
    golongan: "III/a",
    unit_kerja: "Dinas Komunikasi dan Informatika",
    status_kawin: "Kawin",
    jumlah_anak: 1
  },

  // --- DATA GAJI (SUMBER: SIPD GAJI) ---
  gaji: {
    // PENDAPATAN
    pokok: 2964000,
    tunj_keluarga: 355680,
    tunj_jabatan: 0,
    tunj_fungsional: 540000,
    tunj_fungsional_umum: 0,
    tunj_beras: 217260,
    tunj_pph: 0,
    pembulatan: 31,
    tunj_khusus_papua: 0,
    tunj_bpjs_kes: 154387, 
    tunj_jkk: 7114,
    tunj_jkm: 21341,
    tunj_tapera: 0,
    tunj_pensiun: 0,
    tunj_jht: 0,
    
    // POTONGAN SIPD
    potongan_iwp: 38597,
    potongan_pph21: 0,
    potongan_zakat: 0,
    potongan_bulog: 0,
    potongan_bpjs_kes: 154387,
    potongan_jkk: 7114,
    potongan_jkm: 21341,
    potongan_tapera: 0,
    potongan_pensiun: 0,
    potongan_jht: 265574,

    // TOTAL SIPD
    jumlah_kotor: 4259813, 
    jumlah_potongan: 487013,
    jumlah_bersih: 3772800 // Ditransfer dari SIPD (sebelum pot bank/lainnya)
  },

  // --- DATA TPP (SUMBER: SIPD TPP) ---
  tpp: {
    // PENDAPATAN
    beban_kerja: 773934,
    tempat_bertugas: 0,
    kondisi_kerja: 1382589,
    kelangkaan_profesi: 0,
    prestasi_kerja: 1160901,
    tunj_pph: 0,
    tunj_bpjs_kes: 132697,
    tunj_jkk: 0,
    tunj_jkm: 0,
    tunj_tapera: 0,
    tunj_pensiun: 0,
    tunj_jht: 0,

    // POTONGAN SIPD
    potongan_iwp: 33174,
    potongan_pph21: 75772,
    potongan_zakat: 0,
    potongan_bulog: 0,
    potongan_bpjs_kes: 132697,
    potongan_jkk: 0,
    potongan_jkm: 0,
    potongan_tapera: 0,
    potongan_pensiun: 0,
    potongan_jht: 0,

    // TOTAL SIPD
    jumlah_kotor: 3450121, 
    jumlah_potongan: 241643, 
    jumlah_bersih: 3208478 // Ditransfer dari SIPD (sebelum pot bank/lainnya)
  },

  // --- POTONGAN EKSTERNAL (SUMBER: FILE POTONGAN MANUAL) ---
  potongan_eksternal: {
    // Dari File: Potongan Gaji.xlsx
    gaji: {
      koperasi: 0,
      korpri: 5000,
      dharma_wanita: 15000,
      bjb: 0,
      bjb_syariah: 0,
      zakat_fitrah: 20000, // Zakat Fitrah + Infak
      bri: 0,
      zakat: 0, // Zakat Mal
      bsm: 0,
      zakat_profesi: 0,
      total: 40000 // Total Potongan Eksternal Gaji (5000+15000+20000)
    },
    // Dari File: Potongan TPP.xlsx
    tpp: {
      bjb: 0,
      gotroy: 0, // Gotong Royong
      bpr_otista: 0,
      bpr_pasar: 0,
      bendahara: 0,
      total: 0 // Total Potongan Eksternal TPP
    }
  },

  // --- HITUNGAN FINAL ---
  
  // 1. Take Home Pay GAJI (Gaji Bersih SIPD - Potongan Eksternal Gaji)
  // 3.772.800 - 40.000
  take_home_pay_gaji: 3732800,

  // 2. Take Home Pay TPP (TPP Bersih SIPD - Potongan Eksternal TPP)
  // 3.208.478 - 0
  take_home_pay_tpp: 3208478,

  // 3. TOTAL KESELURUHAN (Total yang masuk ke rekening)
  take_home_pay: 6941278
};

// --- HELPER UNTUK HISTORY ---
const generateDetail = (id, month, basicGapok) => {
  // Clone data currentSalary agar setiap bulan punya object sendiri
  const data = JSON.parse(JSON.stringify(currentSalary));
  data.id = id;
  data.month = month;

  // --- SIMULASI PERUBAHAN DATA UNTUK BULAN LALU ---
  
  // Skenario 1: Desember 2025 (Ada Potongan BJB)
  if (month.includes("Desember")) {
      data.potongan_eksternal.gaji.bjb = 500000; // Simulasi: Bulan lalu ada cicilan
      data.potongan_eksternal.gaji.zakat_fitrah = 0; // Tidak ada zakat fitrah
      
      // Recalculate Total Potongan Eksternal Gaji
      data.potongan_eksternal.gaji.total = 
          data.potongan_eksternal.gaji.korpri + 
          data.potongan_eksternal.gaji.dharma_wanita + 
          500000; // Total 520.000

      // Recalculate THP Gaji
      data.take_home_pay_gaji = data.gaji.jumlah_bersih - data.potongan_eksternal.gaji.total;
  } 
  
  // Skenario 2: November 2025 (Ada Zakat Mal)
  else if (month.includes("November")) {
      data.potongan_eksternal.gaji.zakat = 100000;
      
      // Recalculate Total
      data.potongan_eksternal.gaji.total = 
          data.potongan_eksternal.gaji.korpri + 
          data.potongan_eksternal.gaji.dharma_wanita + 
          data.potongan_eksternal.gaji.zakat_fitrah + 
          100000; // Total 140.000
      
      // Recalculate THP Gaji
      data.take_home_pay_gaji = data.gaji.jumlah_bersih - data.potongan_eksternal.gaji.total;
  }

  // Recalculate Grand Total (Gaji + TPP)
  data.take_home_pay = data.take_home_pay_gaji + data.take_home_pay_tpp;

  return data;
};

export const salaryHistory = [
  generateDetail(1, "Januari 2026", 2964000),
  generateDetail(2, "Desember 2025", 2964000),
  generateDetail(3, "November 2025", 2964000),
  generateDetail(4, "Oktober 2025", 2964000),
  generateDetail(5, "September 2025", 2964000),
];