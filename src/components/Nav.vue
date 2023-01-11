<template>

  <nav id="nav" class="navbar navbar navbar-expand-lg   d-flex mb-3">
    <div  class="navbar container-fluid text-center p-2 justify-content-between ">
      <router-link to="/" i class="navbar-brand ms-4">Ω</router-link>
      <h5 class="align-middle justify-content-center mt-2 ms-2"><router-link  class="Task-manager nav-link active" aria-current="page" to="/">Task Manager</router-link></h5>
      <button 
        class=" navbar navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class=" collapse navbar-collapse justify-content-end text-center marker:dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="navbarNavDropdown">
        <ul id="nav" class="navbar-nav">
           <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/account">Account</router-link>
          </li>
          <li @click="signOut" class="nav-item">
            <a class="nav-link" href="#">Log out</a>
          </li> 
            </ul>

       
     
      </div>
    </div>
  </nav>

</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import SignIn from "./SignIn.vue";
import router from "../router";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

// const signOut = async () => {
//   try {
//     // call the user store and send the users info to backend to signOut
//     // then redirect user to the homeView
//   } catch (error) {}
// };

async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}

</script>

<style>

</style>
