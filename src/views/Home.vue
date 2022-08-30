<template>
  <div class="wrapper">

    <div class="lp">
      <img class="bg" src="../../public/img/hdchurch.jpg">
      


        <h1  :style="{'color':  theColor}" >
          <VueWriter :array="arr"
            :typeSpeed="80"
            :eraseSpeed="50"
            :delay="1000"
            :interval="300"
            :start="1750"
          />
        </h1>

        <h2>礼拝は、毎週日曜午前１０時から１１時３０分まで</h2>
    </div>
     
    <div class="content">
      <div class="content-wrapper"> 
        <div id="main-content" class="center-column"> 
          <div class="main-content-wrapper corona"> 
             
              <h1>新型コロナの感染拡大について</h1>

              <span style="width: 50%;">２．【マスクの着用】イベント当日は、感染予防のため、マスクの着用をお願いしま
す。
３．【説明会場の換気】会場は換気のため、適宜、窓やドアなどを開けます。室温の
高低に対応できるよう服装には注意してください。
４．【体調不良の方】新型コロナウイルス感染症など（学校保健安全法で出席の停止
が定められている感染症）に罹患し治癒していない方、また、①発熱、②軽度であ
っても咳などの風邪の症状が続く、③強いだるさ（倦怠感）、④息苦しさ（呼吸困
難）のいずれかの症状がある方、新型コロナウイルスの感染が疑われる方は、他の
参加者への感染のおそれがあるため、当日の参加を控えていただくようお願いしま
す。
※一部の会場では、大学等の施設管理者側より入館時に検温を義務付けられていま
すので、ご協力ください。
５．【密集の回避】受付では密集を避けるため、貼り紙や職員の指示に従って他の参
加者との身体的距離を保つようにしてください。
６．【接触確認アプリのインストール】厚生労働省 接</span>
             
          </div> 
        </div> 
      </div>

      
    </div>

    <div class="space" style="height: 2000px; ">

    </div>

  </div>

   
</template>

<script>
import VueWriter from "vue-writer";
// import { GoogleMap, Marker } from "vue3-google-map";

import {amenities} from '../const/amenities.js'
// import VueGoogleMaps from '@fawmi/vue-google-maps';


export default {
  components: { 
    VueWriter,
    // GoogleMap, 
    // Marker,
    // VueGoogleMaps
  },
  data(){
    return{
      reasonIndex: 0,
      totalClick: 0,
      theColor: 'white',
      arr: ['上賀茂教会へようこそ！', 'Welcome to Kamigmamo Church!',],

      picArr:[],
      amenities,

      showModal: false,
      modalStatus: 1,





    }
  },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };

    return { center };
  },
  methods: {
    nextReason(){
      console.log('uep')
      this.totalClick++
      if(this.reasonIndex+1 !==this.reasonsImages.length){
        this.reasonIndex++
      }else{
        this.reasonIndex = 0
      }
    },

    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },

    async keepChangingColor(){
      let count =0 
      while(count < 1000){

        this.theColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
        let string = this.theColor
        console.log(`%c${string}` ,`color:${string}`)
        await this.sleep(3500)
        count++

      }

    },

    modal(){
      console.log('showing')
      this.showModal = true
    },
  },
  

  computed:{
    reasonsImages() {
      return [
        require("../assets/images/travel.jpg"),
        require("../assets/images/yukata.jpg"),
        require("../assets/images/kinkaku.jpg"),
        require("../assets/images/maiko.jpg"),
        require("../assets/images/bus.jpg")
      ];
    },

    reasonsArticle(){
      return [
        'trave is nice',
        'yukata is cute',
        'kinkaku is nice as ',
        'maiko nice',
        'bus is convenient as',

      ]
    },

    rentalDescriptions() {
      return [
        {imgLink: require("../assets/images/bikes/bike1.webp"),title: 'アプリで簡単登録', description:`アプリから会員登録。お手持ちの交通系ICカードがあれば、ワンタッチで自転車の錠が開き乗りだせます。`},
        {imgLink: require("../assets/images/bikes/bike2.webp"),title: '簡単スタート', description:`借りた場所に戻さなくても目的地近くのサイクルポートに返却可能`},
        {imgLink: require("../assets/images/bikes/bike3.webp"),title: 'ラクラク乗れる', description:`電動アシスト付き自転車だから坂道でも楽々。`},
        {imgLink: require("../assets/images/bikes/bike4.webp"),title: '簡単ロック', description:`自転車に各種損害保険を付保。すぐに借りれる！`}
      ];
    },
  },

  watch:{
    reasonIndex(){
      console.log('jeu')
      this.totalClick++
    }
  },



  name: 'Home',
}
</script>

