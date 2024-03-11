import OrderList from "@/views/OrderList.vue";
import CartList from "@/views/OrderCart.vue";

export const orderRoutes = [
    {   
        path : '/orders',
        name: 'OrderList',
        component: OrderList,
    },
    {   
        path : '/ordercart',
        name: 'CartList',
        component: CartList,
    },
];