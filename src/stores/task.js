import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },

    async addTask(title, description, category) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
          category : category,
          
        },
      ]);
    },
    
    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },
    // async toogleTask(id) {
    //     const { data, error } = await supabase.from("tasks").update().match({
    //         id: id,
    //       });
    //     this.tasks.is_complete = !this.tasks.is_complete;
    //   }
    async toogleTask(id, boolean) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete : !boolean
        })
        //.update({ is_complete: !this.is_complete })
        .match({
          id: id,
        })
    
    },
    async refreshTask(title, description, id) {
      const { data, error } = await supabase.from("tasks").update([
        {
          title: title,
          description: description,
        },
      ]).match({
        id: id
      });
    }
  },
});
