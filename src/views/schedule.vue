<template>
  
  <div>
    <div class="bigger-container" v-if="eventList">
      <div class="weekly-calendar">
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
                  <div class="cl_title">{{event.month}}/{{event.date}} ({{event.day}}) :  {{event.from}} 〜 &nbsp; @{{event.location}}</div>
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
      
      <div class="calendar-container" >
                  
            
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
                <template v-for="(day, i) in showingCallendar" :key="i">
                  <td v-if="i<7 " :class="[day > 15 ? 'prev-month' : '' ]" class="circle" :style="isToday(day)">{{day}} <br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >6 &&i<14)"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >13 &&i<21)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >20 &&i<28)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)" >{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span> </td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >27 &&i<35)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >34 &&i<42)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >41 &&i<49)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle" :style="isToday(day)">{{day}}<br><span :style="[eventList.includes(day) ? 'color: blcak' : 'color: white']"> &#8226;</span></td>
                </template>
              </tr>
    
            </tbody>
  
  
              
      
        </table>

        <template v-for="(day, i) in showingCallendar" :key="i">
          <span>{{day}},</span>
          <br v-if="day % 5  == 0">
        </template>

        <!-- <span>{{eventList}}</span> -->
  
      </div>

      
  
    </div>
  </div>
  
</template>
  
<script>
  const weekday = ["月","火","水","木","金","土","日",]
  import db from '../../firebase.js';
  export default{
    data() {
      return {
        currentDay: undefined,
        currentDate: undefined,
        currentMonth: undefined,
        currentYear: undefined,

        dayOfTheWeek: undefined,

        showingCallendar: undefined,

        query: undefined,

        weekday,

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
            this.showingCallendar.unshift(theDay)
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
          // console.log(this.showingCallendar)

          while(count < limit){

            

            this.showingCallendar.unshift(theDay)
            
            // console.log(this.showingCallendar)


            count++ 
            theDay--
          }

          // console.log('------------')
        }
        
      
      },

      getCurrentCalendar(year, month){
        this.showingCallendar =[]
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

      // var today = new Date();
      // console.log(`todaay is: ` + today.getDate())





      // put the days from previous month 
      this.query = `2022-${this.currentMonth}-01`

      this.getPreviousDay(new Date(`2022-${this.currentMonth}-01`))

      // put the days from current month
      let limit =  this.daysInMonth(this.currentMonth,this.currentYear)
      let count =  1

      while(count < limit+ 1){
        this.showingCallendar.push(count)
        count++ 
      }

      // put the days from next month
      // console.log(limit)

      const d = new Date(`${this.currentMonth} ${limit}, ${this.currentYear} `);
      let dayOfTheWeek = d.getDay()

      // console.log(dayOfTheWeek)

      if(dayOfTheWeek ==0){
        return 
      }

      if(this,dayOfTheWeek !== 0){
        count = 1
        limit = 8 - dayOfTheWeek

        while(count <limit){
          this.showingCallendar.push(count)
          count++
        }
      }





      // this.getPreviousDay(new Date(`2022-01-01`))

      // console.log(this.showingCallendar)

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

  

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
 

  .calendar-container {
    width: 340px; 
    display: block;
    
    margin-left: auto;
    margin-right: auto;

    /* transform: scale(1.2); */
  }
  
  .calendar-container header {
    border-radius: 1em 1em 0 0;
    background: #e66b6b;
    color: #fff;
    padding: 20px 10px;
    
    /* height: 20%; */
    /* width: 100%; */
    /* display: flex; */
    /* margin  */
  }

  .calendar-container header div{
    display: flex;
    width: 100%;
    margin-right:  auto;
    margin-left:  auto;
    /* text-align: center; */
    
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
    /* text-align: center; */
    /* margin-left: -10px; */
    /* margin-right: 20px; */
  }
  
  .year {
    font-size: 40px;
    line-height: 1em;
    text-transform: lowercase;
    /* text-align: center; */
    margin-top:27.5px;
    /* float: right; */
    /* display: inline-block; */
  }


  .calendar {
    background: #fff;
    border-radius: 0 0 1em 1em;
    -webkit-box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px lightgrey;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px lightgray;
    color: #555;
    display: inline-block;
    /* padding: 2em; */
    width: 340px;
    /* padding: 5px; */
    padding: 10px 5px;
  }

  .caalendar tbody{
    width: 95%;
  }
  
  .calendar thead {
    color: #e66b6b;
    font-weight: 700;
    text-transform: uppercase;
    /* margin-top: 100px; */
    padding-top: 100px;

    /* width: 100%; */
  }

  .calendar tr{
    display:block;
    /* padding-right: 30px;
    padding-left: 30px; */

    /* width: 300px; */
    /* max-width: 300px; */
    /* min-width: 300px; */
    /* background-color: blue; */
    margin-right: 20px;
    margin-left: 20px; 
  }
  
  .calendar td {
    /* padding: 10px 1em;  */
    padding: 3px 2px; 
    /* margin-right: 100px;  */
    text-align: center;
    /* font-size: 5px; */
    font-size: 18.5px;
    width:75px;
  
  }
  
  
  .current-day {
    color: #e66b6b;
  }
  
  .prev-month,
  .next-month {
    color: #b8aeae;
  }

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
      font-size: 15.5px;
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


  


</style>