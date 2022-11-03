<template>
  <div > </div>
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

        <h2>礼拝は、毎週日曜午前１０時３０分 <br v-if="vw < 600">から１１時４５分まで <br><br> zoomからでもご参加頂けます。  kyoto.kamigamo.kyokai@gmail.com  </h2>
    </div>

    <div class="view-counter" >
        <div>
          <i class="far fa-eye" id="togglePassword"  style="margin-right: 7.5px"></i>
          <vue3-autocounter class="counter" ref='counter' :startAmount='0'  suffix='人がこのサイトを訪れました！' :endAmount="totalVisitors" :duration='1.25'  separator=',' :autoinit='true' />
        </div>
      </div>
     
    <div class="content">


      <div class="events">

        <div class="weekly-calendar " v-if="events">
          <div>
            <header>
              <div style="text-align:center">
                <i class="icon-chevron-left" @click="toPreviousMonth() ">&#8592;</i>  
                <h1>{{showingYear}}年{{showingMonth}}月の予定</h1>
                <i class="icon-chevron-right" @click="toNextMonth()">&#8594;</i> 
                <!-- <div class="year" style="">{{showingYear}}</div> -->
              </div>
            </header>

            <div class="weekly-contents" v-if="this.events?.length > 0">
              <template v-for="(event, i) in events" :key="i"> 
                <div class="calendar_plan">
                  <div class="cl_plan">
                    <div class="cl_title">{{event.month}} / {{event.date}} ({{event.day}}) :  {{event.from}} 〜 &nbsp; @{{event.location}}</div>
                    <div class="cl_copy" v-if="event.title == '主日礼拝'">
                      <strong :style="[vw > 800 ? 'font-size: 125%' : '']">{{event.title}}  </strong> 
                      <!-- <br v-if="vw < 600"> -->
                      <span :style="[vw < 800 ? 'margin-left: 25px' : '']">説教者: {{event.priest}}</span>  </div>
                    <div class="cl_copy" v-else>{{event.title}}</div>

                    <div class="cl_copy" v-if="event.description">
                      <span :style="[vw < 800 ? 'margin-left: 25px' : '']">{{event.description}}</span>  
                    </div>
                  </div>
                </div>
                
              </template>
            </div>

            <div class="weekly-contents" v-else>
              <div class="calendar_plan">
                  <div class="cl_plan">現在この月の予定はありません。
                    <div class="cl_title"></div>
                    
                  </div>
                </div>
              
            </div>


          </div>
        </div>



        <div v-else class="loader"></div>
      </div>

      <div class="priests" style="margin: 100px auto">
        <hr>
        <h3 style="text-align:center; margin: 50px auto;">京都上賀茂教会の牧師紹介</h3>
        <div class="profiles-wrapper">
          <div>
            <img src="../../public/img/ikuta-san.jpg" alt="">
            <br>
            <strong style="margin-top: 50px"><ruby>生田 香緒里 <rt>いくた かおり</rt></ruby></strong>
          </div>

          <div>
            <img src="../../public/img/awazuhara-san.jpg" alt="">
            <br>
            <strong style="margin-top: 50px"><ruby>粟津原 淳 <rt>あわづはら あつし</rt></ruby></strong>
          </div>

          <div>
            <img src="../../public/img/hamamoto-san.jpg" alt="">
            <br>
            <strong style="margin-top: 50px"><ruby>浜本京子<rt>はまもと きょうこ</rt></ruby></strong>
          </div>
        </div>

        <hr>

        
        

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

              <hr>

              <div>
                新型コロナ対策として、京都上賀茂教会では直接現地からの参加に加えて <strong><br> 礼拝をzoomからでも参加頂けます。</strong><br> 参加を希望の方は、お気軽にご連絡ください。 kyoto.kamigamo.kyokai@gmail.com 
              </div>

            </div>
             
              
             
          </div> 
        </div> 

        <div class="location">
          <h4>京都上賀茂教会の住所 アクセス</h4>
          <span>住所：〒603-8071 京都市北区上賀茂北大路町１７</span><br>
          <span>Tel&Fax : 075-723-7408</span><br>
          <span>E-Mail : kyoto.kamigamo.kyokai@gmail.com</span><br>
          

          <img src="../../public/img/drawing.jpg" alt="" class="churchPic">
          <img src="../../public/img/map.jpg" alt="" class="mapPic">
          <br><br>


          


          
        </div>
      </div>

      


      
    </div>

  </div>
