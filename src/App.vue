<template>
  <head></head>

  <body>
    

    <div class="wrapper" >



      <div class="header">
        <Transition name="fade">

          <div class="topnav" id="myTopnav" :style="navStyle" :class="[showingMenu ? 'responsive topnav' : '']">
            <a class="/active" href="/" >ホーム</a>
            <a href="/history">教会の歩み</a>
            <a href="/about-church">牧師紹介</a>
            <a href="/access">教会へのアクセス</a>
            <a href="/schedule">行事予定</a>
            <a href="/about-fukada">故深田牧師の部屋</a>
            <a href="/about-dendosho">あいのまち伝道所</a>
            <a v-if="updateTime">最終更新：{{updateTime}}</a>


            <a  class="icon"  @click="showingMenu = !showingMenu; navStyle='background-color: #004658; color: white;'">
              <i class="fa fa-bars"></i>
            </a>
          </div>
        </Transition>

      </div>

      
      <router-view v-if="logined"/>
      
      <div class="maintenance" v-else>

        <strong>ただいま工事中です。<br>しばらくお待ちください。</strong><br><br>
        <small  >2022/10/23 13:05〜</small>
        <span></span>


        <br><br>
        <div >
          <form onsubmit="return false">

            <input type="" v-model="tempPassword" placeholder="パスワードを入力してください" ><br>
            <span style="color:crimson">{{warning}}</span><br>
            <button style="margin-top:20px" @click="checkPassword()">進む</button>
          </form>
        </div>


      </div>
      


      <div class="pg-footer">
        <footer class="footer">
          <svg class="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path class="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
          </svg>
          <div class="footer-content">

            <div class="footer-content-column address">
              <div class="footer-menu">
                <h2 class="footer-menu-name">日本キリスト教団 京都上賀茂教会</h2>
                <ul id="menu-quick-links" class="footer-menu-list">
                  <li class="menu-item menu-item-type-custom menu-item-object-custom">
                    <a target="_blank" rel="noopener noreferrer" >〒603-8071 <br> 京都市北区上賀茂北大路町１７</a>
                  </li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom">
                    <a target="_blank" rel="noopener noreferrer" >Tel&Fax : 075-723-7408</a>
                  </li>
                  <li class="menu-item menu-item-type-post_type menu-item-object-page">
                    <a >kyoto.kamigamo.kyokai@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="footer-content-column">
              <div class="footer-call-to-action">
                <h2 class="footer-call-to-action-title"> 当教会は、ものみの塔(エホバの証人)、世界平和統一家庭連合(旧統一教会)、モルモン教(末日聖徒イエス･キリスト教会)との関わりは一切ありません。</h2>
              </div>
            </div>

            
          </div>
          <div class="footer-copyright">
            <div class="footer-copyright-wrapper">
              <p class="footer-copyright-text"> 
                <a class="footer-copyright-link" > ©2022. | Designed By: Nozomu Ando. | All <span @click="lastUpdate()">rights</span>  reserved. </a>
              </p>
            </div>
          </div>
        </footer>
      </div>

      

      
      
    </div>
  </body>

</template>

<script>
  import db from '../firebase.js';
  import { useCookies } from "vue3-cookies";
  const { cookies } = useCookies();


