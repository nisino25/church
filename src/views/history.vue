<template>
  <div class="content">
    <h1>京都上賀茂教会の歩み</h1><br><br>
    <span>
      1960年代末から70年代初期にかけて日本の社会は主として青年たちの平和と正義に関わる鋭い問いかけが発端となり、混乱の中にありました。<br> 教会も悩みの中にありました。去って行く若者も多くいました。そのような試練の時にもう一度新鮮な気持ちで共に聖書を読み、心を開いて思いを分かち合い、神の導きを祈り求めたいと願った人々がいました。3家族を核とし、何人かの青年たちが初めて集まったのが1971年1月2日の日曜日でした。<br> 上賀茂の宣教師館の居間で讃美歌を歌い祈りを共にしました。これが私たちの教会の種が蒔かれた日でした。長い教会の歴史の中で培われて来た伝統を評価しながらも、時代の流れに沿って意味ある表現や神への礼拝の形を共に考えながらキリストの道を歩みたいと願う人々の集いの歴史は半世紀近くなります。初期に用いていた「集会」を改め日本基督教団京都教区に所属する京都上賀茂教会として歩み続けています。聖書を通して人間のあるべき姿を共に探りながら、お互いの個性や社会的背景を大切にしつつ愛と正義を追い求め続ける教会でありたいと願っている教会です。
    </span><br>
    <img src="../../public/img/churchPic.jpg" alt="">

  </div>
  <!-- <button @click="test()">test</button> -->
  <div style="width: 80%; margin: auto auto; display: none;">
    <span>将来的にはホストだけしかできない操作</span><br>

    <button @click="add()">追加ボタン</button>
    <!-- <button @click="cut()">cut latest</button> -->
    <input type="text" placeholder="タイトル"  v-model="tempTitle">
    <input type="text" placeholder="内容" v-model="tempContent">
  </div>

  <div class="content" v-if="historyArticles">
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center activity">
                    <!-- <div><i class="fa fa-clock-o"></i><span class="ml-2">11h 25m</span></div> -->
                    <div style=" margin: auto auto"><span class="activity-done" >京都上賀茂教会の歩み（{{historyArticles.length}}）</span></div>
                    <!-- <div class="icons"></div> -->
                </div>
                <div class="mt-3">
                    <ul class="list list-inline">
                      <template v-for="(item, i) in historyArticles" :key=i>
                        <li class="d-flex justify-content-between" @click="jumpPage(i)">
                          <div class="d-flex flex-row align-items-center">
                              <div class="ml-2">
                                  <h6 class="mb-0">{{i+1}}. {{item.title}}</h6>
                                  <div class="d-flex flex-row mt-1 text-black-50 date-time">
                                      <div><i class="fa fa-calendar-o"></i><span class="ml-2">{{convertTImestamp( item.timestamp)}}</span></div>
                                      <div class="ml-3"><i class="fa fa-eye"></i><span class="ml-2">{{views[i+1]}}</span></div>
                                  </div>
                              </div>
                          </div>
                          <!-- <div class="d-flex flex-row align-items-center">
                              <div class="d-flex flex-column mr-2">
                                  <div class="profile-image"><img class="rounded-circle" src="https://i.imgur.com/xbxOs06.jpg" width="30"><img class="rounded-circle" src="https://i.imgur.com/KIJewDa.jpg" width="30"><img class="rounded-circle" src="https://i.imgur.com/wwd9uNI.jpg" width="30"></div><span class="date-time">11/4/2020 12:55</span></div>
                              <i
                                  class="fa fa-ellipsis-h"></i>
                          </div> -->
                        </li>

                      </template>

                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  </div>

  <div class="loader" v-else></div>

  <!-- <hr> -->
  <!-- <div style="width: 80%; margin: auto auto">
    <small style="font-size: 10%; margin: 50px">
  
      {{tempString}}  
    </small>
  </div> -->
  

</template>

<script>
  import db from '../../firebase.js';
  export default{
    data(){
      return{
        detailData: '',

        historyArticles: undefined,
        tempString: '',

        tempTitle: '',
        tempContent: '',

        views: [],

      }


    },

    methods:{
      getTheHistory(){  

        var docRef = db.collection('history').doc(`articles`);
        
        docRef.get().then((doc) => {
            if (doc.exists) {
              this.tempString =doc.data().data
              this.historyArticles = JSON.parse(doc.data().data)
              // for(let i in this.historyArticles){
              //   let article = this.historyArticles[i]
              //   article.views = 10

              //   // console.log(this.historyArticles[i].views)
              // }

              // this.historyArticles = JSON.stringify(this.historyArticles)

              // console.log(this.historyArticles)
              // const ref = db.collection('history')
              // ref.doc(`articles`).update({
              //   data:this.historyArticles
              // })
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
              this.getViews()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


      },

      getViews(){
        var docRef = db.collection('analytics').doc(`views`);
        docRef.get().then((doc) => {
            if (doc.exists) {
              this.views = doc.data().articles
              console.log(this.view)

              
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

      // updatedArticles(){

      // },

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
  
  img{
    border-radius: 2%;
    width: 60vw;
    /* margin-top: 50px; */
    text-align: center;
    margin: 50px auto auto;

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

  /* -------------------------- */
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

  .footer-wave-path{
    fill:#eee;
  }
  
</style>