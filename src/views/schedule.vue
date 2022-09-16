<template>
  
  <div>
    <div class="bigger-container" v-if="eventList">

      <div class="weekly-calendar" >
        <div>
          <header>
            <div style="text-align:center">
              <span>{{currentYear}}年{{currentMonth}}月の予定</span>
              <!-- <div class="year" style="">{{currentYear}}</div> -->
            </div>
          </header>

          <div class="weekly-contents">
            <template v-for="(event, i) in events" :key="i">
              <div class="calendar_plan">
                <div class="cl_plan">
                  <div class="cl_title">{{event.month}} / {{event.date}} ({{event.day}}) :  {{event.from}} 〜 &nbsp; @{{event.location}}</div>
                  <div class="cl_copy" v-if="event.title == '主日礼拝'">
                    <strong :style="[vw > 800 ? 'font-size: 125%' : '']">{{event.title}}  </strong> 
                    <!-- <br v-if="vw < 600"> -->
                    <span :style="[vw < 800 ? 'margin-left: 25px' : '']">説教者: {{event.priest}}</span>  </div>
                  <div class="cl_copy" v-else>{{event.title}}</div>
                </div>
              </div>
              
            </template>
          </div>


        </div>
      </div>
      
      <div class="calendar-container" style="display:none">
                  
            
        <header>
          <div>
            <div class="month">{{currentMonth}}</div>
            <div class="year" style="">{{currentYear}}</div>
          </div>
  
  
        </header>
      
  
        <table class="calendar">
          
            <thead>
              <tr>
                <template v-for="(day,i) in weekday" :key="i">
                  <td>{{day}}</td>
                </template>
              </tr>
            </thead>
    
            <tbody>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i">
                  <td v-if="i<7 " :class="[day > 15 ? 'prev-month' : '' ]" class="circle" :style="isToday(day)">{{day}} <br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >6 &&i<14)"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >13 &&i<21)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >20 &&i<28)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)" >{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span> </td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >27 &&i<35)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >34 &&i<42)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCalendar" :key="i" >
                  <td v-if="(i >41 &&i<49)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
            </tbody>
  
  
              
      
        </table>

        <template v-for="(day, i) in showingCalendar" :key="i">
          <span>{{day}},</span>
          <br v-if="day % 5  == 0">
        </template>

        <!-- <span>{{eventList}}</span> -->
  
      </div>

      <div id="calendar">

        <div id="calendar_header" style="background-color: rgb(46, 204, 113); height: 68.5714px;">

          <i class="icon-chevron-left" >&#8592;</i>          
          <h1>{{currentYear}}年{{currentMonth}}月</h1>
          <i class="icon-chevron-right">&#8594;</i> 

        </div>

        <div id="calendar_weekdays">
          <template v-for="(day, i) in weekdays" :key="i" style="color: rgb(46, 204, 113);">
            <div>
              {{day}}
            </div>
          </template>
        </div>

        <div id="calendar_content">
          <template v-for="(date, i) in previous" :key="i" >
            <div class="blank"><span v-if="date==10000">date</span></div>
          </template>

          <template v-for="(date, i) in showingCalendar" :key="i" >

            <div >{{date}}</div>

          </template>

          <template v-for="(date, i) in next" :key="i" >
            <div class="blank" ></div>
          </template>
        </div>

      </div>
      message: {{message}} <br>

      {{firstDayOfTheWeek}} <br>
      {{lastDayOfTheWeekm}}

      
  
    </div>
  </div>
  
</template>
  
