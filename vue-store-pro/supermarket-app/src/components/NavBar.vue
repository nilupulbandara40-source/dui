<template>
  <header class="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-extrabold text-white shadow-lg">
          FM
        </div>

        <div>
          <h1 class="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
            FreshMart
          </h1>
          <p class="text-xs text-slate-500 sm:text-sm">
            Modern supermarket shopping
          </p>
        </div>
      </div>

      <nav class="hidden items-center gap-6 lg:flex">
        <a href="#home" class="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
          Home
        </a>
        <a href="#departments" class="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
          Departments
        </a>
        <a href="#deals" class="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
          Deals
        </a>
        <a href="#catalog" class="text-sm font-semibold text-slate-700 transition hover:text-emerald-600">
          Products
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <button class="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 md:block">
          Delivery
        </button>
        <button class="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-emerald-700">
          Shop Now
        </button>
      </div>
    </div>
  </header>
</template>