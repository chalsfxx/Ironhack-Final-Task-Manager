<template>
  <div class="">
    <div class="row">
      <div class=" ">
        <h1 class="mb-4 col">Add a new Task</h1>
        <div v-if="showErrorMessage">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="border-1 rounded-1 ms-3 col">
          <div class="input-field">
            <input
              class="w-50"
              type="text"
              placeholder="Add a Task Title "
              v-model="name"
            />
          </div>
          <div class="input-field mt-3 mb-3">
            <input
              class="w-50"
              type="text"
              placeholder="Add a Task Description"
              v-model="description"
            />
          </div>
          <div class="">
            <label class="mt-2 mb-3 mx-3" for="cars">Category</label>
            <select name="cars" id="cars" form="carform" v-model="category">
              <option :v-model="category" >Work</option>
              <option :v-model="category">Personal Life</option>
              <option :v-model="category">To-Buy</option>
              <option :v-model="category">Travel</option>
            </select>
            <!-- <select class="form-select" enabled>
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
</select> -->
            
          </div>
          <button @click="addTask" class="button mt-2 border-1 rounded mb-3">
              Add Task
            </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const category = ref("");

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const emit = defineEmits(["getTasks"]);

// Arrow function para crear tareas.
const addTask = async () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // need to assign the prop to the function addTask so it will filter the new task added
    await taskStore.addTask(name.value, description.value, category.value);
    name.value = "";
    description.value = "";
    category.value = "";

    emit("getTasks");
  }
};

</script>

<style scoped>
button {
  background-color: var(--jet);
  color: var(--gainsboro);
}
</style>