export default {
  
  data(){
    return {
      testToggle: true,
      windowHeight: window.innerHeight,
      navStyle: '',
      showModal: false,
      modalStatus: 1,

      showingMenu: false,
      vw: undefined,

      totalViews: undefined,
      updateTime: undefined,

      logined: true,
      tempPassword: '',
      actualPassword: undefined,
      warning: '',
      // showModal: false,
      


    }
  },
  methods:{
    getNavStyle(){
      // console.log(window.scrollY)
      if(window.scrollY == 0) return 

      
    },

    handleScroll () {
      // if(event == 0)
      if( this.showingMenu){
        return this.navStyle = 'background-color: #004658; color: white; '
      }
      
      if(window.scrollY == 0){
        // console.log('now')
        return this.navStyle = 'background-color: none; color: black;'
      } else{
        // console.log(window.scrollY)
        this.navStyle = 'background-color: #004658; color: white; '
      }


      // console.log('now')


    },

    modal(){
      console.log('sup')
      this.showModal = true
    },

    lastUpdate(){
      let r= confirm(`Are you ready to update the latest time?`);
      if(r){
        console.log('hey')
        // this.movingRobber = false;
        const ref = db.collection('analytics')
        ref.doc(`update`).set({
          data: Date.now()
        })
        return;
      }
    },

    getLastUpdate(){
      var docRef = db.collection('analytics').doc(`update`);
      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data().data)
          this.updateTime = doc.data().data
          // console.log(typeof this.updateTime)
          
          var a = new Date(this.updateTime );
          // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = a.getMonth() + 1;
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          this.updateTime = `${year}年${month}月${date}日 ${hour}時${min}分`;


        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    },

    toggleModal(){
      this.showModal = true
      console.log('heys')
    },

    getPass(){
      var docRef = db.collection('analytics').doc(`main`);

        docRef.get().then((doc) => {
            if (doc.exists) {
              this.actualPassword = doc.data().password
              // console.log(this.actualPass)


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    },

    checkPassword(){
      if(this.tempPassword == this.actualPassword){
        this.logined = true

        var date = new Date();
        date.setTime(date.getTime() + (6000 * 1000));
        // this.cookie('church-login', true, { expires: date });
        cookies.set("church-login", 'done', 60 * 30);

      }else{
        console.log(this.actualPassword)
        this.warning = 'パスワードが違います'
      }
    },

    getCookies(){
      let flag = cookies.get('church-login')
      console.log(flag)
      

      if(flag){
        console.log(`got cookies`)
        this.logined = true
      }else{
        console.log('where my cookie')
      }
    }

    



    

    
  },

  watch:{
    window(){
      console.log(window.scrollY)
    }
  },

  created(){
    console.clear()
    window.addEventListener('scroll', this.handleScroll);
    this.vw = document.documentElement.clientWidth 
    console.log(this.vw)

    this.getLastUpdate()
    this.getPass()

    this.getCookies()

    



    // this.incrementTotalViews()
  }
}
</script>

<style>

html, body{
  padding: 0;
  margin: 0;
  overflow-x: hidden; 
  
}


/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px lightgrey; 
  border-radius: 1px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(0, 70, 88);
  border-radius:1px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: green;
  border-radius:1px;
   
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* ---------------------------- */

/* .topnav {
  
  overflow: hidden;
  z-index: 100;
  position: fixed;
  top:0;
  width: 100vw;
  transition: all 0.8s ease-out;


  

  
  
}

.topnav a {
  
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;


  display: table-cell;
  float:right;
  
}

.topnav a:first-child {
  margin-right:100px;
}

.topnav a:hover {
  background-color: #ddd;
}

.topnav a.active {
  background-color: #04AA6D;
}

 */


/* -------------------------------------------------------------------------------- */
.topnav {
  overflow: hidden;
  /* color: #2c3e50; */
  /* background-color: #333; */

  transition: all 0.8s ease-out;

  z-index: 100;
  position: fixed;
  top:0;
  width: 100vw;
}

.topnav a {
  float: left;
  display: block;
  /* color: black; */
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  /* background-color: #ddd; */
  /* color: black; */
}

.topnav a.active {
  background-color: #04AA6D;
  /* color: white; */
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .responsive {
    position: fixed;
    top: 0;
    background-color: #004658;
    color: white; 
    transition: all 0.8s ease-out;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ------------------------------ */
* {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
.pg-footer {
  /* margin-top: 1; */
  font-family: 'Roboto', sans-serif;
}


.footer {
    background-color: #004658;
    color: #fff;
}
.footer-wave-svg {
    background-color: transparent;
    display: block;
    height: 30px;
    position: relative;
    top: -1px;
    width: 100%;
}
.footer-wave-path {
    fill: white;
}

.footer-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 40px 15px 100px;
  position: relative;

  display: flex;
  /* background-color: red; */
  text-align: lefts;
}

.footer-content-column {
  box-sizing: border-box;
  /* float: right; */
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
  color: #fff;

  text-align: left;

  margin: auto auto;
}

.footer-content-column ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-logo-link {
    display: inline-block;
}
.footer-menu {
    margin-top: 30px;
}

.footer-menu-name {
    color: white;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
    text-transform: uppercase;
}
.footer-menu-list {
    list-style: none;
    margin-bottom: 0;
    margin-top: 10px;
    padding-left: 0;
}
.footer-menu-list li {
    margin-top: 5px;
}

.footer-call-to-action-description {
    color: white;
    margin-top: 10px;
    margin-bottom: 20px;
}
.footer-call-to-action-button:hover {
    background-color: white;
    color: #00bef0;
}
.button:last-of-type {
    margin-right: 0;
}
.footer-call-to-action-button {
    background-color: #027b9a;
    border-radius: 21px;
    color: white;
    display: inline-block;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    padding: 12px 30px;
    margin: 0 10px 10px 0;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color .2s;
    cursor: pointer;
    position: relative;
}
.footer-call-to-action {
    margin-top: 30px;
}
.footer-call-to-action-title {
    color: white;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
    text-transform: uppercase;
}
.footer-call-to-action-link-wrapper {
    margin-bottom: 0;
    margin-top: 10px;
    color: #fff;
    text-decoration: none;
}
.footer-call-to-action-link-wrapper a {
    color: #fff;
    text-decoration: none;
}





.footer-social-links {
    bottom: 0;
    height: 54px;
    position: absolute;
    right: 0;
    width: 236px;
}

.footer-social-amoeba-svg {
    height: 54px;
    left: 0;
    display: block;
    position: absolute;
    top: 0;
    width: 236px;
}

.footer-social-amoeba-path {
    fill: #027b9a;
}

.footer-social-link.linkedin {
    height: 26px;
    left: 3px;
    top: 11px;
    width: 26px;
}

.footer-social-link {
    display: block;
    padding: 10px;
    position: absolute;
}

.hidden-link-text {
    position: absolute;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    top: 50%;
}

.footer-social-icon-svg {
    display: block;
}

.footer-social-icon-path {
    fill: white;
    transition: fill .2s;
}

.footer-social-link.twitter {
    height: 28px;
    left: 62px;
    top: 3px;
    width: 28px;
}

.footer-social-link.youtube {
    height: 24px;
    left: 123px;
    top: 12px;
    width: 24px;
}

.footer-social-link.github {
    height: 34px;
    left: 172px;
    top: 7px;
    width: 34px;
}

.footer-copyright {
    background-color: #027b9a;
    color: #fff;
    padding: 15px 30px;
  text-align: center;
}

.footer-copyright-wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
}

.footer-copyright-text {
  color: #fff;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
}

.footer-copyright-link {
    color: #fff;
    text-decoration: none;
}







/* Media Query For different screens */
@media (min-width:320px) and (max-width:479px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    padding: 40px 15px 100px;
    position: relative;

    display: block;
    /* background-color: red; */
    text-align: lefts;
    
  }

  .footer-menu{
    margin-bottom: 75px;
    /* color: red; */
  }

  .topnav a:first-child {
    margin-right:10px;
  }
}

@media (min-width:480px) and (max-width:599px)  { /* smartphones, Android phones, landscape iPhone */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    padding: 40px 15px 1050px;
    position: relative;
  }

  .topnav a:first-child {
    margin-right:10px;
  }
}

@media (min-width:600px) and (max-width: 800px)  { /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    padding: 40px 15px 1050px;
    position: relative;
  }
  
  .topnav a:first-child {
    margin-right:10px;
  }
}

