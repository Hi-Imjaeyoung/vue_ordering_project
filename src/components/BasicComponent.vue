<template>
    <h1>helle~! {{ MyLang }}</h1>
    <input type="text" value="모닝글로리"/>
    <!-- : value 는 v-bind:value= 의 약어다 -->
    <!-- v-bind는 input box에서 많이 사용하는 단뱡향 데이터 바인딩 방식이다.  -->
    <input type="text" :value="inputvalue1"/>
    <!-- v-model 양방향 데이터 바인딩 모델이라는 차이점 -->
    <!-- html에서 값을 바꾸면 변수에 적용..! -->
    <input type="text" v-model="inputvalue2"/>
    <!-- onclick과 같은게 @ 클릭이다 -->
    <button @click="showValue()">변수 변경사항 확인</button>
</template>
  
  <script>
  export default {
    data(){
      return{
        MyLang:"똠양꿍",
        inputvalue1:"쌀국수",
        inputvalue2:"팟타이",
      }
    },
    // vue 생명주기에서 인스턴스가 생성되는 시점을 created라고 하고, 화면이 열리기전에 실행되는 함수이다.
    // Api 요청이 화면이 열리기 전에 있어야 한다. 
    created(){
        this.MyLang = "짜조"
    },
    methods:{
      showValue(){
        alert(this.inputvalue2);
      }
    }
  }
  </script>