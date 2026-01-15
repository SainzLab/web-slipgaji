<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
    
    <div class="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      <div class="hidden md:flex md:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
        <div class="absolute bottom-0 right-0 w-80 h-80 bg-orange-500 rounded-full blur-[120px] opacity-20"></div>

        <div class="relative z-10">
           <h1 class="text-4xl font-bold leading-tight mb-4">
             Kelola Gaji & Tunjangan Anda Lebih Mudah.
           </h1>
           <p class="text-blue-200 text-lg">
             Akses slip gaji, riwayat pendapatan, dan informasi tunjangan kinerja dalam satu dashboard terintegrasi.
           </p>
        </div>

        <div class="relative z-10 text-sm text-slate-400">
          &copy; -----
        </div>
      </div>

      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
        
        <div class="mb-8 text-center md:text-left">
           <h2 class="text-3xl font-bold text-slate-800 mb-2">Selamat Datang!</h2>
           <p class="text-gray-500">Silakan masuk menggunakan NIP dan Password Anda.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
              </span>
              <input 
                v-model="form.nip"
                type="text" 
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Contoh: 19970311..."
                required
              >
            </div>
          </div>

          <div>
            <div class="flex justify-between mb-1">
               <label class="block text-sm font-medium text-gray-700">Password</label>
               <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Lupa Password?</a>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
              </span>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Masukkan password..."
                required
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
             <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             {{ isLoading ? 'Memproses...' : 'Masuk Sekarang' }}
          </button>

          <p v-if="errorMessage" class="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">
            {{ errorMessage }}
          </p>

        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Belum punya akun? <a href="#" class="text-blue-600 font-medium hover:underline">Hubungi Admin</a>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { currentSalary } from '../mocks/salaryData.js'; // Import data pegawai

const emit = defineEmits(['login-success']);

const form = reactive({
  nip: '',
  password: ''
});

const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  isLoading.value = true;
  errorMessage.value = '';

  // Simulasi Delay Server (1.5 detik)
  setTimeout(() => {
    
    // 1. Ambil NIP dari data dummy dan hilangkan spasinya
    // (Contoh: "19970311 202012 1 004" menjadi "199703112020121004")
    const validNip = currentSalary.pegawai.nip.replace(/\s/g, '');
    
    // 2. Password Dummy (Kita set 'admin' atau '123456')
    const validPassword = 'admin';

    // LOGIC VALIDASI SEDERHANA
    // User harus memasukkan NIP yang benar ATAU memasukkan '123456' (sebagai backdoor dev)
    if ((form.nip === validNip || form.nip === '123456') && form.password === validPassword) {
       isLoading.value = false;
       emit('login-success'); // Login Sukses -> Kirim sinyal ke App.vue
    } else {
       isLoading.value = false;
       errorMessage.value = `Login Gagal. Coba NIP: ${validNip} dan Password: admin`;
    }

  }, 1500);
};
</script>