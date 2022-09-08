<template>
  <div class="content">
    <h1>間之町伝道所</h1><br><br>
    <span >
      京都市中京区間之町通二条下る鍵屋町486 あいのまちハウス５Ｆ<br>
      毎週日曜日（不定期）午前１１時～
    </span><br><br>

    <p style="font-size: 150%">
      間之町伝道所は、上賀茂教会を母体として発足した京都市中心部に位置する伝道所です。
      <!-- 礼拝は毎週午前11時から行われていますが、不定期なこともありますので、初めて来られる方は事前にご照会ください。 -->


    </p>

    <br>

    <div class="pics">
      <img src="../../public/img/ainomachi1.jpg" alt="" class="pic1">
      <img src="../../public/img/ainomachi2.jpg" alt="" class="pic2"><br>
    </div>

    <div class="" style="width: 80%; margin: 50px auto">    
      <GoogleMap api-key="AIzaSyDypz7XN6k4Q1gEj6mKRt65nAbpOelob8o" style="width: 100%; height: 500px" :center="center2" :zoom="15">
        <Marker :options="{ position: center2 }" />
      </GoogleMap>
    </div>

    <div class="pics">
      <img src="../../public/img/ainomachi3.jpg" alt="" class="pic3">
      <img src="../../public/img/ainomachi4.jpg" alt="" class="pic4"><br>
    </div>

     

    
    <br><br> 

    

  </div>
  

</template>

