<template>
  <div class="content">
    <h1>京都上賀茂教会について</h1><hr>

    <strong>牧師</strong><br> <br>
    
    <div v-if="profiles">
      <template v-for="(person, i) in profiles" :key="i">
        <div style="margin-bottom: 50px">
          {{person.position}}: {{person.name}} <br>
          <img :src="imgSrc[i]" alt="none" class="profilePic"> <br>
          <span>{{person.detail}}</span>
          <hr>
          <span style="margin-top:50px" class="description">{{getStyle(person.description)}}</span>
          <hr>


        </div>
      </template>
    </div>

    <div class="loader" v-else></div>

    
    <!-- <div>
      <span>主任牧師: &nbsp;生田 香緒里</span><br> 
      <span>牧師: &nbsp;&nbsp; 粟津原 淳</span><br> 
      <span>牧師: &nbsp; &nbsp;張 悦子（あいのまち伝道所）</span><br> 
      <span>牧師: &nbsp; &nbsp;浜本 京子 (在米国ハワイ)</span>
    </div> -->
    <br>

    <img src="../../public/img/drawing.jpg" alt="" class="churchPic">
    <img src="../../public/img/map.jpg" alt="" class="mapPic">
    <br><br>

    <div class="" style="width: 80%; margin: auto auto">    
      <GoogleMap api-key="AIzaSyDypz7XN6k4Q1gEj6mKRt65nAbpOelob8o" style="width: 100%; height: 500px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </div>  

    


    
  </div>
</template>

<script>
import db from '../../firebase.js';
import { GoogleMap, Marker } from "vue3-google-map"; 

const links = ['../../public/img/awazuhara-san.jpg', '../../public/img/awazuhara-san.jpg','../../public/img/awazuhara-san.jpg']
const link = '../../public/img/awazuhara-san.jpg'



