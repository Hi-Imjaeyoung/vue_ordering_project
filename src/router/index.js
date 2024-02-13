import {createRouter,createWebHistory} from 'vue-router';
import LoginComponent from '@/views/LoginComponent.vue';
// export default(export 를 하나만 할 경우)에는 중괄호 필요없다.
import {memberRoutes} from './memberRouter.js';
import {orderRoutes} from './orderRouter.js';
import {itemRoutes} from './itemRouter.js';
import ItemList from '@/views/ItemList.vue';
import Baisc from '@/components/BasicComponent.vue';


const routes = [
    {   
        // url 경로 지정
        path : '/',
        // router의 이름 지정
        name: 'HOME',
        component: ItemList,
    },
    {   
        path : '/login',
        name: 'DoLogin',
        component: LoginComponent,
    },
    {   
        path : '/basic',
        name: 'BASIC',
        component: Baisc,
    },
    // ...은 스프레드 연산자로 불리고 주로, 배열 요소를 다른 배열 요소에 합할때 사용
    ...memberRoutes,
    ...orderRoutes,
    ...itemRoutes,
    
];


const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    // 1) createWebHistory, createHashHistory
    history : createWebHistory(),
    routes  
});
export default router;