<template>
  <div class="content" v-if="article">
    <span>{{article.timestamp}}</span><br>
    <span>{{tempViews}}回閲覧</span><br><br>
    <h1 style="text-align:center">「{{this.$route.params.index}}. {{article.title}} ({{article.timestamp}})」</h1>
    <div>
      <span>{{article.from}}</span>
    </div><br><br>
    <span>{{article.content}}</span>
    <br><br>
    <!-- HTML !-->
    <a class="button-8" role="button" href="/about-fukada" >戻る</a>



    <div class="center">
      <div class="pagination">
        <!-- {{pagingArray}} -->
        <a @click="jumpPage(1)" v-if="currentIndex !==1">&laquo;</a>
        
        <template v-for="(num, i) in pagingArray" :key="i">
          <a @click="jumpPage(num)" :class="[num == currentIndex?  'active': '' ]">{{num}}</a>
        </template>

        <a @click="jumpPage(historyArticles.length)" v-if="currentIndex !== historyArticles.length">&raquo;</a>
      </div>
    </div>

  </div>

  <div class="content" v-else >
    <div class="loader"></div>
  </div>
</template>

<script>
  // const currentIndex =this.$route.params.index
  import db from '../../firebase.js';
  export default{
    data(){
      return{
        historyArticles: undefined,
        article: undefined,
        currentIndex: undefined,
        tempViews: undefined,
        

        content: `    歴史の中に、ほとんど影が薄くなっているように思います。
1923年（大正12年）9月1日午前11時58分に起こった、マグニチュード7.9の関東大震災です。
丁度お昼前の時間で、当時のことですから、主婦達は火を起こして、お昼の用意をしたりしていたために、一挙に東京の街に日が拡がりました。
ですから、建物が倒壊しただけではなくて、火事で東京の街は破壊された訳です。45万戸の家が焼けて、10万人の人が亡くなりました。当時の統計ですと、340万人の人が罹災した。東京の被服廠というのがありましたが、本所でしたけれど、そこだけで3万2000人の人が重なり合うように焼死したのです。
そしてこの大混乱の中で、デマが飛んで、6000人の朝鮮人が虐殺されます。これは繰り返し語られては来ましたけれど、人間が一種のパニック状態に陥った時に、どういう方向に走る可能性を持っているかという、それを表す、それも特に日本という社会の中で、ある定の歴史的状況の中で起こった天災、自然の災害でありながら、多くの人が人間の手によって命を奪われていった出来事です。
この関東大震災を機に、それまで神戸のスラムで働いていた賀川豊彦 (1888年生～1960年没) は、すぐ翌日、使えなくなっている鉄道に乗ることが出来なくて、船で東京へ行って、神田のYMCAを拠点にして、東京市（当時）と相談事をして、２日間で神戸に戻って、３人の青年を連れて、また東京に戻る。
 そして、そこで救済活動をします (賀川の救済活動は、宗教、医療、保育等、広範囲にわたるセツルメント事業として展開され、江東消費組合や中ノ郷質庫信用組合を設立した) 。
 そこにいろんな人が集まってくる。まさにボランティアの草分けという活動です。
 賀川豊彦が連れていった３人の青年の一人に、当時21歳であったであろう私の父親がおりまして、しばらくして母親がそういう活動が始まっているのを聞いて、高野のカネボウの仕事を辞めて東京に出て行って、そこでこの二人が会って、その二人が結婚して私が生まれた、ということですから、関東大震災の悲劇というのは、悲劇だけじゃない。私が生まれたというのは、喜劇かも知れないですが（笑）。そういう出来事が80年近く前にありました。
そして今日、南アフリカで行われている環境開発サミット、この環境開発サミットと日本語に訳
されている言葉は、英語ではsustainable Developmentという言葉です。sustainableとは英語では、
保持していくことができる、長くものごとをずーっと見守っていく、継続して使っていく、そうい
う言葉です。
このサミットに関連して27日の天声人語、私とMさんは、聖書を読むより天声人語を忠実に読ん
でいるようではあり、聖書で語り合ったことがなく、天声人語について語り合ったりしていますが
・・・。今の世界がどれほど多くの問題を抱えているかということをこの天声人語は指摘します。
毎年スイスの国土の４倍程度の熱帯雨林が消滅していく。
このことは1979年以来、僕はいろんなところで話していましたが、熱帯雨林が失われていく意味
というのを、それは78年から79年にかけてクレアモント（米国）で勉強している際、ある教師にさ
んざん叩き込まれたものですから。今度はそれを持って日本に帰って来て、79年の秋から話してい
たことなのです。
熱帯雨林、そして人間が飲めるような水が不足してきて、乱獲といいましょうか、漁業の資源が
激変する。そしてエイズの患者が増えてきています。
こういう課題が、今、ヨハネスブルクの会議で討論されています。
そして平均気温が上昇して、洪水が起こって、干ばつが起こっている。
明るいニュースがない。
たまに「プロジェクトＸ」 4 を観るとですね、あのプロジェクトＸというのは不思議な、一つには
あの喋っている口調がね、一種の催眠術っぽい喋り方なんですね。
この間は、オリンピックの時の料理人の話でした。プロジェクトＸが面白いっていうのは、様々
な逆風にもかかわらず、それに向かって、あるいはそれを貫いて、自分の意を決して歩む人の姿で
すね。今まで、女性があんまり現れていない。いつも男ですよ。
女性が逆風に対して生きているというのは、当たり前の話ですから、話題になんないんですけど
ね。
なにしろ暗いニュースが多いものですから、プロジェクトＸなんかまだ爽やかです。喋っている
お父さん達が涙流して、こっちも涙流している。
暗いニュースしかないもんだから、タマちゃん 5 。アメリカに行ったら観ていないですよ。あの可
愛い目でね、目が今充血しているとかいう、誰がそんなところまで観ているんですか（笑）。今、


なんか激痩せだとか言って・・・。
逆風にもかかわらず生きていく人たち（タマちゃんの場合、逆流でしょうね。）。
逆風の光景というのは、ガリラヤ湖では日常的なことですから、立地条件的に。
ガリラヤ湖というのは、深いところでも50ｍくらい、ガリラヤ湖の水面というのは、地中海より
も200ｍも低い訳ですから、盆地みたいなもんで、大した大きさじゃないんですよね。日本では霞
ヶ浦という、今は汚染されて何も生きていないんじゃないか、櫻にボタン 6 と軍歌に歌われた、今は
誰も知らないかも知れませんが、そういう霞ヶ浦よりも小さい。
美しいんだけれども、夕方になると、突風が吹く。それは、レバノンの方の山、一年通して上の
方に雪がある。そして谷間があって、ガリラヤ湖の北東あたりはすき間になっていて、平原が拡が
っていて、いろんな複雑な立地条件により、環境のため、時々突風が起きる。それはみんな知って
いることです。
ガリラヤ湖の北東の所に、１キロくらい入った漁村にベツサイダという街があります。
ベツサイダというのは、ペテロもアンデレもピリポもそこの出身です。
ここでは目の見えなかった人が癒やされるという出来事があって、私も大好きな出来事で、何度
も説教で取り上げています。
ところが、このベツサイダという街は、極めて信仰的に頑（かたく）なと言うか、信仰が薄い。
だからイエスも厳しい言葉を語っておられますが、そのベツサイダ、この今日読んだ出来事、すな
わち朝方というか、普通突風は夕方吹くのですが、この話によると、朝方というか朝の３時から４
時ということになるのですが、弟子達が小さな船に乗って６キロくらいの距離をベツサイダに向か
って漕いでいます。
彼らはイエスに強いられて、5000人の人がパンと魚で満足したという、あの奇蹟物語の直後、ベ
ツサイダに行けと言われます。
英語では、dismissという言葉を使っています。Jesus dismissed them. と。
dismissというのは面白い言葉で、今日の聖書の箇所を読んでいますと、「解散させられて」と
言いますけれど、dismissというのは、時には「却下」、例えば法廷なんかでは、dismissというの
は、却下するということです。あるいは放校、つまり退学です。
dismiss というのは、解放とかという意味もあり、裁判ではcase dismissedというと無罪を意味
します。
どちらにしても、そうやって弟子達、この弟子達がもの分かりが悪くって、実際何が起こってい
るのか？この5000人の人たちが、わずかなパンと魚で養われたという、まあ奇蹟。意味がよく分か
らない。でも人々は興奮している訳ですよ。
「すごいことが起こった」
「このおっさんは、ナザレから出てきて、この人こそ、我々の待っていた人じゃないのか？」
「ご飯食べさせてくれた。」
イエスは、弟子達を解散させる。dismiss、ベツサイダへ行け。イエス自身は一人で山に入られ
て、祈られた。
このイエスの姿というのは、一人になって祈るだけです。我々、一人になって祈るというのは、
格好いいと言いますが、大切なことでしょう。
イエスは、繰り返し一人になって祈られた。様々なことがあって、よく考えられたということも
あるでしょう。だけども、それは全く全てのものから隔離されて、自分だけ一人になって、自分の
ことだけ考えたということではなくて、自分が伝えようとしている人々、自分が生きている社会の
環境や状況、問題、そういうことも念頭に置いて祈られたのでしょう。
弟子達は舟に乗って、ベツサイダまで６キロくらいの距離を出かけます。大した距離じゃないん
ですよね。
この連中、中にはベテランの漁師がいますから、ガリラヤ湖なんていうのは、もう自分の庭のよ
うなものです。ベテランの漁師で、湖の状況なんてよく知っている、はずなのに、突風が起こって
、パニック状態に陥った。
このパニックに陥ると言うことは、持っているものが機能しなくなると言うことです。
自分が今まで積んできた漁師としての体験にしても、自分がよく知っていると思っているこの湖
に関する知識にしても、これが機能しない。
漕ぎあぐんでいるというか、うまく漕げない。これは複数漕いでいるんですからね。
パニック状態になっているものだから、単に自分の体験や知識が活きないだけじゃなくて、呼吸
を合わせて一緒に漕ぐと言うことができない。漕いでも漕いでも舟は前に進まないという状況だし
、夜だし、暗いし。
暗い状況というか、セッティングというか、特に海というのは不気味ですよね。
そういう時に、もう恐れ、焦り、そういうもので雁字搦めになって、何にも力が出せない状況に
あった弟子達を観てご覧になった。
イエスは一人で山に籠もって祈っているはずなんですよ。
でも、そういうパニック状態にある弟子達を、イエスは見ておられた。これを理屈でいろいろと
辻褄を合わせようとしたら、上手くいくはずないんです。
夜じゃないですか。どうしてイエスは見ることが出来たんだ、というようなことになりますね。


そんな時にイエスは、弟子達のところに行かれた。湖の上というか、水の上を歩いて行かれた。
そこでみんな引っかかっちゃって、ここで話が終わりになっちゃうんです。
どうして水の上を歩いて行けたのか？そんなことはどうでもいいんですよ。水の上を歩いたか歩
かなかったか。
イエスは、パニック状態になっている弟子達のところに行かれた。有り難い話なんだけども、こ
れで終わんないんですね。
イエスは、通り過ぎて行こうとされた訳ですよ。困りますよ、来て下さるのは有り難いのですが
、「ちょっと待って下さい、ここですよ、私たちが待っているのは。」
きっとイエスは、我々がどのような状態にあっても、誰に従って、どっちの方向に行くかという
ことを示されようとされている。
だから、ここでは心配になりますよね。こっちはパニック状態で、どんなに力を合わせても舟が
進まないところに、イエスが来て下さった、万歳。でもちょっと待った、我々ここですよ。
イエスが舟に乗り込まれると・・・、聖書って言うのは、本当にもうちょっとキチンと整理して
ね、分かるように話して欲しいと思う時がありますけれど・・・。
通り過ぎて行かれようとした、弟子達は怯えていて、見た姿は幽霊かと思ったりしている。
イエスが舟に乗り込まれると、風が静まった。
他の箇所では、「風を叱られた」とかいろいろあります。でもここでは、イエスが舟に乗り込ま
れてきた時に、風はもう静まっています。
そこで、「安心しなさい。わたしだ。恐れることはない。」
これをUさんのスタイルで読むと（力を入れて、ドラマなんだから）。
「安心しなさい。」これが先ですよ。すなわち、あなたの持っている経験も知識も作動させなさ
い。力を合わせて呼吸を合わせて漕ぎなさい。
「わたしだ。」私は乗っているんだ。あなたたちは幽霊だと思って先に行ってしまっていると思
っているかも知れないけれど、私はここにいるんだ。
だから「恐れることはない。」
そうやって、状況は平静さを回復します。
弟子達も、「おおー、ベツサイダだ。」、自分の故郷ですから。
人間、誰にでも逆風は吹きます。時々、逆風ばっかりじゃないかと思うくらい。
これ逆風がなかったら、人間というのは、極めてか弱い、折れやすい存在だったと思います。モ
ヤシですね。モヤシにも繊維としての機能は一応ありますが・・・。
だけども、逆風があるが故に、我々は自分の力の弱さ、自分の限界、自分がどういう状態に陥る
可能性があるかと言うこと知ります。
逆風が故に、我々はストップをかけて、立ちまって、立ち止まらざるを得なくて、物事を見直し
てみる、考え直してみるという機会が与えられている。
危機ですけれど、成長のチャンスです、逆風というのは。
逆風の中で、自分のいろいろな愚かさや、自分の限界、自分がどうやって人間関係を作ろうとし
ているのに上手くいかないのか、自分の中の訳の分からない好き嫌いとか、自分の整理できない悩
みとか、今、神学館 7 は工事中で、工事する人は、昨日僕の部屋を見て、「これは最後にしましょう
や。」（笑い）
逆風は天災かも知れません、自然の現象、地震。
人災かも知れない。自分が作り出すものかも知れない。人の不親切や乱暴や、自分の軽率さや、
忠実や、そういうことかも知れない。
しかし、今日の箇所、神は人間には耐えられない逆風は吹かされない。
パニックに陥っても、それを乗り越えていくだけの安定を与える存在がおられる。
「安心しなさい。わたしだ。恐れることはない。」
その声です。
お祈りいたします。
 神さま、一人々々、人生の中で様々な逆風を体験します。どうかそれを、避けることがないよう
に。それに直面する勇気をあなたが与え、その逆風の中でどう生きるかを考える知恵を与えて下さ
いますように。
 そして、私たち共々に力を合わせて逆風の中を漕ぎ、目指す御国へと達することができるように
してください。
 主の御名を通して祈ります。
 アーメン`,
      }
    },

    methods:{
      getTheData(){  

        var docRef = db.collection('fukada').doc(`articles`);

        docRef.get().then((doc) => {
            if (doc.exists) {
              console.log('hey')
              this.historyArticles = JSON.parse(doc.data().data)
              console.log(this.historyArticles)
              let index = this.$route.params.index;
              index = parseInt(index)
              this.currentIndex = index
              index--
              
              this.article = this.historyArticles[index]

              this.incrementViews()
              // const ref = db.collection('analytics')
              // ref.doc(`views`).update({
              //   articles:
              // })
              // console.log(this.historyArticles)
              // console.log(article.content)


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      },
      incrementViews(){
        // console.log('hes')
        var docRef = db.collection('analytics').doc(`views`);
        docRef.get().then((doc) => {
            if (doc.exists) {
              let index = this.$route.params.index
              index = index--
              let array = doc.data().fukada
              this.tempViews = array[index]
              console.log(this.tempViews)
              this.tempViews++
              array[index] = this.tempViews
              console.log(this.tempViews)
              
              // console.log(tempViews)
              console.log(array)

              

              
             
              
              const ref = db.collection('analytics')
              ref.doc(`views`).update({
                fukada: array,
              })
              // console.log(this.historyArticles)
              // console.log(article.content)


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
        var hour = a.getHours();
        var min = a.getMinutes();
        // var sec = a.getSeconds();
        var time =  ' ' + year + '年'  + (month + 1) + '月'+ date + '日'+ hour + '時'+min + '分';
        

        return time

      },
      jumpPage(index){
        window.location.href = `/about-fukada/articles/${index}`
        // console.log(index)
      },
      
    },
    mounted(){
      console.clear()
      console.log('oh hey')
      this.getTheData()

      console.log(typeof this.content1)

      // this.getCalendar()
      // first get month and year from the url links
      // add only the dates from the current month
      // thats it

      // let index = this.$route.params.index;
      // index = parseInt(index)
      
      // const article = this.historyArticles[index]
      // console.log(this.historyArticles)
      // console.log(article.content)

      

    },

    computed:{
      pagingArray(){
        // 5 in total and arrows
        // let index = this.$route.params.index;
        // index = parseInt(index)

        // let last = this.historyArticles.length

        
        // switch(index){
        //   case 1:
        //     return [1,2]

        //   case 2:
        //     return [1,2]

        //   case last-1:
        //     return [last-3,last-2, last-1,index,index+1]

        //   case last:
        //     return [index-4,index-3,index-2,index-1,index]

        //   default:
            return [1,2]

        // }
      },
    }
  }
</script>

<style>
  .content{
    /* margin-top: 1000px; */
    width: 55vw;
    margin: 200px auto;
    text-align: left;
    
  }

  .content span{
    /* color: red; */
    display: block;
    white-space: pre-wrap;
    font-size: 140%;
    margin: auto auto;
    width: 100%;
    /* text-align: center; */
    /* background-color: red; */
  }

  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 80px;
    height: 80px;

    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    margin: 30px auto;

    
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

  /* ---------------- */
  .center {
    margin-top: 100px;
  text-align: center;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

/* --------- */
.button-8 {
  float: right;
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px .8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-8:hover,
.button-8:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.button-8:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.button-8:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}

@media (min-width:320px) and (max-width:479px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */

  .content{
    /* background-color: red */
    width: 85vw;
  }

}

</style>