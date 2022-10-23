<template>
  <div class="main-block" v-if="!hasPassed">
    <form onsubmit="return false">
      <h1>管理者パスワード</h1>
      <div class="info">
        <input v-model="tempPass" placeholder="パスワード" >
      </div>
      <button type="submit" @click="auth()">Submit</button>
    </form>
  </div>

  <div v-else class="content">
    <h2>articles</h2>
    <div>
      <input type="number" placeholder="index" v-model="tempIndex">
      <input type="text" placeholder="内容" v-model="tempContent" style="white-space: pre-wrap;">
      <button @click="editArticle()">編集</button>
    </div>
    <div class="articles-wrapper">

      <template v-for="(item,i) in historyArticles" :key="i">
        <div v-if="item">
          <div>{{i+1}}.{{item?.title}}</div>
          <hr>
        </div>
      </template>
    </div>
    <!-- <span>{{historyArticles}}</span> -->

  </div>

</template>

<script>
import db from '../../firebase.js';

export default{
  data(){
    return{
      hasPassed: false,
      // hasPassed: true,

      tempPass: undefined,
      actualPass: undefined,

      historyArticles: undefined,

      tempIndex: undefined,
      tempContent: undefined,
    }
  },
  methods:{
    auth(){
      if(this.tempPass == this.actualPass){
        this.hasPassed = true
        
        return 
      }
      
      alert('パスワードが違います')
    },
    getPass(){
      var docRef = db.collection('analytics').doc(`editing`);

        docRef.get().then((doc) => {
            if (doc.exists) {
              this.actualPass = JSON.parse(doc.data().password)
              // console.log(this.actualPass)


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    },

    getTheHistory(){  

      var docRef = db.collection('history').doc(`articles`);

      docRef.get().then((doc) => {
      if (doc.exists) {
        // this.tempString =doc.data().data
        this.historyArticles = JSON.parse(doc.data().data)
        // console.log(this.historyArticles[1].content)
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
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });


    },

    deleteArticle(){
      // console.log(this.historyArticles[])

      delete this.historyArticles[18]
      delete this.historyArticles[19]
      delete this.historyArticles[20]
      delete this.historyArticles[21]
      delete this.historyArticles[22]
      // delete this.historyArticles[23]

      // this.historyArticles = JSON.stringify(this.historyArticles)

      // const ref = db.collection('history')
      // ref.doc(`articles`).update({
      //   data: this.historyArticles
      // })
      // console.log(typeof this.historyArticles)
      // this.historyArticles = this.historyArticles.pop();
      // console.log(this.historyArticles)
    },

    editArticle(){
      
      // this.tempContent = `&nbsp;`+ this.tempContent
      this.historyArticles[this.tempIndex-1].content= this.tempContent
      this.historyArticles = JSON.stringify(this.historyArticles)

      const ref = db.collection('history')
      ref.doc(`articles`).update({
        data: this.historyArticles
      })

      console.log('updagting')

    },

  },
  mounted(){
    console.clear()
    this.getPass()
    this.getTheHistory()
  }
}

</script>

<style>

      h1 {
      margin: 0 0 20px;
      font-weight: 400;
      color: #1c87c9;
      }
      p {
      margin: 0 0 5px;
      }
      .main-block {
        margin-top: 5em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background: #1c87c9;
      }
      form {
      padding: 25px;
      margin: 25px;
      box-shadow: 0 2px 5px #f5f5f5; 
      background: #f5f5f5; 
      }
      .fas {
      margin: 25px 10px 0;
      font-size: 72px;
      color: #fff;
      }
      .fa-envelope {
      transform: rotate(-20deg);
      }
      .fa-at , .fa-mail-bulk{
      transform: rotate(10deg);
      }
      input, textarea {
      width: calc(100% - 18px);
      padding: 8px;
      margin-bottom: 20px;
      border: 1px solid #1c87c9;
      outline: none;
      }
      input::placeholder {
      color: #666;
      }
      .main-block button {
      width: 100%;
      padding: 10px;
      border: none;
      background: #1c87c9; 
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      }
      .main-block button:hover {
      background: #2371a0;
      }    
      @media (min-width: 568px) {
      .main-block {
      flex-direction: row;
      }
      .left-part, form {
      width: 50%;
      }
      .fa-envelope {
      margin-top: 0;
      margin-left: 20%;
      }
      .fa-at {
      margin-top: -10%;
      margin-left: 65%;
      }
      .fa-mail-bulk {
      margin-top: 2%;
      margin-left: 28%;
      }
      }

  .content{
    width: 50%;
    margin: 5em auto;
    text-align: center;
  }

  .articles-wrapper{
    text-align: left;
  }
      
</style>