<script>
  import db from '../../firebase.js';
  import { GoogleMap, Marker } from "vue3-google-map";



  export default{
    components: { 
      GoogleMap, 
      Marker,
    },
    data(){
      return{
        detailData: '',

        historyArticles: [],
        tempString: '',

        tempTitle: '',
        tempContent: '',

      }


    },

    setup() {
      const center = { lat: 35.01834413663081,  lng: 135.76761230587275, };
      const markerOptions = { position: center, label: "日本基督教団洛陽教会", title: "日本基督教団洛陽教会" };
      const center2 = { lat: 35.0131188841072,   lng: 135.7618299409843, };
      const markerOptions2 = { position: center, label: "京都上賀茂教会", title: "京都上賀茂教会" };

      return { center, markerOptions, center2,markerOptions2 };
    },

    methods:{
      getTheHistory(){  

        var docRef = db.collection('history').doc(`articles`);
        
        docRef.get().then((doc) => {
            if (doc.exists) {
              this.tempString =doc.data().data
              this.historyArticles = JSON.parse(doc.data().data)
              // this.members = JSON.parse(doc.data().members)
              // if(!this.members.includes(this.username)) this.members.push(this.username)
              // this.modalStatus = 3
              // this.onlineRoll = 'guest'

              // docRef.update({
              //   members: JSON.stringify(this.members),
              // })
              // // this.countingToStartGame()

              // this.onlineStatus = 'waiting'
              // this.ReciveTheData()
              // return
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      },

      convertTImestamp(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        var time =  ' ' + year + '年'  + (month + 1) + '月'+ date + '日';
        
        return time;
        
      },

      jumpPage(index){
        window.location.href = `/history/articles/${index+1}`
        // console.log(index)
      },

      test(){
        this.detailData =[
          {timestamp: Date.now(), title: '決して偶然ではなく-私たちの教会の産声', content: `大阪で万国博覧会が開催されて日本中が大騒ぎだった1970年であった。万博だけでなく1968年の終わりごろから起こっていた大学や、そして後にはキリスト教会で 社会に深く根ざす問題を提起する青年たちの運動が社会全体を揺さぶり始めていた。日本基督教団 では大阪万博にキリスト教館を作ることに疑問を感じた人々が激しく反対運動を展開し1969 年秋、東京の山手教会で開催された総会は騒然となり議事進行ができないほどであった。私もその 場に居合わせたのだが、その激しさの中から少しずつ読み取ることのできた問題の本質に目覚める 思いがした。しかし、同時に、その激しさには困惑せざるを得なかった。困惑の原因のひとつは「問 題提起者」というマイナスイメージが伴う名称で呼ばれていた青年たちの中には同志社神学部の学 生や卒業生も少なからずいたことであった。通常決して激しい性質を露にする青年たちではないの に総会議場での彼らは決起集団のような様相を呈していた。重大な課題を議場に投げかけていたの であるが、その方法は多くの議員たちを戸惑わせ、緊張させたのである。この総会は一つの象徴的 出来事であった。多くの教会でも青年たちの声が高まったのだが、結果的に彼らは押しつぶされる か押し出されるかして、その多くは教会から去って行った。その中には今に至るまで教会に立ち返 ることができないでいる人々もいる。そのような息苦しく、困惑し、心を痛めた一年が過ぎ去ろうとしていたある日、様々な活動で接 することの多かった関西セミナーハウス所長村山盛敦先生が声をかけてきた。沖縄に根を持つ屈強 な顔立ちでありながら繊細な神経の持ち主で海軍兵学校在学中に終戦を迎えた牧師である。「深田 さん、青年たちが教会を去ってゆき寂しくなるねえ。形にとらわれないで一緒に聖書を読み、祈る 集まりをしようよ。杉瀬君とも話しているんだけど。」これが火種になった。杉瀬祐先生は当時同志 社女子大学の教授であり、杉瀬夫人はセミナーハウスの母体である日本クリスチャンアカデミーの 働きの中核的責任を担っておられた方であった。そして私たちが住居としていた上賀茂の宣教師館を会場にして1971年1月2日、日曜日に集 まったのは村山、杉瀬、深田3家族に加えてセミナーハウスや私たちの友人数人であった。なんと なく「上賀茂集会」と呼んで毎日曜日に礼拝を共にし、その後、時には食事を共にすることになっ たのが私たちの教会の発端である。少々雲が浮かぶけど明るい朝であった。私はこれが単なる思い付きで、偶然に始まった「集い」だとは思っていない。重苦しい空気がま だ社会に漂い、山積する問題の解決の糸口も見つけにくいとすら思われていた時に私たちは綿密な 計画書を持たずして集まり、讃美歌を歌い、聖書を読み、祈りをともにし思いを語り合ったのであ る。外の明るさを反映してか、神のみ手の導きを感じることのできる朝であった。`, views: 0, writtenBy: `安藤正樹`, },
          
          {timestamp: Date.now(), title: '霊の香りが漂うなかで', content: `上賀茂で数人が集まって聖書を読み、讃美歌を歌って祈りのうちに新年を迎えた 1971 年が私たち の教会の誕生であった。それは決して単なる思いつきや偶然ではなかったことは前にも記した。小 さくてもそれは歴史の“要求”に応えようとした試みだったと言えば大げさに聞こえるが振り返っ てみるとやはり聖霊の働きだったと言える。私たちがそれまで慣れ親しんでいた教会は激動する社 会に生きようとする人々に充分に応える力量に欠けていたのか、体制を組み直す勇気がなかったの か、それを聞かれれば答えに窮しながらも教会の何かを「守ろう」としていたのか、多くの教会は 「揺さぶり」を経験していた。実際いくつもの教会は分裂の痛みを担わざるを得なかった。多くの場 合、教会へ行くことにはそれまでなかった緊張感が伴い、喜びよりも心の痛みを抱えて礼拝に出席 することは珍しいことではなかったのである。上賀茂はまだ田園地域であった。北山通りから北はほとんど畑であり、肥料に使う人糞の「香り」 が風の方向に応じて地域に漂う中を子供たちは走り回って遊んでいる時代であった。太田神社近辺 の道はまだ舗装されていなかったし、買物と言えば教会の前の路地を南に入ったところにあった「何 でも屋」カネヨシで済ませていたことを思い出す。ある日我が家の愛犬バーバラがカネヨシでお揚 げを一枚「失敬」し、くわえて帰って来るのを斜め向かいの楠前夫人に見つかり、「父親」が店にお 詫びに行ったこともあった。犬が店に入って行っても誰も気が付かないほど乱雑にものが積まれて いた「お店」だった。周りの環境を反映してか、私たちの教会はゆったりした雰囲気を大事にし、礼拝の担当者の特色 が生かされる礼拝を共にし、礼拝後、時には食事を共にし、あるいはお茶とお菓子で歓談し、参加者 のペースで次回の再会を願って帰路につくのが普通であった。礼拝の形がなかったわけではない。 ごく初期の週報を見ると形式は多様であっても一定の秩序が保たれ、同時に新鮮な表現が試みられ ることも多かったことが分かる。この「実験」の姿勢は私たちの教会の特徴の一つであって、40年 たった今も大切にしたい。しかし、また、動いてゆく時代が産み出す表現も礼拝を豊かにする「原 料」になりうるのである。讃美歌21、81番の「主の食卓を囲み」はカトリックの讃美歌作者新垣壬敏さんが5人の神父の 叙階式のために作った讃美歌だった。それを上賀茂からカルメル修道会での礼拝に出席した数人が 耳にしてコピーをいただき、持ち帰って次回の聖餐式で歌ったことがあった。カトリック教会以外 で歌われたのは上賀茂が初めだったと言える。その後徐々に知られるようになってとうとう讃美歌 21に含まれるに至った。私たちの教会が持つ開放的な姿勢が貢献しての進展であったといっても 過言ではない。いまでは広く知られ、愛される讃美歌になっている。`, views: 0, writtenBy: `安藤正樹`, },
        ]

        this.detailData = JSON.stringify(this.detailData)

        const ref = db.collection('history')
        ref.doc(`articles`).update({
          data:this.detailData
        })


      },

      add(){
        this.historyArticles.push({timestamp: Date.now(), title: this.tempTitle, content:this.tempContent, views: 0, writtenBy: `安藤正樹`, },)

        this.detailData = JSON.stringify(this.historyArticles)

        const ref = db.collection('history')
        ref.doc(`articles`).update({
          data:this.detailData
        })

        this.tempContent =''
        this.tempTitle =''


      },

      cut(){
        // let popped = fruit.pop();
        this.historyArticles = this.historyArticles.pop()

        this.detailData = JSON.stringify(this.historyArticles)

        const ref = db.collection('history')
        ref.doc(`articles`).update({
          data: this.detailData
        })

        // this.tempContent =''
        // this.tempTitle =''

      },


    },

    mounted(){
      console.clear()
      this.getTheHistory()
    },

  }
</script>

<style>
  .content{
    /* margin-top: 1000px; */
    width: 70%;
    margin: 200px auto;
    text-align: left;
    
  }

  span{
    font-size: 30px;
  }

  .pics{
    display: flex;
  }
  
  .pic1{
    border-radius: 2%;
    width: 35vw;
    height: auto;
    /* margin-top: 50px; */
    text-align: center;
    margin: auto auto;

    display: block;
    margin-right: 20px;
    /* margin-top: 50px; */
  }

  .pic2{
    border-radius: 2%;
    width: 20vw;
    height: auto;
    /* margin-top: 50px; */
    text-align: center;
    margin: 50px auto auto;

    display: block;
  }

  .pic3{
    border-radius: 2%;
    width: 25vw;
    height: auto;
    /* margin-top: 50px; */
    text-align: center;
    margin: 50px auto auto;

    display: block;
  }

  .pic4{
    border-radius: 2%;
    width: 25vw;
    height: auto;
    /* margin-top: 50px; */
    text-align: center;
    margin: 130px auto auto;

    display: block;
  }

  body {
    background: #eee;
  }

  .icons i {
    color: #b5b3b3;
    border: 1px solid #b5b3b3;
    padding: 6px;
    margin-left: 4px;
    border-radius: 5px;
    cursor: pointer;
  }

  .activity-done {
    font-weight: 600;
  }

  .list-group li {
    margin-bottom: 12px;
  }

  .list-group-item {
  }

  .list li {
    list-style: none;
    padding: 10px;
    border: 1px solid #e3dada;
    margin-top: 12px;
    border-radius: 5px;
    background: #fff;
  }

  .checkicon {
    color: green;
    font-size: 19px;
  }

  .date-time {
    font-size: 12px;
  }

  .profile-image img {
    margin-left: 3px;
  }

  @media (min-width:320px) and (max-width:479px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */

    .content{
      /* margin-top: 1000px; */
      width:80vw;
      margin: 200px auto;
      text-align: left;
      
    }

    h1{
      width: 100%;
    }

    span{
      width: 100%;
      margin: auto auto;
    }

    img{
      border-radius: 2%;
      /* margin-top: 50px; */
      width: 80vw;
      /* margin: 50px auto; */
      /* display: block; */
      text-align: center;
      justify-content: center;
      
    }
  }
  
</style>