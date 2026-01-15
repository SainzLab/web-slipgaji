<template>
  <div class="mb-8 max-w-2xl mx-auto">
    
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900">Ubah Password</h1>
      <p class="text-sm text-gray-500 mt-1">Perbarui kata sandi akun Anda secara berkala untuk keamanan.</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-700 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <div>
          <h4 class="text-sm font-bold">Berhasil!</h4>
          <p class="text-sm">{{ successMessage }}</p>
        </div>
      </div>

      <form @submit.prevent="handleUpdatePassword" class="space-y-6">
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password Lama</label>
          <div class="relative">
            <input 
              v-model="form.oldPassword"
              :type="showOld ? 'text' : 'password'"
              class="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Masukkan password saat ini"
              required
            >
            <button type="button" @click="showOld = !showOld" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
              <svg v-if="!showOld" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
            </button>
          </div>
        </div>

        <div class="h-px bg-gray-100 my-4"></div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password Baru</label>
          <div class="relative">
            <input 
              v-model="form.newPassword"
              :type="showNew ? 'text' : 'password'"
              class="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Minimal 6 karakter"
              required
            >
            <button type="button" @click="showNew = !showNew" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
               <svg v-if="!showNew" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
               <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
            </button>
          </div>
          <div class="mt-2 flex gap-1 h-1">
             <div :class="['flex-1 rounded-full transition-colors duration-300', passwordStrength >= 1 ? 'bg-red-400' : 'bg-gray-200']"></div>
             <div :class="['flex-1 rounded-full transition-colors duration-300', passwordStrength >= 2 ? 'bg-yellow-400' : 'bg-gray-200']"></div>
             <div :class="['flex-1 rounded-full transition-colors duration-300', passwordStrength >= 3 ? 'bg-green-400' : 'bg-gray-200']"></div>
          </div>
          <p class="text-xs text-gray-400 mt-1" v-if="form.newPassword">Kekuatan: {{ strengthLabel }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password Baru</label>
          <div class="relative">
            <input 
              v-model="form.confirmPassword"
              type="password"
              class="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              :class="{'border-red-300 focus:ring-red-200': !isMatch && form.confirmPassword}"
              placeholder="Ulangi password baru"
              required
            >
          </div>
          <p v-if="!isMatch && form.confirmPassword" class="text-xs text-red-500 mt-1">Password tidak cocok.</p>
        </div>

        <div class="pt-4">
          <button 
            type="submit" 
            :disabled="isLoading || !isValidForm"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
             <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const showOld = ref(false);
const showNew = ref(false);
const isLoading = ref(false);
const successMessage = ref('');

const isMatch = computed(() => {
  return form.newPassword === form.confirmPassword;
});

const passwordStrength = computed(() => {
  const p = form.newPassword;
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 8 && /[A-Z]/.test(p)) s++;
  if (p.length >= 10 && /[0-9]/.test(p)) s++;
  return s;
});

const strengthLabel = computed(() => {
  const s = passwordStrength.value;
  if (s === 1) return 'Lemah';
  if (s === 2) return 'Sedang';
  if (s === 3) return 'Kuat';
  return '';
});

const isValidForm = computed(() => {
  return form.oldPassword && form.newPassword.length >= 6 && isMatch.value;
});

const handleUpdatePassword = () => {
  isLoading.value = true;
  successMessage.value = '';

  setTimeout(() => {
    isLoading.value = false;
    successMessage.value = 'Password berhasil diperbarui. Silakan gunakan password baru untuk login berikutnya.';
    form.oldPassword = '';
    form.newPassword = '';
    form.confirmPassword = '';
  }, 1500);
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>