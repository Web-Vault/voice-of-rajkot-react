<template>
  <div class="auth-bg min-h-screen w-full flex items-center justify-center relative overflow-hidden">
    <!-- Animated Boiling Bubbles Letters (background) -->
    <div class="boiling-letters">
      <span v-for="(letter, i) in floatingLetters" :key="i" :class="['boil-letter', 'bl-' + i]">{{ letter.char }}</span>
    </div>
    <!-- Centered Card Form -->
    <div class="themed-card-form w-full max-w-md relative z-10">
      <div class="px-8 py-10 md:px-10 md:py-12">
        <h2 class="text-2xl font-bold mb-2 text-indigo-800 text-center">Forgot Password</h2>
        <p class="mb-8 text-gray-500 text-base text-center">Enter your email to receive a password reset link.</p>
        <form @submit.prevent="handleForgot" class="space-y-6">
          <div>
            <label for="email" class="themed-label">Email</label>
            <input id="email" v-model="email" type="email" class="themed-input" :class="{'input-error': error}" required />
            <transition name="fade"><span v-if="error" class="error-msg">{{ error }}</span></transition>
          </div>
          <button class="themed-btn w-full mt-2">Send Reset Link</button>
        </form>
        <div class="mt-8 text-sm text-center">
          <router-link to="/login" class="text-indigo-600 hover:underline">Back to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const error = ref('');

// Floating letters in various scripts
const floatingLetters = [
  { char: 'અ' }, // Gujarati
  { char: 'क' }, // Hindi
  { char: 'A' }, // English
  { char: 'ش' }, // Urdu/Arabic
  { char: '诗' }, // Chinese (poetry)
  { char: 'क' }, // Hindi
  { char: 'B' }, // English
  { char: 'ગ' }, // Gujarati
  { char: 'م' }, // Urdu/Arabic
  { char: '字' }, // Chinese
  { char: 'R' }, // English
  { char: 'પ' }, // Gujarati
  { char: 'न' }, // Hindi
  { char: 'C' }, // English
  { char: 'ક' }, // Hindi
  { char: 'દ' }, // Gujarati
];

function handleForgot() {
  error.value = '';
  if (!email.value) {
    error.value = 'Email is required.';
    return;
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
    error.value = 'Enter a valid email address.';
    return;
  }
  // Simulate sending reset link
  error.value = '';
  alert('Reset link sent!');
}
</script>

<style scoped>
.auth-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #6366f1 0%, #818cf8 100%);
  position: relative;
  overflow: hidden;
}
.boiling-letters {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.boil-letter {
  position: absolute;
  font-size: 2.2rem;
  font-weight: 700;
  opacity: 0.18;
  color: #fff;
  user-select: none;
  filter: blur(0.5px);
  animation: boilBubble 5.5s linear infinite;
}
/* Each letter gets a unique path, delay, and scale for a natural effect */
.bl-0 { left: 10%; bottom: 7%; animation-delay: 0s; transform: scale(1.1); }
.bl-1 { left: 22%; bottom: 10%; animation-delay: 1.1s; transform: scale(0.9); }
.bl-2 { left: 35%; bottom: 6%; animation-delay: 2.2s; transform: scale(1.2); }
.bl-3 { left: 48%; bottom: 8%; animation-delay: 0.7s; transform: scale(1.05); }
.bl-4 { left: 60%; bottom: 12%; animation-delay: 1.7s; transform: scale(0.95); }
.bl-5 { left: 72%; bottom: 9%; animation-delay: 2.8s; transform: scale(1.15); }
.bl-6 { left: 85%; bottom: 5%; animation-delay: 0.9s; transform: scale(1.05); }
.bl-7 { left: 15%; bottom: 13%; animation-delay: 2.4s; transform: scale(1.08); }
.bl-8 { left: 55%; bottom: 11%; animation-delay: 0.6s; transform: scale(1.12); }
.bl-9 { left: 80%; bottom: 7%; animation-delay: 3.5s; transform: scale(0.92); }
.bl-10 { left: 65%; bottom: 8%; animation-delay: 1.9s; transform: scale(1.18); }
.bl-11 { left: 25%; bottom: 12%; animation-delay: 2.7s; transform: scale(1.04); }
.bl-12 { left: 75%; bottom: 6%; animation-delay: 0.3s; transform: scale(1.09); }
.bl-13 { left: 40%; bottom: 10%; animation-delay: 1.5s; transform: scale(1.13); }
.bl-14 { left: 58%; bottom: 7%; animation-delay: 2.2s; transform: scale(0.97); }
.bl-15 { left: 90%; bottom: 8%; animation-delay: 0.8s; transform: scale(1.07); }
@keyframes boilBubble {
  0% { opacity: 0.18; transform: translateY(0) scale(1) rotate(0deg); }
  10% { opacity: 0.28; }
  60% { opacity: 0.22; }
  80% { opacity: 0.28; }
  90% { opacity: 0.18; }
  100% { opacity: 0; transform: translateY(-180px) scale(1.25) rotate(8deg); }
}
.themed-card-form {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 6px 32px #6366f13a, 0 1.5px 8px #a5b4fc22;
  border: 1.5px solid #e0e7ff;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  overflow: hidden;
}
.themed-label {
  display: block;
  font-size: 1.05rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.35rem;
  letter-spacing: 0.01em;
}
.themed-input {
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 0.7rem;
  border: 1.5px solid #e0e7ff;
  background: #f8fafc;
  font-size: 1.08rem;
  font-weight: 500;
  color: #22223b;
  box-shadow: 0 1.5px 8px #6366f111;
  outline: none;
  transition: border 0.16s, box-shadow 0.16s;
  margin-bottom: 0.1rem;
}
.themed-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #6366f133;
  background: #fff;
}
.input-error {
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
}
.error-msg {
  color: #ef4444;
  font-size: 0.97rem;
  margin-top: 0.1rem;
  display: block;
  min-height: 1.2em;
  letter-spacing: 0.01em;
  animation: shake 0.18s 1;
}
@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}
.themed-btn {
  background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 0.7rem;
  padding: 1.1rem 0;
  font-size: 1.13rem;
  margin-top: 0.2rem;
  transition: background 0.16s, box-shadow 0.16s, transform 0.13s;
  box-shadow: 0 2px 12px #6366f122;
  border: none;
  letter-spacing: 0.01em;
  outline: none;
}
.themed-btn:hover, .themed-btn:focus {
  background: linear-gradient(90deg, #818cf8 60%, #6366f1 100%);
  box-shadow: 0 6px 24px #6366f133;
  transform: translateY(-2px) scale(1.03);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.18s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 900px) {
  .themed-card-form {
    max-width: 98vw;
    border-radius: 1rem;
  }
}
</style> 