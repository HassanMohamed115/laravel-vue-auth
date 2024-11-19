import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const { data } = await axios.post('/login', credentials);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      } catch (error) {
        throw error.response.data;
      }
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const { data } = await axios.get('/user');
        this.user = data;
      } catch (error) {
        this.logout(); // Clear the token if it's invalid
      }
    },
    async logout() {
      try {
        await axios.post('/logout', {}, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    },
  },
});
