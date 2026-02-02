<template>
  <div class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
        <p class="text-xl text-gray-600">Choose the perfect plan for your needs</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Free Plan -->
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Starter</h3>
          <div class="text-4xl font-bold text-gray-900 mb-6">$0<span class="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Basic Templates
            </li>
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Community Support
            </li>
          </ul>
          <button class="w-full py-3 px-6 rounded-lg bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </div>

        <!-- Pro Plan -->
        <div class="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-500 relative transform scale-105">
          <span class="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</span>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Professional</h3>
          <div class="text-4xl font-bold text-gray-900 mb-6">$29<span class="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              All Templates
            </li>
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Priority Support
            </li>
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Commercial License
            </li>
          </ul>
          <button class="w-full py-3 px-6 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors">
            Upgrade Now
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Enterprise</h3>
          <div class="text-4xl font-bold text-gray-900 mb-6">$99<span class="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Custom Solution
            </li>
            <li class="flex items-center text-gray-600">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              24/7 Support
            </li>
          </ul>
          <button class="w-full py-3 px-6 rounded-lg bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