@media (min-width:801px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */

}

@media (max-width:820px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */
  
}
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */

}

@media (min-width:1281px) { /* hi-res laptops and desktops */

}




@media (min-width: 760px) {
  .footer-content {
      margin-left: auto;
      margin-right: auto;
      max-width: 800px;
      padding: 40px 15px 150px;
      position: relative;
  }

  .footer-wave-svg {
      height: 50px;
  }

  .footer-content-column {
      /* width: 24.99%; */
  }
}
@media (min-width: 568px) {
  /* .footer-content-column {
      width: 49.99%;
  } */
}

/* --------
------------------------------------------------------- */

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: 0; */
  /* height: 667px; */
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  
  width: 75%;
  max-width: 400px;
  background-color: #f2f2f2;
  border-radius: 16px;
  
  padding: 25px;
}

.modal h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}
 
.modal p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.modal strong{
  content:"handsome";
  white-space: pre;
}

.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: .4s;
}
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.modal  .create {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal  .join {
  width: 100%;
  background-color: #6495ed;
  color: white;
  padding: 14px 20px;
  margin: 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal  .cancel {
  width: 100%;
  background-color: firebrick;
  color: white;
  padding: 14px 20px;
  margin: 20px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}



/* -------------- */
.maintenance {
  margin: 40vh auto;
  text-align: center;
  width: 100vw;

  /* height: 80vh; */
  /* background-color: red; */
}

.maintenance strong{
  margin: auto auto;
  text-align: center;
  font-size: 2em;
}






</style>