<script>
  const weekdays = ["月","火","水","木","金","土","日",]
  import db from '../../firebase.js';
  export default{
    data() {
      return {
        currentDay: undefined,
        currentDate: undefined,
        currentMonth: undefined,
        currentYear: undefined,

        dayOfTheWeek: undefined,

        showingCalendar: undefined,
        previous: [],
        next: [],

        firstDayOfTheWeek: undefined,
        lastDayOfTheWeek: undefined,
        message: undefined,

        query: undefined,

        weekdays,

        events: undefined,

        vw: undefined,
      }
    },

    methods:{

      settingUp(){
        var today = new Date();

        // this.currentDate = String(today.getDate()).padStart(2, '0');
        this.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); 
        this.currentYear = today.getFullYear();

        

        this.getCurrentCalendar(this.currentYear,this.currentMonth)


        let limit =  this.daysInMonth(this.currentMonth,this.currentYear)

        // put the days from previous month 
        let d = new Date(`${this.currentYear}-${this.currentMonth}-1,00:00:00 `);
        let day = d.getDay();
        this.firstDayOfTheWeek = d

        let count = 0

        if(day == 6){
          this.previous = []
        }else{
          day-- 
          while(count < day){
            this.previous.push(count)
            count++ 
          }
        }
        
        // adding the data for the next month

        d = new Date(`${this.currentYear}-${this.currentMonth}-${limit},00:00:00 `);
        day = d.getDay();
        this.lastDayOfTheWeek = d.getDay()

        count = 0

        if(day == 0){
          this.next = []
        }else{
          day = 7-day
          while(count < day){
            this.next.push(count)
            count++ 
          }
        }

        // put the days from current month
        limit =  this.daysInMonth(this.currentMonth,this.currentYear)
        count =  1

        while(count < limit+ 1){
          this.showingCalendar.push(count)
          count++ 
        }

        


        
        // this.currentDate =



        // console.log(`${this.currentYear}, ${this.currentMonth}, ${this.currentDate}`)
      },

      getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        // previous.setDate(date.getDate() - 2);

        // console.log(String(previous.getDate()).padStart(2, '0')) 

        

        // let count = 0 
        // this.dayOfTheWeek = 

        // console.log(date.getFullYear())

        const d = new Date(`${date.getMonth()+ 1} 1, ${date.getFullYear()} `);
        this.dayOfTheWeek = d.getDay()


        if(this.dayOfTheWeek == 1){
          return 
        }

        let count = 1
        let theDay = undefined
        let limit = undefined
        let lastDay = undefined

        if(this.dayOfTheWeek == 0){
          count = 1
          limit = 6

          lastDay - previous.setDate(date.getDate() - 1);
          theDay = String(previous.getDate()).padStart(2, '0')
          theDay = parseInt(theDay)
      
          while(count <limit){
            theDay--
            this.showingCalendar.unshift(theDay)
            count++ 
          }

          return 
        }

        if(this.dayOfTheWeek !== 0 ){
          count = 1
          limit = this.dayOfTheWeek 
          
          lastDay - previous.setDate(date.getDate() - 1);
          theDay = String(previous.getDate()).padStart(2, '0')
          theDay = parseInt(theDay)
          // console.log(this.showingCalendar)

          while(count < limit){

            

            this.showingCalendar.unshift(theDay)
            
            // console.log(this.showingCalendar)


            count++ 
            theDay--
          }

          // console.log('------------')
        }
        
      
      },

      getCurrentCalendar(year, month){
        this.showingCalendar =[]
        console.log(year + month)
      },
      
      daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
      },

      isToday(day){
        var today = new Date();

        let month = undefined
        month = String(today.getMonth() + 1).padStart(2, '0')
        // month = parseInt(month)


        if(this.currentYear !== today.getFullYear()) return

        
        if(this.currentMonth !== month) return 

        if(today.getDate() !== day) return

        return `color: red`
      },

      getEvents(){
        var docRef = db.collection('events').doc(`2022`);
        
        docRef.get().then((doc) => {
            if (doc.exists) {
              this.events =doc.data()[parseInt(this.currentMonth)]
              // console.log(this.events)
              // this.historyArticles = JSON.parse(doc.data().data)
              // this.getViews()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      },

      eventExist(date){
        // gotta check for if it is currentmonth or not
        // console.log(date)
        let flag = false
        date = parseInt(date)
        for(let i in this.events){
          flag= false
          // console.log(this.events[i])
          // console.log(`data: ${i}`)
          // console.log(this.events[i].date)
          
          if(this.events[i].date !== date) return
          flag = true 
          console.log(date)
          return flag
        }

        return flag
      },

      test(){
        const ref = db.collection('events')
        ref.doc(`2022`).update({
          10: [
            {year: 2022, month: 9, date: 4, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '西村さん', after: '', from: '10:30', location: '京都上賀茂教会'  },

            {year: 2022, month: 9, date: 11, day: '日', title:'主日礼拝', priest: '栗津原牧師', musician: '南大路さん', after: '月齢ミーティングあり', from: '10:30', location: '京都上賀茂教会' },

            {year: 2022, month: 9, date: 18, day: '日', title:'主日礼拝', priest: '浜本牧師', musician: '南大路さん', after: '', from: '10:30', location: '京都上賀茂教会' },

            {year: 2022, month: 9, date: 25, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
          ],

        })
      }


      
        
        
      


    },

    mounted(){
      console.clear()
      this.settingUp()

      // first get month and year from the url links
      // add only the dates from the current month
      // thats it
      

      // var today = new Date();
      // console.log(`todaay is: ` + today.getDate())





      
      // this.query = `2022-${this.currentMonth}-01
      

      // this.getPreviousDay(new Date(`2022-${this.currentMonth}-01`))

      
      

      



      





      // this.getPreviousDay(new Date(`2022-01-01`))

      console.log(this.showingCalendar)


      this.getEvents()
    },

    computed:{
      eventList(){
        if(!this.events) return
        let list = []

        for(let i in this.events){
          list.push(this.events[i].date)
        }

        return list
      },

    },

    created(){
      this.vw = document.documentElement.clientWidth 
    },
  }
</script>
  
<style>
  body{
    background-color: lightgrey;
  }

  .bigger-container{
    margin-top: 75px;
    /* display: flex; */
    width: 100vw;
    /* background-color: green; */

  }

  .bigger-container div{
    /* width: 50%; */

    /* padding: 15px 50px; */
  }

  

  /* table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
 

  .calendar-container {
    width: 340px; 
    display: block;
    
    margin-left: auto;
    margin-right: auto;

  }
  
  .calendar-container header {
    border-radius: 1em 1em 0 0;
    background: #e66b6b;
    color: #fff;
    padding: 20px 10px;
    
  }

  .calendar-container header div{
    display: flex;
    width: 100%;
    margin-right:  auto;
    margin-left:  auto;
    
  }

  .calendar-container header div div{
    width: 50%;
    text-align: center;
    margin-left: 25px;
  }
    
  
  .calendar-container .month {
    font-size: 75px;
    font-weight: 900; 
    line-height: 1em;
  }
  
  .year {
    font-size: 40px;
    line-height: 1em;
    text-transform: lowercase;
    margin-top:27.5px;
  }


  .calendar {
    background: #fff;
    border-radius: 0 0 1em 1em;
    -webkit-box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px lightgrey;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px lightgray;
    color: #555;
    display: inline-block;
    width: 340px;
    padding: 10px 5px;
  }

  .caalendar tbody{
    width: 95%;
  }
  
  .calendar thead {
    color: #e66b6b;
    font-weight: 700;
    text-transform: uppercase;
    padding-top: 100px;

  }

  .calendar tr{
    display:block;
    margin-right: 20px;
    margin-left: 20px; 
  }
  
  .calendar td {
    padding: 3px 2px; 
    text-align: center;
    font-size: 18.5px;
    width:75px;
  
  }
  
  
  .current-day {
    color: #e66b6b;
  }
  
  .prev-month,
  .next-month {
    color: #b8aeae;
  } */

  /* ------------------------------------------------- */
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
    /* background-color: green; */
  }

  
  .weekly-calendar header {
    border-radius: 1em 1em 0 0;
    background: SteelBlue;
    color: #fff;
    padding: 1em 1em;
    
    /* height: 20%; */
    width: 100%;
    /* display: flex; 
    */
    /* margin  */
    /* font-size: 10px; */
  }


  .weekly-calendar header span{
    font-size: 50px;
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

  @media (min-width:320px) and (max-width:800px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
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

  /* ---------------------------------------------------------------- */

  #calendar{
    margin-left: auto;
    margin-right: auto;
    width: 550px;
    font-family: 'Lato', sans-serif;

    margin-top: 100px;
    margin-bottom: 800px;
    display: block;
  }
  #calendar_weekdays div{
    display:inline-block;
    vertical-align:top;
    color: rgb(46, 204, 113);
      /* width: 68.5714px; height: 68.5714px; line-height: 68.5714px; */
  }
  #calendar_content, #calendar_weekdays, #calendar_header{
    position: relative;
    width: 100%;
    overflow: hidden;
    float: left;
    z-index: 10;
  }
  #calendar_weekdays div, #calendar_content div{
    width: calc(100% / 7);
    height: calc(550px / 7); 
    line-height: calc(550px / 7); 
    /* height: calc(335px / 7); */
    /* line-height: calc(335px / 7); */
    overflow: hidden;
    text-align: center;
    background-color: #FFFFFF;
    /* color: rgb(46, 204, 113); */
    font-size: 20px;
  }

  #calendar_content{
    -webkit-border-radius: 0px 0px 12px 12px;
    -moz-border-radius: 0px 0px 12px 12px; 
    border-radius: 0px 0px 12px 12px;
  }
  #calendar_content div{
    float: left;
    width:  calc(100% / 7); 
    height: calc(550px / 7); 
    line-height:  calc(550px / 7);
    font-size: 30px;
  }
  #calendar_content div:hover{
    background-color: #F8F8F8;
  }
  #calendar_content div.blank{
    background-color: #E8E8E8;
  }
  #calendar_header, #calendar_content div.today{
    zoom: 1;
    filter: alpha(opacity=70);
    opacity: 0.7;
  }
  #calendar_content div.today{
    color: #FFFFFF;
  }
  #calendar_header{
    width: 100%;
    /* height: 37px; */
    text-align: center;
    background-color: #FF6860;
    padding: 18px 0;
    -webkit-border-radius: 12px 12px 0px 0px;
    -moz-border-radius: 12px 12px 0px 0px; 
    border-radius: 12px 12px 0px 0px;
  }
  #calendar_header h1{
    font-size: 1.5em;
    color: #FFFFFF;
    float:left;
    width:60%;
    
  }
  i[class^=icon-chevron]{
    color: #FFFFFF;
    float: left;
    width:20%;
    border-radius: 50%;
    margin-top: 6px;
  }

  @media (min-width:320px) and (max-width:800px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
    #calendar{
    margin-left: auto;
    margin-right: auto;
    width: 340px;
    font-family: 'Lato', sans-serif;

    margin-top: 100px;
    margin-bottom:800px;
    display: block;
  }
    


  


  }

  


</style>