export default {
  components: { 
    GoogleMap, 
    Marker,
  },

  data(){
    return{
      profiles: undefined,
      links,
      link
    }
  },

  setup() {
    const center = { lat: 35.05922090366774,  lng: 135.7575056779574, };
    const markerOptions = { position: center, label: "京都上賀茂教会", title: "京都上賀茂教会" };

    

    return { center, markerOptions };
  },
  
  methods:{
    test(){
        const ref = db.collection('profiles')
        ref.doc(`priests`).set({
          data:[
            {position: '主任牧師', name: '生田 香緒里', detail: '',  description: ''},

            {position: '牧師', name: '粟津原 淳', detail: '粟津原　淳（あわづはら　あつし）長野県生まれ。新潟大学医療技術短大部、同志社大学院　神学研究科博士前期過程、Pacifica Graduate Institute（カリフォルニア州）と渡り歩き、現在は同志社女子大学嘱託講師（聖書）と診療放射線技師をしています。',  description: 'コロナ前は大人のバックパッカーを趣味としていました。イランやインドなど、西〜南アジアがお気に入りです。地元の人と一緒にバスや列車で移動するのですが、国によっては空の国内線が充実してきていて、経済の変化を感じることもあります。食事も地元の人が集う食堂や屋台が性に合っています。インドの屋台で激しい下痢をしたときは日本から持参した薬がまったく通用せず、現地の薬局で処方してもらった薬で治りました。「郷にいれば郷に従え」ということでしょうか。風邪にはアーユルヴェーダのマッサージが効きました。写真に写っているのは、ウズベキスタンとカザフスタンにまたがるアラル海です。かつては東北地方とほぼ同じ大きさで世界第4位の湖でしたが、現在では10〜20％くらいの面積にまで縮小しています。これはソ連が綿花栽培のために大規模な灌漑を行って、水を他の地域に流した結果です。かつては豊かな漁場でしたが、1980年代になると塩分濃度の上昇によって魚を捕れなくなりました。今は船の墓場のようになっています。人がもたらす破壊力の恐ろしさを見る思いです。 柴犬ハルと暮らすようになってからは、我が家の半径3キロ四方の路地や公園に詳しくなりました。猫が立ち寄る所やニホントカゲの住処など、いままで見えていなかった場所に連れていってもらっています。地の果てのような遠くまで出かけるのも楽しいですが、どこにでもちょっとした発見や驚きはあるものです。'},

            {position: '牧師', name: '張 悦子', detail: '',  description: ''},

            {position: '牧師', name: '浜本 京子 ', detail: '浜本　京子（はまもと　きょうこ）広島県生まれ。広島県生まれ。広島女学院高校で初めて聖書に出会い、同志社大学神学部・神学研究科を経て、アンドーバーニュートン神学校(マサチューセッツ州)で過ごしました。米国チャプレン協会認定チャプレン。牧会博士。',  description: '２０１８年からハワイのオワフ島で、在宅ホスピスの訪問サービスの働きに関わっています。訪問看護サービスというのを聞かれたことがあると思います。そのチャプレン版です。本来ホスピスとは施設ではなくサービスのこと。心身ともに人生の終わりの時を平安に過ごせるよう、看護師、医師、ソーシャルワーカー、チャプレン、ボランティア等がチームとなり、患者さんやご家族を支えていきます。わたしのしごとは、お話を聴いたりお祈りしたりしながら、人々のこころを見守っていくことです。宗教の有無や違いに関係なく、どんな人でもどこにでも出かけていきます。自宅や高齢者施設、ケアホームやホームレスキャンプなど、毎日島中を車で回っています。 数年前のある日、自分のスマホが頼んでもないのに、勝手にわたしの歩数を数えていることがわかりました。見てびっくり、これは完全に運動不足ぎみ。それからすぐにコロナ禍が押し寄せてきて、それならば気分転換にと家のまわりを歩くようになりました。はじめはいつ家にたどり着つくのか、そればかり気になっていたのですが、いまはただ歩くことが楽しいです。ハワイの朝は美しく、空や鳥たち、草花にあいさつしながら、毎日てくてく歩いています。目に留まったものを写真に撮るのも楽しみ。毎日曜日の聖書日課ブログで写真をアップしています。良ければどうぞたずねてみてください。'},
          ]

        })
    },

    getData(){
      var docRef = db.collection('profiles').doc(`priests`);
      
      
      docRef.get().then((doc) => {
          if (doc.exists) {
            
            this.profiles =doc.data().data
            console.log(this.profiles)
            // console.log(this.events)
            // this.historyArticles = JSON.parse(doc.data().data)
            // this.getViews()
          } else {
              // doc.data() will be undefined in this case
              this.events= []
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    },

    getStyle(text){
      return text
      // return text.substring(0,100);
    }
    
  },

  mounted(){
    this.getData()
  },

  computed: {
    imgSrc () {
      let list = [require("../../public/img/ikuta-san.jpg"), require("../../public/img/awazuhara-san.jpg"),require("../../public/img/default-female.jpeg"),require("../../public/img/default-female.jpeg"),]
      return list
      // return require("../../public/img/awazuhara-san.jpg")
    },
  }
}
</script>

<style>
  .content{
    /* margin-top: 1000px; */
    width: 70%;
    margin: 200px auto;
    text-align: center;
    font-size: 150%;
    
    /* background-color: aqua; */
    
  }
  .content h1{
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .content strong{
    width: 50%;
    margin: 0 auto;
    
    /* color: */
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

  /* --------------- */
  .profilePic{
    width: 500px;
    height: auto;
    margin:50px auto;
    
    text-align: center;
    border-radius: 50%;
  }

  .description{
    text-overflow: ellipsis;
    overflow: hidden;
/* white-space: nowrap; */
    /* white-space: nowrap; */
  }

/* * --------------------------------------------- */ 
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

  @media (min-width:320px) and (max-width:800px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
    .profilePic{
    width: 85%;
    height: auto;
    margin:50px auto;
    
    text-align: center;
  }

  .content{
    /* margin-top: 1000px; */
    width: 85%;
    margin: 200px auto;
    text-align: center;
    font-size: 150%;
    
    /* background-color: aqua; */
    
  }
    


  


  }


</style>