</template>

<script>
import VueWriter from "vue-writer";
// // 
import {amenities} from '../const/amenities.js'


import db from '../../firebase.js';
import Vue3autocounter from 'vue3-autocounter';

// import {googleMapApiKey} from '../../.env'

export default {
  components: { 
    VueWriter,
    'vue3-autocounter': Vue3autocounter,
  },
  data(){
    return{
      reasonIndex: 0,
      totalClick: 0,
      theColor: 'white',
      arr: ['京都上賀茂教会へようこそ！', 'Welcome to Kyoto Kamigamo Church!',],

      picArr:[],
      amenities,

      showModal: false,
      modalStatus: 1,
      totalVisitors: undefined,
      // googleMapApiKey,  

      // ------------------
      showingCalendar: undefined,
      previous: [],
      next: [],
      events: undefined,

      logined: false,
      





    }
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

    incrementTotalViews(){
      var docRef = db.collection('analytics').doc(`views`);
        
        docRef.get().then((doc) => {
            if (doc.exists) {
              this.totalVisitors = doc.data().total
              // console.log(`views: ${this.totalVisitors}`)

              this.totalVisitors++
              if(!this.totalVisitors) return
              if(this.totalVisitors > 0){
                docRef.update({
                  total: this.totalVisitors
                })
              }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },

    getEvents(){
      this.events = undefined
      var docRef = db.collection('events').doc(`${this.showingYear}`);
      
      
      docRef.get().then((doc) => {
          if (doc.exists) {
            
            this.events =doc.data()[parseInt(this.showingMonth)]
            if(!this.events) {
              this.events= []
            }
            console.log(this.events)
            // console.log(this.events)
            // this.historyArticles = JSON.parse(doc.data().data)
            // this.getViews()
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              this.events= []
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    },

    toNextMonth(){
        if(this.showingMonth == 12){
          this.showingMonth = 1
          this.showingYear++
        }else{
          this.showingMonth++
        }

        this.getEvents()
        
      },

      toPreviousMonth(){
        if(this.showingMonth == 1){
          this.showingMonth = 12
          this.showingYear--
        }else{
          this.showingMonth--
        }

        this.getEvents()
        
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

  created(){
    this.incrementTotalViews()

    var today = new Date();

    // this.currentDate = String(today.getDate()).padStart(2, '0');
    this.currentDate = today.getDate()
    this.showingMonth = String(today.getMonth() + 1).padStart(2, '0'); 
    this.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); 

    this.showingYear = today.getFullYear();
    this.currentYear = today.getFullYear();

    this.getEvents()
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

  margin-top: 75px;

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
  padding:0.5em;/*文字周りの余白*/
  color: white;/*文字色*/
  background: grey;/*背景色*/
  border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
  position: absolute;
  top: 65vh;
  /* left: 150px; */
  z-index:1;
  font-size: 300%;
  color: white;
  font-size: 175%;
  left: 50%;
  transform: translateX(-50%);

  width: 50%;
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
.profiles-wrapper{
  /* background-color: red; */
  width: 80vw;
  margin: 30px auto;
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.profiles-wrapper img{
  width: 300px;
  height: auto;
  border-radius: 50%;
  display: block;
  /* background-color: red; */
}

.profiles-wrapper strong{
  font-size: 150%;
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

.corona hr{
  border: 1px solid grey;
  margin: 30px auto;
  width: 90%;
}

.corona strong{
  font-size: 150%;
  color: crimson;
}
/* ----------------------------------- */
.notice{
  width: 80vw;
  /* background-color: hsl(50, 33%, 25%); */
  background-color: dimgrey;
  border-radius: 30px;
  margin: 200px auto;
  padding: 35px;
  color: white;
  
}

.notice h1{
  width: 80%; 
  margin: 50px auto;
  text-align: center;
}

.notice div div{
  display: flex;
  margin-top: -30px;
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

.map1{
  width: 100%;
  height: 500px;
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

.view-counter{
  background: #E6E6E6;
  padding: 25px 0;
  text-align: center;

  margin-top: 100px;
}

.view-counter div{
  width: 50%;
  margin: auto auto;
  cursor: pointer;
}


/* --------------------------------------------- */
/* Media Query For different screens */
@media (min-width:320px) and (max-width:479px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  .main-content-wrapper{
    /* margin: 0 0; */
  }

  .lp h1{
    position: absolute;
    top: 23vh;
    left: 10px;
    z-index:1;
    font-size: 12vw;
    color: white;
  }

  .lp h2 {
    padding: 0.5em;/*文字周りの余白*/
    /* color: red;文字色 */
    background: grey;/*背景色*/
    border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
    position: absolute;
    top: 55vh;
    z-index:1;
    font-size: 4.65vw;
    left: 50%;
    transform: translateX(-50%);

    width: 85%;
  }



  .content{
    margin-top: 100px;
    margin-bottom: 100px;
    /* background-color: olive; */
  }

  .notice{
    width: 90vw;
    /* background-color: hsl(50, 33%, 25%); */
    background-color: dimgrey;
    border-radius: 30px;
    /* margin: 200px auto; */
    margin-top: 10px;
    color: white;
    
  }

 

  .notice h1{
    width: 100%;
    font-size: 7vw;
    margin: auto auto;
  }

  .notice div div{
    width: 100%;
    margin: auto auto;
    display: block;
  }

  .notice .left-section{
    width: 100%;
    margin: auto auto;
    /* background-color: red; */
  }

  .notice .right-section{
    width: 100%;
    margin: auto auto;
    /* background-color: blue; */
  }


  .notice .left-section div{
    width:100%;
    margin: auto auto;
  }

  .notice img{
    display: block;
    height: auto;
    width: 50%;

    margin: 100px auto;

    margin-bottom: 140px;
    transform: scale(2);

    border-radius: 20px;
    
  
  }

  .notice .right-section{
    padding: 0px;
  }


  /* --------------------------- */
  .corona{
    background: #E6E6E6;
    padding: 30px 0px;
  }

  .corona h1{
    font-size: 10vw;
    /* width: 100%; */
    /* color: */
  }

  .corona div{
    width: 80vw;
    margin: 0 auto;
  }
  .corona p{
    text-align: left;
    margin-bottom: 20px;
  }
  .corona p span{
    color: crimson
  }

  .view-counter{
    background: #E6E6E6;
    /* padding: 5px 0px; */
    /* padding-top: 1px; */
    text-align: center;

    margin-top: 20px;
  }

  .view-counter div{
    width: 100%;
    margin: 0px 0px;
    cursor: pointer;
  }


}

@media (min-width:600px) and (max-width: 834px)  { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
  


  .lp h2 {
    padding: 0.5em;/*文字周りの余白*/
    /* color: red;文字色 */
    /* background: red;背景色 */
    border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
    position: absolute;
    top: 65vh;
    z-index:1;
    font-size: 170%;
    left: 50%;
    transform: translateX(-50%);

    width: 85%;
  }

  .view-counter{
    background: #E6E6E6;
    padding: 25px 0;
    text-align: center;

    margin-top: 125px;
  }


}


@media (min-device-width: 834px) and (max-device-width: 1200px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */
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
    height: 60vh;
    max-height: 100vh; 

    margin-top: 100px;

    position: relative;
    top: 0;
    left: 0;
    z-index: 1;

    left: 50%; 
    transform: translate(-50%, 0); 
    /* position: absolute; */

    /* transform: translateY(-50%); */

  }

  .lp h2 {
    padding: 0.5em;/*文字周りの余白*/
    /* color: red;文字色 */
    /* background: yellow;背景色 */
    border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
    position: absolute;
    top: 62.5vh;
    z-index:1;
    font-size: 170%;
    left: 50%;
    transform: translateX(-50%);

    width: 75%;
  }
}

/* ------------------------------------------------- */
.events{
  margin-top: 100px;
  margin-bottom: 150px;
  background-color: lightgray;
  padding-top: 30px;
  padding-bottom: 30px;
}
.weekly-calendar {
    /* display: inline-block; */
    width: 700px; 
    margin: 30px auto;
    /* width: 70%;  */
    /* background-color: green; */
  }

  
  .weekly-calendar div{
    /* margin: 50px auto; */
    /* width: 750px;  */
    /* display: inline-block; */
    margin-left: auto;
    margin-right: auto;
    /* background-color: lightgrey; */
  }

  
  /* .weekly-calendar header {
    border-radius: 1em 1em 0 0;
    background: SteelBlue;
    color: #fff;
    padding: 1em 1em;
    
    width: 100%;
  }


  .weekly-calendar header span{
    font-size: 50px;
  } */

  .weekly-calendar header{
    width: 100%;
    /* height: 37px; */
    text-align: center;
    background-color:SteelBlue;
    padding-top: 30px;
    padding-bottom: 50px;
    -webkit-border-radius: 12px 12px 0px 0px;
    -moz-border-radius: 12px 12px 0px 0px; 
    border-radius: 12px 12px 0px 0px;
  }
  .weekly-calendar header h1{
    font-size: 1.5em;
    color: #FFFFFF;
    float:left;
    width:60%;
    
  }
  .weekly-calendar header i[class^=icon-chevron]{
    color: #FFFFFF;
    float: left;
    width:20%;
    border-radius: 50%;
    margin-top: 6px;
  }

  .weekly-contents{
    background: #fff;
    border-radius: 0 0 1em 1em;
    -webkit-box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px #fff;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px #fff;
    color: #555;
    /* display: inline-block; */
    /* padding: 2em; */
    /* width: 100%; */
    padding: 10px 50px;
    /* padding-bottom: 100px; */
    /* padding-top: 20px; */
    /* padding-bottom: 20px; */
    /* padding-left: 20px; */

    margin: 0 auto;
  }

  .calendar_plan{
    margin:20px;
  }
  .cl_plan{
    /* width:70%; */
    /* height: 140px; */
    background-image: linear-gradient(-222deg, LightSeaGreen, MediumSeaGreen);
    box-shadow: 0px 0px 12px -8px rgba(0, 0, 0, 0.75);
    padding:12.5px 20px;
    color:#fff;
  }
  .cl_title{
    font-size:20px;
  }
  .cl_copy{
    font-size:25px;
    margin-top: 15px;
    margin-bottom: 10px;
    display: inline-block;
  }

  .weekly-contents span{
      /* font-size: 80%; */
      margin-left: 20px;
    }

  @media (min-width:320px) and (max-width:750px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
    .weekly-calendar {
      width: 345px; 
    }

    .weekly-calendar header span{
      font-size: 30px;
    }

    .weekly-contents span{
      margin-left: 0px;
    }

    .cl_title{
      font-size: 15px;
    }


    .weekly-contents{
      padding: 10px 20px;

      margin: 0 auto;
      
    }

    .cl_copy strong{
      font-size: 20px
    }

    .cl_copy span{
      font-size: 18px
    }


  


  }

  @media (min-width:750px) and (max-width:1024px) {
    .profiles-wrapper{
      /* background-color: red; */
      width: 85vw;
      margin: 30px auto;
      display: flex;
      text-align: center;
      justify-content: space-between;
    }
    .profiles-wrapper img{
      width: 225px;
      height: auto;
      border-radius: 50%;
      display: block;
      /* background-color: red; */
    }

    .profiles-wrapper strong{
      font-size: 150%;
    }

    .corona div{
      width: 80%;
    }

    
  }

  @media (min-width:320px) and (max-width:749px) {
    .priests{
      width: 85vw;
      /* color:red; */
      /* margin:  */
    }

    .profiles-wrapper{
      /* background-color: red; */
      width: 85vw;
      margin: 30px auto;
      display: flex;
      text-align: center;
      justify-content: space-between;
    }
    .profiles-wrapper img{
      width: 100px;
      height: auto;
      border-radius: 50%;
      display: block;
      /* background-color: red; */
    }

    .profiles-wrapper strong{
      font-size: 100%;
    }
  }


  .corona h1{
      /* color: red; */
      text-align: center;
    }
/* ------------------------------------------------- */
.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 160px;
    height: 160px;

    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    margin: 200px auto;

    
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  
</style>
