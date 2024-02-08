<template>
  <HeaderComponent/>
  <div>
    <router-view/>
  </div>
  <FooterComponent/>
</template>

<script>
// import HomeComponent from "./components/homeComponent.vue"; 상대경로
// import HomeComponent from "@/components/homeComponent.vue"; // 절대경로 @는 jsconfig에 선언함
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  // 사용할 하위 컴포넌트 목록 나열
  components:{
    FooterComponent,
    HeaderComponent,
  }
}
</script>

<style>

</style>
