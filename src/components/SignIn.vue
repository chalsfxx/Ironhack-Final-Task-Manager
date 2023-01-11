<!-- COMPONENTE BOILERPLATE -->

<template>

  <!-- Section: Design Block -->
  <section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">

<img src="https://images.pexels.com/photos/4542842/pexels-photo-4542842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  class="img-fluid" alt="Sample image">

</div>
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mt-5 align-middle">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                <form @submit.prevent="signIn" class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" v-model="email" />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" class="form-control" v-model="password" />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Log In</button>
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <i class="small fw-bold mt-1  mb-0">
                      Don't have an account?
                      <!-- <a href="#!" class="link-danger">Sign up</a> -->
                      <PersonalRouter
                        :route="route"
                        :buttonText="buttonText"
                        class="sign-up-link"
                      ></PersonalRouter>
                    </i>
                  </div>

                </form>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
const email = ref("");
const password = ref("");
const redirect = useRouter();

// Arrow function to Signin user to supaBase
// const signIn = async () => {
//   try {} catch (error) {}
//};
// const logIn = async () => {

//     try {
//       // calls the user store and send the users info to backend to logIn
//       await useUserStore().logIn(email.value, password.value);
//       // redirects user to the homeView
//       redirect.push({ path: "/" });
//     } catch (error) {
//       // displays error message
//       errorMsg.value = error.message;
//       // hides error message
//       setTimeout(() => {
//         errorMsg.value = null;
//       }, 5000);
//     }
//     return;

//   errorMsg.value = "error";
// };
async function signIn() {
  await useUserStore().signIn(email.value, password.value);
  redirect.push({ path: "/" });
}
</script>

<style>

.rounded-t-5 {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }

    @media (min-width: 992px) {
      .rounded-tr-lg-0 {
        border-top-right-radius: 0;
      }

      .rounded-bl-lg-5 {
        border-bottom-left-radius: 0.5rem;
      }
    }

</style>
