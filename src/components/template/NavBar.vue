<template>
  <li>
    <router-link :to="{ name: 'LandingIndex' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >Home</span
      ></router-link
    >
  </li>
  <li>
    <router-link :to="{ name: 'LandingProfile' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >Profile</span
      ></router-link
    >
  </li>
  <li>
    <router-link :to="{ name: 'LandingPortofolio' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >Portofolio</span
      ></router-link
    >
  </li>
  <li>
    <router-link :to="{ name: 'LandingTool' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >Tools & Resources</span
      ></router-link
    >
  </li>
  <li>
    <router-link :to="{ name: 'LandingHandbook' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >My Handbook</span
      ></router-link
    >
  </li>
  <li>
    <router-link :to="{ name: 'LandingLogin' }">
      <span class="text-base-content font-normal text-sm hover:link"
        >Login</span
      ></router-link
    >
  </li>
</template>