<style>

img.bg {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);

  object-fit: cover;
  /* object-position: -100px 0px; */
  background-size : cover;
  -webkit-background-size: cover;
     -moz-background-size: cover;
       -o-background-size: cover;
          background-size: cover;
  width: 100vw;
  height: auto;
  max-height: 100vh; 

  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
}

.lp h1{
  position: absolute;
  top: 23vh;
  left: 150px;
  z-index:1;
  font-size: 300%;
  color: white;
}

.lp h2 {
  padding: 0.5em;/*文字周りの余白*/
  color: white;/*文字色*/
  background: grey;/*背景色*/
  border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
  position: absolute;
  top: 65vh;
  /* left: 150px; */
  z-index:1;
  font-size: 300%;
  color: white;
  font-size: 200%;
  left: 50%;
  transform: translateX(-50%);
  /* width: 0%; */
}


.is-typed {
  /* font-family: "Monaco"; */
  font-family: 'Cursive';
}

.is-typed span.typed {
  /* color: black; */
}

.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  /* background-color: black; */
  animation: blink 1s infinite;
}

.is-typed span.underscore {
  display: inline-flex;
  width: 10px;
  height: 1px;
  align-items:flex-end;
  /* background-color: black; */
  animation: blink 1s infinite;
}

.is-typed span.cursor.typing {
  animation: none;
}

