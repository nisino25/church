<template>
  <div class="wrapper">

    <div class="lp">
      <img class="bg" src="../../public/img/main.jpg">
      


        <h1  :style="{'color':  theColor}" >
          <VueWriter :array="arr"
            :typeSpeed="80"
            :eraseSpeed="50"
            :delay="1000"
            :interval="300"
            :start="1750"
          />
        </h1>

        <h2>礼拝は、毎週日曜午前１０時３０分から１１時４５分まで</h2>
    </div>
     
    <div class="content">
      <div class="content-wrapper"> 
        <div id="main-content" class="center-column"> 
          <div class="main-content-wrapper notice"> 
            <div>
              <h1 style="width: 70%; margin: auto auto;">故深田未来生（みきお）牧師告別礼拝のお知らせ</h1><br><br>
              <div>
                <div class="left-section">
                  <div>

                    <img src="../../public/img/fukada2.jpg" alt="">
                  </div>

                </div>

                <div class='right-section'>

                  <p>当教会の設立者の一人であった深田未来生牧師（同志社大学神学部名誉教授）は、2022年6月25日、89歳で米国カリフォルニア州クレアモントにおいて帰天されました。</p><br>
                  <p>日本における追悼礼拝は、以下のとおり執り行われる予定です。<br>
                  2022年10月29日（土）14時～ <br>
                  日本基督教団洛陽教会（京都市上京区寺町通荒神口下る松蔭町141-2）<br><br>
                  なお、同追悼礼拝は、zoom配信される予定です。配信を希望される方は、当教会のメールアドレス(kyoto.kamigamo.kyokai@gmail.com)までお知らせ下さい。
                  </p>
                  <br><br>

                  <div class=""> 
             
                      <GoogleMap api-key="AIzaSyDypz7XN6k4Q1gEj6mKRt65nAbpOelob8o" style="width: 100%; height: 500px" :center="center" :zoom="15">
                        <Marker :options="{ position: center }" />
                      </GoogleMap>
                  </div> 
                  


                  <p><span></span></p>

                </div>

              </div>

              
              



            </div>
             
              
             
          </div> 
        </div> 
      </div>
      <div class="content-wrapper"> 
        <div id="main-content" class="center-column"> 
          <div class="main-content-wrapper corona"> 
            <div>
              <h1>新型コロナの感染拡大について</h1><br><br>

              <div>

                <p><span>【マスクの着用】</span>感染予防のため、マスクの着用をお願いします。</p>

                <p><span>【礼拝会場の換気】</span>換気のため、適宜、窓やドアなどを開けます。室温の高低に対応できるよう服装には注意してください。</p>

                <p><span>【体調不良の方】</span>新型コロナウイルス感染症などに罹患し治癒していない方、また、①発熱、②軽度であっても咳などの風邪の症状が続く、③強いだるさ（倦怠感）、④息苦しさ（呼吸困難）のいずれかの症状がある方、新型コロナウイルスの感染が疑われる方は、他の参加者への感染のおそれがあるため、当日の参加を控えていただくようお願いします。</p>

                <p><span>【密集の回避】</span>密集を避けるため、身体的距離を保つようにしてください。</p>

                <p><span></span></p>

              </div>

            </div>
             
              
             
          </div> 
        </div> 

        <div class="location">
          <h4>上賀茂教会の住所 アクセス</h4>
          <span>住所：〒603-8071 京都市北区上賀茂北大路町１７</span><br>
          <span>Tel&Fax : 075-723-7408</span><br>
          <span>E-Mail : kyoto.kamigamo.kyokai@gmail.com</span><br>
          

          <img src="../../public/img/drawing.jpg" alt="" class="churchPic">
          <img src="../../public/img/map.jpg" alt="" class="mapPic">
          <br><br>

          <div class="" style="width: 80%; margin: auto auto">    
            <GoogleMap api-key="AIzaSyDypz7XN6k4Q1gEj6mKRt65nAbpOelob8o" style="width: 100%; height: 500px" :center="center2" :zoom="15">
              <Marker :options="{ position: center2 }" />
            </GoogleMap>
          </div> 

          


          
        </div>
      </div>

      
    </div>

    <!-- <div class="space" style="height: 1000px; ">

    </div> -->

  </div>

   
</template>

<script>
import VueWriter from "vue-writer";
import { GoogleMap, Marker } from "vue3-google-map";
// // 
import {amenities} from '../const/amenities.js'

// import {googleMapApiKey} from '../../.env'

export default {
  components: { 
    VueWriter,
    GoogleMap, 
    Marker,
  },
  data(){
    return{
      reasonIndex: 0,
      totalClick: 0,
      theColor: 'white',
      arr: ['京都上賀茂教会へようこそ！', 'Welcome to Kyoto Kamigmamo Church!',],

      picArr:[],
      amenities,

      showModal: false,
      modalStatus: 1,
      // googleMapApiKey,  
      





    }
  },
  setup() {
    const center = { lat: 35.01834413663081,  lng: 135.76761230587275, };
    const markerOptions = { position: center, label: "日本基督教団洛陽教会", title: "日本基督教団洛陽教会" };
    const center2 = { lat: 35.05922090366774,  lng: 135.7575056779574, };
    const markerOptions2 = { position: center, label: "京都上賀茂教会", title: "京都上賀茂教会" };

    return { center, markerOptions, center2,markerOptions2 };
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
  filter: brightness(50%);

  object-fit: cover;
  /* object-position: -100px 0px; */
  background-size : cover;
  -webkit-background-size: cover;
     -moz-background-size: cover;
       -o-background-size: cover;
          background-size: cover;
          
  width: 100vw;
  height: 70vh;
  max-height: 100vh; 

  margin-top: 15vh;

  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  left: 50%; 
  transform: translate(-50%, 0); 
  /* position: absolute; */

  /* transform: translateY(-50%); */

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
  margin-bottom: 200px
}

/* ----------------------------------------- */
.corona{
  background: #E6E6E6;
  padding: 50px 0;
}

.corona div{
  width: 70%;
  margin: 0 auto;
}
.corona p{
  text-align: left;
  margin-bottom: 20px;
}
.corona p span{
  color: crimson
}
/* ----------------------------------- */
.notice{
  width: 80vw;
  /* background-color: hsl(50, 33%, 25%); */
  background-color: dimgrey;
  border-radius: 30px;
  margin: 200px auto;
  padding: 50px;
  color: white;
  
}

.notice div div{
  display: flex;
}

.notice .left-section{
  width: 50%;
  /* background-color: red; */
}

.notice .right-section{
  width: 50%;
  display: block;
  /* background-color: blue; */
}

.notice .left-section div{
  width:50%;
  margin: auto auto;
}

.notice img{
  height: auto;
  width: 300px;
  border-radius: 20px;
  
  
}

.notice .right-section{
  padding: 20px;
}


/* -------------- */
.location{
    /* margin-top: 1000px; */
    width: 70%;
    margin: 200px auto;
    text-align: center;
    
    /* background-color: aqua; */
    
  }
.churchPic{
  margin-top: 50px;
  width: 45%;
  height: auto;
  margin-right: 20px;
  /* text-align: left; */
  /* text-align: left; */
}

.mapPic{
  margin-top: 50px;
  width: 45%;
  height: auto;
}

</style>
