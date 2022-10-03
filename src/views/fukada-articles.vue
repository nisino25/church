<template>
  <!-- <div class="content"  style=""> -->
  <div class="content" v-if="readyToShow" style="">
    <span style="text-align: right;">{{article?.timestamp}}</span><br>
    <span>{{tempViews}}回閲覧</span><br><br>
    <h1 style="text-align:center">「{{this.$route.params.index}}. {{article?.title}} 」</h1>
    <div>
      <span>{{article?.from}}</span>
    </div><br><br>
    <!-- <span>{{article.content}}</span> -->
    <span id="content"></span>
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

        <a @click="jumpPage(historyArticles?.length)" v-if="currentIndex !== historyArticles?.length">&raquo;</a>
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

        readyToShow: false,
        content2: ` あるいは、強いと思っている人でも、人間は、一人では生きていくことは出来ません。
他の人間から切り離されて、他の人間との関係が、全くなくて生きていくことは不可能です。
他の人間とは言わなくてもいいでしょう。他の命と言える。
ロビンソン・クルーソーの話、あんまり長いこと読んでいないので、記憶が不明確になっていますけれども、あのロビンソン・クルーソーの２８年間の孤島での生活、南アフリカから離れた、これはご存知のようにデフォー<sup>1</sup>の小説ですけれども、新島襄が愛読したという話、生田さんから聴きましたけれど。
あの２８年刊の孤島の生活の中においてさえ、ロビンソンは山羊を飼い慣らしたり、オウムを話し相手にしたりして、生きている。
僕の記憶だと、難破した船から犬とか猫を連れて降りたような、少なくともロビンソン・クルーソーの物語によく出てくる挿絵、彼は犬を連れているという。いかがでしょうか？
どっちにしても、ロビンソン・クルーソーは全く他の命、まあ植物も命ですけれども、から離れていた訳ではなくて、そういう生活の中で、聖書を３冊精読した。
３冊読んだと言うことは、読んでいるうちにボロボロになって、次の・・・。そんだけ聖書があったというだけで、普通難破船というか、船が沈みそうになった時、聖書を持って逃げないだろうと思うのですが・・・。
で、２４年目にして外来というか、人がやって来て、やって来た人たちの奴隷の一人がフライデーと言って、このフライデーと共に生活を始めて、最終的にはイギリスに帰っていくという物語です。
別にロビンソン・クルーソーじゃなくても、フィリピンのジャングルで戦後３０数年暮らした小野田少尉<sup>2</sup>、あるいはその前にグアム島にいた横井<sup>3</sup>という元兵士。彼らのジャングルにおける話にしても、全く孤独、他の命と関わりのない生活ではなくて、敵対的な存在のように思い込んでいたとはいえ、人間を察知するというか、感じるという所に住んでいたし、周りに動物がいたからこそ、彼らの命は支えられたということも言えるでしょう。
この一人では生きていけないということは、我々人間は、常に何らかの助けが必要だと言うことです。慰めとか、励ましとか、様々な助けを必要とする存在。
今日読んだ聖書の中に、不思議な「弁護者」という者が出てきます。
この新共同訳は、「弁護者を遣わす」というのが出てきますが、前の訳は、「助け主を送る」と書いてあります。「弁護者を遣わす」というのは、語源から見れば、それなりの意味があるのでしょうが、「助け主を送る」という方が、親しみを感じるというか、分かりやすいというか、一番新しい英語では、この言葉を”advocate”という言葉を使っています。
“advocate”というのは、何かものを預言者風に主張するとか、守るために立ち上がるという意味を持っています。
数日前、朝のテレビだったと思いますが、この頃、朝、テレビなんかゆっくり見ている時間が少なくて、急いで食べて、皿洗って出てくる。
そのテレビは、富山のある小学校の校長の方針に基づいて、「褒める主義」に基づいての教育というのを、どなたかご覧になった？
朝、おヒマなんですね（笑い）。
この「褒める主義」が３年続けられて、一定の成果を見ている。良い結果が現れていると、この番組は報道していました。
観ているこちらの方としては少々ひねくれているので、少々技巧的に、そういう人いますよね、内容がどうであるかにかかわらず、「素晴らしい」とか「本当によくできました」とか、空々しい時もあるのですが、でも意味もなく怒鳴りつける教師よりは、褒めて励ます教師の方が好感を抱けるように思ったのです。
ですから、人間というのは、他者なくして生きていけない。どんなに強がっていても、人間というのは、しばしば足が揺らぐし、知恵が尽きてしまうし、絶望に陥ったり、あるいは困惑の中を彷徨（さまよ）ったりする。
そのような時に体験する、あるいは感じる助け、慰め、励ましというのは、通常想像できないような力と言いますか、私たちの支えになる。
その昔、私が若い時に自由学園を退学になったのを、みんななぜかなぜか、と聞く。とそれをまた話すのもバカなのですが、あの退学になって、どうして自分が退学になるのか分からない、という子どもなりの困惑のさ中に、そういう時になると、前に羽仁説子<sup>4</sup>さんという幼児生活団時代の責任者。説子さんは、僕らは説子先生と呼んでいましたが、説子先生は、既に僕が退学になったということを聞いていて、「あなたにはね。あなたの生き方というものがあるのよ。」と一言言ったのですね。
僕はちょっと、説子先生にも「なにやってんのよ、あなた」と怒られるんじゃないかな、と気がしたのですが、「あなたにはね。あなたの生き方というものがあるのよ。」という一言で、相当安定した気持ちを取り戻したという記憶があって、その時の彼女の顔すらも、思い浮かべることができます。
でも、人間というのは限界があるわけですから、どんなに善意で、どのような愛の表現として人に接していても、それは完全ではありえない。
したがって、人間が必要としている助けとか、慰めとか、励ましというのは、１００パーセントの効力を持つことは、ほとんどあり得ない。
どんなにそれが、時には想像しがたいような力となって自分を支えるとしても、それはどうしても自分と他者という存在の間には溝があって、時にはそれが埋められることのできない溝であったり、でもそれは勇気を出して飛ぼうとすれば、飛び越えることのできる溝であったりするけれども。でもどちらにしても溝があるが故に、物事が完全に理解されたり、伝えたいと思うことが、本当によく伝わったり、あるいは心と心が一体となって、永遠に続くということは、人間の生活の中ではあり得ない。
そういう現実の中で、我々はしばしば失望したり、落胆したり、相手に対して、人に対して、不安を感じたり、不信を抱いたり、あるいは時には自分を卑下したりします。
読んだこのヨハネの福音書による箇所の前後というのは、もう歩み続けてきたこの３年間の伝道者としての生活において、イエスは最終段階というものを目前にしていて、それを意識しているという時ですから、それだけにここに現れてくるイエスの姿というのは、迫力に満ちています。
１４章には、「心を騒がせるな。神を信じ、私を信じなさい。私の父の家には住む所がたくさんある。」といったストレートな表現で弟子たちに迫ってきます。それまでの例え話を用いるとか、物語を語るとか、もうそれはない。
自分が今まで語ってきたこと、示そうとしてきたことを圧縮したような形で、ここで語っておられます。ですから１５節のところからは、一種の彼の祈り、自分が残していかなくてはならない、この弟子たちの上に、審理の霊の守りというものがあるようにと神に祈るように語るイエスの姿です。
ヨハネ福音書が綴っている今日読んだところには、一種の神秘的なものがあります。
きっと、これがストレートにイエスの言葉だったというよりは、イエスが語られたことを、語り伝えて、繰り返し想い起していった原始教会の人たちの、そしてそれがエルサレムからずっと外国に広がり始めている時の信仰の告白的な表現なのでしょう。
「かの日には、私が父の内におり、あなた方が私の内におり、私もあなた方の内にいる。」（20節）というのは、あまりヘブライ的表現とは言えません。
その語られている言葉に至る段階で、イエスは、「あなた方を孤児（みなしご）にはしておかない。」（18節）という言葉を語られます。
ご存知のように、旧約聖書の時代においては、未亡人と孤児（みなしご）、外国人というのは確実に差別の対象であって、社会の周辺に押しやられている存在であった。同時に旧約聖書は、そういう人たちに対するケアというものを強調するという、ちょっと矛盾した現実というものを読み取ることができますけれども、でも我々が今、孤児とかみなしごとか（こういう表現は使わない傾向にありますけれど）、今、我々がそういう言葉で想い起こす存在以上に、特に父親のない子ども、というのは非常に悲惨な社会的存在でした。
「私はあなたたちを孤児としておかない」というイエスの言葉が、どれだけ歴史の中で多くの人を励ましてきたか。そして私たちは、今日、猛烈な勢いでアフリカを襲っているエイズによって、孤児になっていく子供たちや、あるいは戦争やその後遺症で、独りぼっちになってしまうパレスチナやイスラエルの子どもたち、イラクの混乱の中で家庭から離れてしまう子供たち、あるいは9.11で突然親のない存在になってしまった人たち・・・を思います。
それだけではない。
家庭内暴力があって、精神的放置状態になってしまっている子供たち。
「孤児」というのは、子どもだけではない。所属感も自尊心も失いがちになって、やっと生き延びていっている人々も少なくない。
不安の虜になっている人たち、なんというか、「魂の孤児」、そう言えるような人間が多い社会です。ですから、子どもに限ったことではない。
「私はあなたたちをみなしごとしておかない。私はあなた方の内にいる。」
「私の言葉を守る人は、父に愛されて、私と私の父は、その人のところに行って一緒に住む。」（23節）
この「一緒に住む」という言葉、同居人ですよ。
「私は同居人になる。」
それは丁度、ザアカイにイエスが「今晩、あなたの所でね、メシ食って泊まるから」というようなものです。
あなたを孤児とはしておかない。一人でいる必要はない。私はあなたと一緒に住むんだから。
これはさっき引用しました新しい英語の聖書は、”make our home with you” という表現になっています。もっと古い古典的な聖書は、”live with you” ”dwell with you” “abide with you” という言葉を使ったりしますけれど、あなたと家庭を構成するというようなものです。
人間がお互い切り離されて、対立と衝突というものが、多くの人の命を奪っていく。
助けと慰め、励ましというのは、どこから来るのだろうかと呻くように生きている人が多い世の中に、私たちは生きています。
イエスに従って行きよう、イエスを愛したいという人たちは、目を見張って、耳を澄まして、人の呻きを聴き取り、傷を見つけて、その癒やしの実現に励むことが求められます。
その任に当たるためにも、私たちは、新たな力が必要であって、我々が聖餐に与るというということは、我々がその力を求めて食卓に集まるということです。
お祈りいたします。
<hr>
1. Daniel Defoe(1660-1731) “The Life and Strange Surprising Adventures of Robinson Crusoe”は1719年刊。
2. 小野田寛郎(1922-2014) 1974年にフィリピン・ルバング島で発見、帰国。
3. 横井庄一(1915-1997) 1972年にグアム島で発見、帰国。
4. 羽仁説子(1903-1987)羽仁もと子の娘。「婦人の友」記者、自由学園教授等を勤めた。
5. 2002年末においては全世界4,200万人のエイズ患者のうち、アフリカが2,940万人（70パーセント）を占めた。同年のエ
イズ死亡者は全世界で310万人で、うちアフリカは240万人、77.4パーセントを占めていた。中でも患者数が多いのは南
部アフリカであり、南アフリカ共和国、ナミビア、ボツワナ、スワジランド、レソト、ジンバブエ、ザンビアの7か国で
は人口の15パーセント以上が感染し、中でもボツワナでは、2001年末においては成人人口の38.8パーセントがHIVに感染
していた。
`

        
        

        
      }
    },

    methods:{
      getTheData(){  

        var docRef = db.collection('fukada').doc(`articles`);

        docRef.get().then((doc) => {
            if (doc.exists) {
              // console.log('hey')
              this.historyArticles = JSON.parse(doc.data().data)
              // console.log(this.historyArticles)
              let index = this.$route.params.index;
              index = parseInt(index)
              this.currentIndex = index
              index--
              
              this.article = this.historyArticles[index]

              this.incrementViews()

              

              // let element = document.getElementById("content");
              // console.log(element)


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
              // console.log(this.tempViews)
              this.tempViews++
              array[index] = this.tempViews

              
              this.changeText()
              
              // console.log(tempViews)
              // console.log(array)

              

              
             
              
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

      async changeText(){
        this.readyToShow = true
        await this.sleep(10)
        let element = document.getElementById("content");
        console.log(element)
        // element.innerHTML = this.article.content
        element.innerHTML = this.content2
        

      },

      sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      },
      
    },
    mounted(){
      console.clear()
      // console.log('oh hey')
      this.getTheData()

      // console.log(typeof this.content1)

      // this.content1 = document.body.innerHTML += this.content1;
      // this.content1 = document.getElementsByClassName("article-content").innerHTML +=this.content1
      // if(!this.content1) return
      // console.log('ready')
      // window.onload  = function(){
        
        
      //   let element = document.getElementById("content");
      //   console.log(element)
      // }

      // element.innerHTML = 'heys'
      

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
    width: 70vw;
    margin: 200px auto;
    text-align: left;
    
  }

  .content span{
    /* color: red; */
    display: block;
    white-space: pre-wrap;
    font-size: 125%;
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