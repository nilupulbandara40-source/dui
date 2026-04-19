<template>
  <section class="bg-gradient-to-r from-emerald-700 to-green-600 text-white">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
      <div class="flex flex-col justify-center">
        <p class="mb-4 inline-block w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
          Everyday essentials
        </p>
        <h2 class="text-4xl font-extrabold leading-tight sm:text-5xl">
          Shop smart for your daily needs
        </h2>
        <p class="mt-5 max-w-xl text-base leading-7 text-emerald-50 sm:text-lg">
          Discover groceries, household products, beauty items, and more with a clean and modern supermarket experience.
        </p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#products"
            class="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-emerald-700 transition hover:scale-[1.02]"
          >
            Shop Now
          </a>
          <a
            href="#categories"
            class="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            Browse Categories
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-3xl bg-white/10 p-6 backdrop-blur">
          <p class="text-sm text-emerald-100">Fresh Picks</p>
          <h3 class="mt-2 text-xl font-bold">Daily Essentials</h3>
          <p class="mt-2 text-sm text-emerald-50">
            Find items for home, health, beauty, and everyday convenience.
          </p>
        </div>

        <div class="mt-10 rounded-3xl bg-white/10 p-6 backdrop-blur">
          <p class="text-sm text-emerald-100">Top Rated</p>
          <h3 class="mt-2 text-xl font-bold">Best Choices</h3>
          <p class="mt-2 text-sm text-emerald-50">
            Explore quality products with strong ratings and trusted brands.
          </p>
        </div>

        <div class="rounded-3xl bg-white/10 p-6 backdrop-blur">
          <p class="text-sm text-emerald-100">Fast Shopping</p>
          <h3 class="mt-2 text-xl font-bold">Quick Search</h3>
          <p class="mt-2 text-sm text-emerald-50">
            Filter what you need in seconds with category and search tools.
          </p>
        </div>

        <div class="mt-10 rounded-3xl bg-white/10 p-6 backdrop-blur">
          <p class="text-sm text-emerald-100">Modern Store</p>
          <h3 class="mt-2 text-xl font-bold">Responsive UI</h3>
          <p class="mt-2 text-sm text-emerald-50">
            Built for mobile, tablet, and desktop shopping experiences.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>