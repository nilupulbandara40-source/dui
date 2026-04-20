<template>
  <section
    id="home"
    class="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-400 text-white"
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]"></div>

    <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
      <div class="max-w-2xl">
        <span class="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
          Grocery • Personal Care • Kitchen • Home
        </span>

        <h2 class="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          A professional supermarket layout for your mini project
        </h2>

        <p class="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
          Browse supermarket-style products with a cleaner layout, better interaction,
          and a more realistic department-based shopping experience.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <a
            href="#catalog"
            class="rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow-lg transition hover:scale-105"
          >
            Start Shopping
          </a>

          <a
            href="#deals"
            class="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Best Deals
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 self-center">
        <div class="rounded-3xl bg-white p-4 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
            alt="Fresh supermarket shelves"
            class="h-44 w-full rounded-2xl object-cover"
          />
          <div class="mt-4">
            <p class="text-sm font-bold text-slate-900">Fresh picks</p>
            <p class="text-xs text-slate-500">Smart supermarket browsing</p>
          </div>
        </div>

        <div class="mt-10 rounded-3xl bg-white p-4 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80"
            alt="Supermarket groceries basket"
            class="h-44 w-full rounded-2xl object-cover"
          />
          <div class="mt-4">
            <p class="text-sm font-bold text-slate-900">Interactive layout</p>
            <p class="text-xs text-slate-500">Different from normal projects</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>