@keyframes blink {
  49% {
    background-color: #2c3e50;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}


/* ----------------------------------- */
.content{
  margin-top: 200px;
}

/* ----------------------------------- */
.corona{
  width: 50%;
  margin: 0 auto;
}
/* ----------------------------------- */
.welcome{
  /* background-color: red; */
  margin: auto;
  margin-top: 150px;
  /* margin-bottom: 200px; */

  text-align: center;
  width:85%;
  max-width: 950px;
}

.welcome div{
  width: 50%;
  float: left;
  /* padding: 20px; */
  display: flex;
}

.welcome .left-section{
  /* background-color: red; */
  /* margin-right: 0; */
  /* text-align: right; */
}

.welcome .right-section{
  /* display:  */
  position: relative;
  display: inline-block;
  z-index: 3;
  /* background-color: blue; */
}


.welcomePic1{
  width: auto;
  height: 250px;
  z-index: 2;

  margin-top: 225px;
  margin-left: -100px;
  margin-right: -50px;
}

.welcomePic2{
  width: auto;
  height: 550px;
  z-index:1;

  /* margin-left: 150px; */
}


.welcome .right-section h2{
  z-index: 3;
  margin-top: 100px;
  text-align: left;
  margin-left: -70px;
  font-size: 250%;
  /* height: 100; */
  /* -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl; */
}

.welcome .right-section div{
  position: relative;
  display: inline-block;
  width: 70%;
  margin-top: 75px;
  margin-left: 120px;
}

.welcome .right-section h3{
  z-index: 3;
  color: #04AA6D;
  margin-bottom: 30px;
}

.welcome .right-section {
  z-index: 3;
  /* margin-left: 200px; */
  text-align: left;
  
}

/* --------------------------------------------------- */

.reasons{
  /* background-color: red; */
  margin: auto;
  margin-top: 350px;
  margin-bottom: 50px;

  text-align: center;
  width:95vw;
  max-width: 1250px;
  display: inline-block;

  display:flex;
  
}

.reasons div{
  /* width: 50%; */
  float: left;
  display: flex;
  overflow: visible;
  margin-top: 100px;
}

.reasons .left-section{
  width:70%;
  /* background-color: blue; */
}

.reasons .right-section{
  
  /* background-color: #04AA6D; */
  width: 55vw;
  height: 50vh;
  
  /* transition : all 0.6s ease 0s; */
  display: inline;
  position: relative;
  /* position: relative; */
  /* background-color: black; */
  /* background-color: red; */
}

.reasons .right-section img{

  position: absolute;
  left: 0;
  /* position: relative; */
  /* z-index: 0; */
  /* display:; */
  /* top:0; */
  /* right:5vw; */
  object-fit: cover;
  /* width: 55vw;
  height: 50vh; */
  width: 100%;
  height: 100%;
  /* margin-left: -10vw; */
  border-radius: 25px;

  /* opacity: 0.5; */


  position:absolute;
}


.reasons h3{
  color:#04AA6D;
  margin-bottom: 20px;
  font-size: 150%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

/* ----------------------------------------------- */



/* *{margin:0;padding:0;box-sizing:border-box;}
body{background:teal;color:#fff;padding-bottom:10%;} */
/* h1{text-align:center;margin:20% 0 5%;font-family:verdana;font-weight:100;} */
#radios{

  position:relative;
  width:50%;
  margin:0 auto;
  top: 90%;
  left: 22.5vw;
  transform: translate(-50%, -50%);

}
input[type="radio"]{
  position:absolute;
  right:1000%;
}
label{
  float:left;
  width:10%; padding-bottom:10%;
  margin:0 2.5%;
  background: gray;
  border-radius:50%;
  cursor:pointer;
}
#slider{
  position:absolute;
  left:0%; top:0;
  width:5%; padding-bottom:5%;
  margin:2.5% 0 0 5%;
  background:#fff;
  transition:transform 1s;
  border-radius:50%;
  animation-timing-function: ease-in-out;
  animation-duration:.3s;
  animation-fill-mode: forwards;
  transition: 1.5s left .05s ease-in-out;
}
#input1:checked  ~ #slider{ animation-name: input1; left:0; }
#input2:checked  ~ #slider{ animation-name: input2; left:15%; }
#input3:checked  ~ #slider{ animation-name: input3; left:30%; }
#input4:checked  ~ #slider{ animation-name: input4; left:45%; }
#input5:checked  ~ #slider{ animation-name: input5; left:60%; }

@keyframes input1{ 30%, 70% { transform:scale(0.5); } }
@keyframes input2{ 30%, 70% { transform:scale(0.5); } }
@keyframes input3{ 30%, 70% { transform:scale(0.5); } }
@keyframes input4{ 30%, 70% { transform:scale(0.5); } }
@keyframes input5{ 30%, 70% { transform:scale(0.5); } }


/* ----------------------------------------------------------- */

.rental{
  /* background-color: red; */
  margin: auto;
  margin-top: 150px;
  margin-bottom: 200px;

  text-align: center;
  width:100vw;
  /* height: 100 */
  /* max-width: 1150px; */
  display: inline-block;

  display:flex;
  
}

.rental div{
  
  /* width: 50%; */
  float: left;
  display: flex;
  overflow: visible;
  margin-top: 50px;
}
/*  */


.rental .left-section{
  position: relative;
  display: initial;
  width:50%;
  background-color:  rgba(63,95,50,0.05);
  margin-top: 70px;
  /* margin-bottom: 250px; */
  /* background-color: blue; */
}


.rental .right-section{
  width: 40%;
  margin-left: 5%;
  height: 50vh;
  display: inline;
  position: relative;
}


.rental .left-section div{
  width: 50%;
  margin: 0 auto;
  
  /* background-color: #04AA6D; */
  /* background-color: blue; */
}

.rental .left-section img{
  position: absolute;
  width: 60%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  display: block;
}


.rental .right-section ul{
  /* position: relative; */
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  margin-top: -40px;
  margin-bottom: 25px;
  /* display: block; */
}

.rental .right-section li{
  position: relative;
  display: inline;
  width: 40%;
  margin: 0 5%;
  margin-top: -20px;
}

.rental .right-section li .text-wrapper{
  display: inline;
}


.rental .img-wrapper{
  display: inline
}



.rental .right-section .img img{
  display: inline;
  width: 60%;
  /* left: 90%; */
  margin: 0 auto;
  margin-top: -25px;
  margin-bottom: -25px;
}


.rental .right-section .title{
  color: #ca0029;
  font-weight: 700;
  margin-bottom: 10px;
  /* width: 100%; */
  
  /* display: initial; */
  /* width: 40%; */
  /* margin: 0 5%; */
}


/* -------------------------------------------------- */
.amenities .content{
  width: 80%;
  margin: 0 auto;
  /* padding-right: 5px; */
  /* padding-left: 5px; */
  color: #2c3e50;
  /* margin-top: 20px; */
  /* position: relative; */
  /* background-color: red; */
  display: flex;
  /* width: 100%; */

  /* background: tomato; */
  /* display: flex; */
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;

}
.amenities .content div {
  /* background-color: #939597; */
  /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
  transition: 0.3s;
  width: 30%;
  border-radius: 5px;
  margin-left: 1.5%;

  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);  */
  padding: 30px 0px;
  text-align: center;
  background-color: #f1f1f1;
  margin-bottom: 15px;
  height: auto;
  font-size: 80%;
}


.amenities .line-break {
  width: 100%;
}

/* ------------------------ */





</style>
