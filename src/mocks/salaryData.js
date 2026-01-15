// src/mocks/salaryData.js

export const currentSalary = {
  periode: "Januari 2026",
  pegawai: {
    nama: "FATHURRACHMAN ABDUL MALIK",
    nip: "19970311 202012 1 004",
    jabatan: "PRANATA KOMPUTER PERTAMA",
    golongan: "III/a", // Golongan 3A
    unit_kerja: "Dinas Komunikasi dan Informatika", // Default (bisa disesuaikan)
    status_kawin: "Kawin",
    jumlah_anak: 1
  },

  // --- DATA GAJI (REAL DATA SIPD) ---
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
    // Tunjangan BPJS/Jaminan (Pemerintah)
    tunj_bpjs_kes: 154387, 
    tunj_jkk: 7114,
    tunj_jkm: 21341,
    tunj_tapera: 0,
    tunj_pensiun: 0,
    tunj_jht: 0, // Di data SIPD tidak menambah pendapatan (dipotong dari gapok)
    
    // POTONGAN
    potongan_iwp: 38597,
    potongan_pph21: 0,
    potongan_zakat: 0,
    potongan_bulog: 0,
    // Potongan BPJS/Jaminan
    potongan_bpjs_kes: 154387,
    potongan_jkk: 7114,
    potongan_jkm: 21341,
    potongan_tapera: 0,
    potongan_pensiun: 0,
    potongan_jht: 265574, // Ada nilai potongannya

    // TOTAL
    jumlah_kotor: 4259813, 
    jumlah_potongan: 487013,
    jumlah_bersih: 3772800
  },

  // --- DATA TPP (REAL DATA SIPD) ---
  tpp: {
    // PENDAPATAN
    beban_kerja: 773934,
    tempat_bertugas: 0,
    kondisi_kerja: 1382589,
    kelangkaan_profesi: 0,
    prestasi_kerja: 1160901,
    tunj_pph: 0,
    tunj_bpjs_kes: 132697, // Masuk dalam Total TPP
    tunj_jkk: 0,
    tunj_jkm: 0,
    tunj_tapera: 0,
    tunj_pensiun: 0,
    tunj_jht: 0,

    // POTONGAN
    potongan_iwp: 33174,
    potongan_pph21: 75772,
    potongan_zakat: 0,
    potongan_bulog: 0,
    // Potongan BPJS/Jaminan (Counterpart)
    potongan_bpjs_kes: 132697,
    potongan_jkk: 0,
    potongan_jkm: 0,
    potongan_tapera: 0,
    potongan_pensiun: 0,
    potongan_jht: 0,

    // TOTAL
    jumlah_kotor: 3450121, 
    jumlah_potongan: 241643, 
    jumlah_bersih: 3208478
  },

  // TOTAL FINAL (Gaji Bersih + TPP Bersih)
  take_home_pay: 6981278
};

// --- HELPER UNTUK HISTORY ---
const generateDetail = (id, month, basicGapok) => {
  // Clone data currentSalary
  const data = JSON.parse(JSON.stringify(currentSalary));
  data.id = id;
  data.month = month;
  // Sedikit variasi dummy untuk bulan lalu (optional)
  if (id > 1) {
      data.tpp.prestasi_kerja = 1100000; // Misal prestasi sedikit beda
      data.tpp.jumlah_kotor = 3389220; 
      data.tpp.jumlah_bersih = 3147577;
      data.take_home_pay = data.gaji.jumlah_bersih + data.tpp.jumlah_bersih;
  }
  return data;
};

export const salaryHistory = [
  generateDetail(1, "Januari 2026", 2964000),
  generateDetail(2, "Desember 2025", 2964000),
  generateDetail(3, "November 2025", 2964000),
  generateDetail(4, "Oktober 2025", 2964000),
  generateDetail(5, "September 2025", 2964000),
];