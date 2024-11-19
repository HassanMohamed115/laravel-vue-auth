<script setup>
import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRoute,useRouter} from 'vue-router';

const route = useRoute();
 const isActive = (path) => route.path === path;

 const router = useRouter()
const authStore = useAuthStore()

const logout = async() =>{
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}
       
</script>

<template>


    <!-- Font Awesome Link for Icons -->
    <nav>
      <!-- Checkbox for toggling menu -->
      <input type="checkbox" id="check">
  
      <!-- Menu icon -->
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
  
      <!-- Site logo -->
      <label class="logo">Hassan Mohamed</label>
  
      <!-- Navigation links -->
      <ul>
        <li><RouterLink to="/home" :class="{ active: isActive('/home') }">Home</RouterLink></li>
        <li><RouterLink to="/about" :class="{ active: isActive('/about') }">About</RouterLink></li>
        <li><a @click="logout" v-if="authStore.user">Logout</a></li>
        <li><RouterLink to="/">Contact</RouterLink></li>
        <li><RouterLink to="/">Feedback</RouterLink></li>
      </ul>
    </nav>
  
  
  
  
    </template>
    