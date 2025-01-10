import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Courses from '../views/Courses.vue';
import Admin from '../views/Admin.vue';
import EditCourse from '../views/EditCourse.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/courses', name: 'Courses', component: Courses },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/edit/:id', name: 'EditCourse', component: EditCourse }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
