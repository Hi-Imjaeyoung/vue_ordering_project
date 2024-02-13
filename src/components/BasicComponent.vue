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
    <div>
        <h2>카운트 값 출력</h2>
        <button @click="increa()">icvreament</button>
    </div>
    <!-- <div>
        <h2>더블 카운트 값 출력</h2>
        <button @click="increa()">icvreament</button>
    </div> -->
</template>
  
  <script>
  export default {
    // 종속된 반응영 데이터가 변겨오딜때만 함수ㅜ를 다시 실행하여 값을 변경하는 계산 함수다
    // computed:{
        
    // },
    data(){
      return{
        MyLang:"똠양꿍",
        inputvalue1:"쌀국수",
        inputvalue2:"팟타이",
        count : 0,
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
      },
      increa(){
        this.count++;
      }
    }
  }
  </script>