<template>
  <div class="content" v-if="article">
    <span>{{convertTImestamp(article.timestamp)}}</span><br>
    <span>{{tempViews}}回閲覧</span><br><br>
    <h1>{{this.$route.params.index}}. {{article.title}}</h1><br><br>
    <!-- <span>{{article.content}}</span> -->
    <span>{{tempContent}}</span>
    <br><br>
    <!-- HTML !-->
    <a class="button-8" role="button" href="/history" >戻る</a>



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
        tempContent: `大阪で万国博覧会が開催されて日本中が大騒ぎだった１９７０年であった。
          万博だけでなく１９６８年の終わりごろから起こっていた大学や、そして後にはキリスト教会で 社会に深く根ざす問題を提起する青年たちの運動が社会全体を揺さぶり始めていた。日本基督教団では大阪万博にキリスト教館を作ることに疑問を感じた人々が激しく反対運動を展開し１９６９年秋、東京の山手教会で開催された総会は騒然となり議事進行ができないほどであった。私もその場に居合わせたのだが、その激しさの中から少しずつ読み取ることのできた問題の本質に目覚める思いがした。しかし、同時に、その激しさには困惑せざるを得なかった。困惑の原因のひとつは「問題提起者」というマイナスイメージが伴う名称で呼ばれていた青年たちの中には同志社神学部の学生や卒業生も少なからずいたことであった。通常決して激しい性質を露にする青年たちではないのに総会議場での彼らは決起集団のような様相を呈していた。重大な課題を議場に投げかけていたのであるが、その方法は多くの議員たちを戸惑わせ、緊張させたのである。 
         この総会は一つの象徴的出来事であった。多くの教会でも青年たちの声が高まったのだが、結果的に彼らは押しつぶされるか押し出されるかして、その多くは教会から去って行った。その中には今に至るまで教会に立ち返ることができないでいる人々もいる。そのような息苦しく、困惑し、心を痛めた一年が過ぎ去ろうとしていたある日、様々な活動で接することの多かった関西セミナーハウス所長村山盛敦先生が声をかけてきた。沖縄に根を持つ屈強な顔立ちでありながら繊細な神経の持ち主で海軍兵学校在学中に終戦を迎えた牧師である。「深田さん、青年たちが教会を去ってゆき寂しくなるねえ。形にとらわれないで一緒に聖書を読み、祈る集まりをしようよ。杉瀬君とも話しているんだけど。」これが火種になった。杉瀬祐先生は当時同志社女子大学の教授であり、杉瀬夫人はセミナーハウスの母体である日本クリスチャンアカデミーの働きの中核的責任を担っておられた方であった。
         そして私たちが住居としていた上賀茂の宣教師館を会場にして１９７１年１月２日、日曜日に集まったのは村山、杉瀬、深田３家族に加えてセミナーハウスや私たちの友人数人であった。なんとなく「上賀茂集会」と呼んで毎日曜日に礼拝を共にし、その後、時には食事を共にすることになったのが私たちの教会の発端である。少々雲が浮かぶけど明るい朝であった。 
         私はこれが単なる思い付きで、偶然に始まった「集い」だとは思っていない。重苦しい空気がまだ社会に漂い、山積する問題の解決の糸口も見つけにくいとすら思われていた時に私たちは綿密な計画書を持たずして集まり、讃美歌を歌い、聖書を読み、祈りをともにし思いを語り合ったのである。外の明るさを反映してか、神のみ手の導きを感じることのできる朝であった。

        `,
        
      }
    },

    methods:{
      getTheHistory(){  

        var docRef = db.collection('history').doc(`articles`);

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
              console.log(this.historyArticles)

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
        console.log('hes')
        var docRef = db.collection('analytics').doc(`views`);
        docRef.get().then((doc) => {
            if (doc.exists) {
              let index = this.$route.params.index
              index = index--
              let array = doc.data().articles
              this.tempViews = array[index]
              console.log(this.tempViews)
              this.tempViews++
              array[index] = this.tempViews
              console.log(this.tempViews)
              
              // console.log(tempViews)
              // console.log(array)

              

              
             
              
              const ref = db.collection('analytics')
              ref.doc(`views`).update({
                articles: array
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
        window.location.href = `/history/articles/${index}`
        // console.log(index)
      },
      
    },
    mounted(){
      console.clear()
      console.log('oh hey')
      this.getTheHistory()

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
        let index = this.$route.params.index;
        index = parseInt(index)

        let last = this.historyArticles.length

        
        switch(index){
          case 1:
            return [1,2,3,4,5]

          case 2:
            return [1,2,3,4,5]

          case last-1:
            return [last-3,last-2, last-1,index,index+1]

          case last:
            return [index-4,index-3,index-2,index-1,index]

          default:
            return [index-2,index-1,index,index+1,index+2]

        }
      },
    }
  }
</script>

<style>
  .content{
    /* margin-top: 1000px; */
    width: 70%;
    margin: 200px auto;
    text-align: left;
    
  }
  
  .content span{
    font-size: 125%;
    white-space: pre-wrap
    /* color: red; */
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

</style>