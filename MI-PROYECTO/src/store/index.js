import { createStore } from "vuex";

export default createStore({
  state: {
    courses: [
      {
        id: 1,
        name: "JavaScript Avanzado",
        slots: 20,
        enrolled: 10,
        duration: "25",
        cost: 30000,
        completed: false,
        registrationDate: "2022-06-03",
        description: "curso bueno avanzado en js",
        imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png",
      },
      {
        id: 2,
        name: "CSS para principiantes",
        slots: 35,
        enrolled: 23,
        duration: "12",
        cost: 10000,
        completed: false,
        registrationDate: "2022-05-03",
        description: "curso bueno para principiantes en css",
        imageLink: "https://ultimatecourses.com/assets/category/css-fcba6b473cb1125595dc28163be24eb673907258b5f6f6c82967a0587a9df20c.svg",
      },
    ],
  },
  mutations: {
    addCourse(state, course) {
      state.courses.push(course);
    },
    deleteCourse(state, courseId) {
      state.courses = state.courses.filter((course) => course.id !== courseId);
    },
    updateCourse(state, updatedCourse) {
      const index = state.courses.findIndex((course) => course.id === updatedCourse.id);
      if (index !== -1) {
        state.courses[index] = { ...updatedCourse };
      }
    },
  },
  actions: {
    addCourse({ commit }, course) {
      commit("addCourse", course);
    },
    deleteCourse({ commit }, courseId) {
      commit("deleteCourse", courseId);
    },
    updateCourse({ commit }, updatedCourse) {
      commit("updateCourse", updatedCourse);
    },
  },
  getters: {
    getCourses(state) {
      return state.courses;
    },
    getCourseById: (state) => (id) => {
      return state.courses.find((course) => course.id === id);
    },
  },
});
