<template>
  <div class="mb-8">
    <div class="flex justify-between items-end mb-6">
      <div>
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Government Portal
        </h2>
        <h1 class="text-3xl font-bold text-slate-900">My Salary Dashboard</h1>
      </div>
    </div>

    <div class="bg-white rounded-t-xl p-6 border-b border-gray-100 flex justify-between items-center shadow-sm">
      <h3 class="text-lg font-bold text-slate-800">{{ currentSalary.periode }}</h3>
      
      <button class="flex items-center space-x-2 bg-[#1e293b] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-slate-900/10">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Download PDF</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { currentSalary } from '../mocks/salaryData.js';
</script>