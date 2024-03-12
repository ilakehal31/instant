<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const user = useSupabaseUser();

  const links = [{
    label: 'Gallerie',
    to: '/gallery'
  },
  {
    label: 'Prix',
    to: '/pricing'
  },
 {
    label: 'Blog',
    to: '/blog'
    },
    {
    label: 'Favoris',
    icon: 'i-heroicons-heart',
    to: '/favourites',
    children: [{
      label: 'Pricing',
      to: '/pro/pricing',
      icon: 'i-heroicons-heart',
      description: 'A simple pricing, for solo developers or teams.'
    }, {
      label: 'Templates',
      to: '/pro/templates',
      icon: 'i-heroicons-computer-desktop',
      description: 'Get started with one of our official templates.'
    }]
  }
  ];

//   if (user.value) {
//     baseLinks.push({ label: 'Profil', to: '/profile' });
//     baseLinks.push({ label: 'Déconnexion', to: '/logout' });
//   } else {
//     baseLinks.push({ label: 'Connexion', to: '/login' });
//     baseLinks.push({ label: 'Inscription', to: '/signup' });
//   }
// });

// const links = [{
//   label: 'Gallerie',
//   to: '/docs'
// }, {
//   label: 'Documentation',
//   to: '/pricing'
// }, {
//   label: 'Blog',
//   to: '/blog'
// }]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Instant <UBadge label="App" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UButton label="Se connecter" color="gray" to="/login" />
      <UButton label="S'enregistrer" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
