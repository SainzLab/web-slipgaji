<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      
      <div @click="$emit('close')" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

      <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
        
        <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        <h3 class="text-lg font-bold text-slate-800 mb-2">Fitur Belum Tersedia</h3>
        <p class="text-sm text-gray-500 mb-6">
          Maaf, fitur ini sedang dalam tahap pengembangan. Silakan kembali lagi nanti!
        </p>

        <button 
          @click="$emit('close')"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          Oke, Mengerti
        </button>

      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps(['isOpen']);
defineEmits(['close']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>