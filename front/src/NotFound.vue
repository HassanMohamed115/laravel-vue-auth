<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
</script>

<template>
    <div>
        <h1> Not Found Page </h1>
        <RouterLink :to="{name:'home'}"> go to the home page</RouterLink>
        <RouterView />
    </div>
</template>