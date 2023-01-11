<template>
  <Nav />

  <div class="row text-center align-middle justify-content-center">
    <div class="">
      <div class="col-sm mt-5">
        <h1>{{ username }}</h1>
      </div>
      <div class="col mt-5 mb-5">
        <img
          class="acc-img"
          :src="
            avatar_url
              ? avatar_url
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
          "
          alt="Profile picture"
        />
      </div>
      <div class="col mx-2" v-show="editPerfil">
        <label class=" mx-2"  for="name">Username</label>
        <input type="text" class=" mx-2"  v-model="username" />
        <label class=" mx-2"  for="avatar">Avatar</label>
        <input type="text" v-model="avatar_url" />
        <button class=" mx-2 border-1 rounded"  @click="changePerfil">Save</button>
      </div>
      <div class="">
        <button id="acc-btn" class="mt-3 border-1 rounded " @click="changeEditPerfil">Edit</button>
      </div>
    </div>
  </div>

  <footer :username="username"></footer>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const user_id = ref(null);

const profile = ref({
  avatar_url: "",
  created_at: "",
  name: "",
  username: "",
  website: "",
  user_id: "",
});

const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  console.log(profile.value);
  username.value = profile.value.username;
  avatar_url.value = profile.value.avatar_url;
  user_id.value = profile.value.user_id;
};
getProfile();

let editPerfil = ref(false);
const changeEditPerfil = () => {
  editPerfil.value = !editPerfil.value;
};

const changePerfil = async () => {
  changeEditPerfil();
  await userStore.changeProfile(
    username.value,
    avatar_url.value,
    user_id.value
  );
};

// async function signOut() {
//   try {
//     loading.value = true
//     let { error } = await supabase.auth.signOut()
//     if (error) throw error
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }
</script>

<style>

</style>
