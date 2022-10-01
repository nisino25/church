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
    width: 70%;
    margin: 200px auto;
    text-align: left;
    
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