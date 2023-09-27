<template>
  
  <div>
    <div class="bigger-container" v-if="events">

      <div class="weekly-calendar" >
        <div>
          <header>
            <div style="text-align:center">
              <i class="icon-chevron-left" @click="toPreviousMonth() ">&#8592;</i>  
              <h1>{{showingYear}}年{{showingMonth}}月の予定</h1>
              <i class="icon-chevron-right" @click="toNextMonth()">&#8594;</i> 
              <!-- <div class="year" style="">{{showingYear}}</div> -->
            </div>
          </header>

          <div class="weekly-contents" v-if="this.events?.length > 0">
            <template v-for="(event, i) in events" :key="i">
              <div class="calendar_plan">
                <div class="cl_plan">
                  <div class="cl_title">{{event.month}} / {{event.date}} ({{event.day}}) 
                    <template v-if="event.from !== ''">:  {{event.from}} 〜 &nbsp; @{{event.location}}
                    </template>
                  </div> 
                  <div class="cl_copy" v-if="event.title == '主日礼拝'">
                    <strong :style="[vw > 800 ? 'font-size: 125%' : '']">{{event.title}}  </strong> 
                    <!-- <br v-if="vw < 600"> -->
                    <span :style="[vw < 800 ? 'margin-left: 25px' : '']">説教者: {{event.priest}}</span>  
                  </div>
                  <div class="cl_copy" v-else>{{event.title}}</div>
                  <div class="cl_copy" v-if="event.description">
                    <span :style="[vw < 800 ? 'margin-left: 25px' : '']">{{event.description}}</span>  
                  </div>
                    
                </div>
              </div>
              
            </template>
          </div>
          <div class="weekly-contents" v-else>
            <div class="calendar_plan">
                <div class="cl_plan">現在この月の予定はありません。
                  <div class="cl_title"></div>
                  
                </div>
              </div>
            
          </div>
        </div>
      </div>
      <div id="calendar">
        <div id="calendar_header" style="background-color: rgb(46, 204, 113); height: 68.5714px;">

          <i class="icon-chevron-left" @click="toPreviousMonth() ">&#8592;</i>          
          <h1>{{showingYear}}年{{showingMonth}}月</h1>
          <i class="icon-chevron-right" @click="toNextMonth()">&#8594;</i> 

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

            <div :style="getStyle(date)">{{date}}</div>

          </template>

          <template v-for="(date, i) in next" :key="i" >
            <div class="blank" ></div>
          </template>
        </div>

      </div>
      <!-- changed: {{message}} <br>
      {{firstDayOfTheWeek}} <br>
      {{lastDayOfTheWeekm}} -->

  
    </div>

    <div v-else class="loader"></div>

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
        showingMonth: undefined,
        showingYear: undefined,
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
        this.currentDate = today.getDate()
        this.showingMonth = String(today.getMonth() + 1).padStart(2, '0'); 
        this.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); 
        this.showingYear = today.getFullYear();
        this.currentYear = today.getFullYear();
        
        this.getCurrentCalendar(this.showingYear,this.showingMonth)
        let limit =  this.daysInMonth(this.showingMonth,this.showingYear)
        // put the days from previous month 
        let d = new Date(`${this.showingYear}/${this.showingMonth}/1`);
        let day = d.getDay();
        this.firstDayOfTheWeek = d
        let count = 0
        if(day == 1){
          this.previous = []
        }else{
          day-- 
          while(count < day){
            this.previous.push(count)
            count++ 
          }
        }
        
        // adding the data for the next month
        d = new Date(`${this.showingYear}/${this.showingMonth}/${limit}`);
        day = d.getDay();
        this.lastDayOfTheWeek = d
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
        limit =  this.daysInMonth(this.showingMonth,this.showingYear)
        count =  1
        while(count < limit+ 1){
          this.showingCalendar.push(count)
          count++ 
        }
        
        
        // this.currentDate =
        // console.log(`${this.showingYear}, ${this.showingMonth}, ${this.currentDate}`)
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
        if(this.showingYear !== today.getFullYear()) return
        
        if(this.showingMonth !== month) return 
        if(today.getDate() !== day) return
        return `color: red`
      },
      getEvents(){
        var docRef = db.collection('events').doc(`${this.showingYear}`);
        
        docRef.get().then((doc) => {
            if (doc.exists) {
              
              this.events =doc.data()[parseInt(this.showingMonth)]
              if(!this.events) {
                this.events= []
              }
              console.log(this.events)
              // console.log(this.events)
              // this.historyArticles = JSON.parse(doc.data().data)
              // this.getViews()
            } else {
              this.events= []
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
          
            
            // this.eventList = []
            console.log("Error getting document:", error);
            this.events= []
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
        ref.doc(`2023`).update({
          10: [
            {year: 2023, month: 10, date: 1, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            {year: 2023, month:10, date: 8, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            {year: 2023, month: 10, date: 15, day: '日', title:'主日礼拝', priest: '中島淳（元近江兄弟社中・高等学校聖書科教諭）', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            {year: 2023, month: 10, date: 22, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            {year: 2023, month: 10, date: 29, day: '日', title:'主日礼拝', priest: '粟津原牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            // {year: 2023, month: 7, date: 30, day: '日', title:'主日礼拝', priest: '生田牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            // {year: 2022, month: 11, date: 13, day: '日', title:'主日礼拝', priest: '粟津原牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            // {year: 2022, month: 11, date: 20, day: '日', title:'主日礼拝', priest: 'アジア学院キャラバン', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            // {year: 2022, month: 11, date: 27, day: '日', title:'主日礼拝', priest: '浜本牧師', musician: '', after: '', from: '10:30', location: '京都上賀茂教会' },
            ],
            // /Users/nozomuando/hobby/church/src/assets
        })
      },
      getStyle(date){
        let style =''
        for(let i in this.events){
          
          if(this.events[i].date == date){
            style = 'color: crimson; '
          }
        }
        // return flag
        
        // style = style+ 'color: crimson; '
        if((this.showingMonth == this.currentMonth) && (this.showingYear == this.currentYear)){
          if(date == this.currentDate){
            style = style +'background-color: SkyBlue; '
          } 
        } 
        return style
        
      },
      refreshCalendar(){
        this.showingCalendar = []
        this.events = undefined
        this.previous = []
        this.next = []
        let limit =  this.daysInMonth(this.showingMonth,this.showingYear)
        // put the days from previous month 
        console.log(`${this.showingYear}/${this.showingMonth}/1`);
        let d = new Date(`${this.showingYear}/${this.showingMonth}/1`);
        let day = d.getDay();
        // this.firstDayOfTheWeek = d
        console.log(day)
        let count = 0
        if(day == 1){
          this.previous = []
        }else if(day ==0){
          day = 6
          while(count < day){
            this.previous.push(count)
            count++ 
          }
        }else{
          day-- 
          while(count < day){
            this.previous.push(count)
            count++ 
          }
        }
        
        // adding the data for the next month
        d = new Date(`${this.showingYear}/${this.showingMonth}/${limit}`);
        day = d.getDay();
        this.lastDayOfTheWeek = d
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
        limit =  this.daysInMonth(this.showingMonth,this.showingYear)
        count =  1
        while(count < limit+ 1){
          this.showingCalendar.push(count)
          count++ 
        }
        this.getEvents()
      },
      toNextMonth(){
        if(this.showingMonth == 12){
          this.showingMonth = 1
          this.showingYear++
        }else{
          this.showingMonth++
        }
        this.refreshCalendar()
        
      },
      toPreviousMonth(){
        if(this.showingMonth == 1){
          this.showingMonth = 12
          this.showingYear--
        }else{
          this.showingMonth--
        }
        this.refreshCalendar()
        
      },
      
        
        
      
    },
    mounted(){
      console.clear()
      this.settingUp()
      console.log('here?')
      // this.test()
      // first get month and year from the url links
      // add only the dates from the current month
      // thats it
      
      // var today = new Date();
      // console.log(`todaay is: ` + today.getDate())
      
      // this.query = `2022-${this.showingMonth}-01
      
      // this.getPreviousDay(new Date(`2022-${this.showingMonth}-01`))
      
      
      
      
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
  
  /* .weekly-calendar header {
    border-radius: 1em 1em 0 0;
    background: SteelBlue;
    color: #fff;
    padding: 1em 1em;
    
    width: 100%;
  }
  .weekly-calendar header span{
    font-size: 50px;
  } */
  .weekly-calendar header{
    width: 100%;
    /* height: 37px; */
    text-align: center;
    background-color:SteelBlue;
    padding-top: 30px;
    padding-bottom: 50px;
    -webkit-border-radius: 12px 12px 0px 0px;
    -moz-border-radius: 12px 12px 0px 0px; 
    border-radius: 12px 12px 0px 0px;
  }
  .weekly-calendar header h1{
    font-size: 1.5em;
    color: #FFFFFF;
    float:left;
    width:60%;
    
  }
  .weekly-calendar header i[class^=icon-chevron]{
    color: #FFFFFF;
    float: left;
    width:20%;
    border-radius: 50%;
    margin-top: 6px;
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
    margin-bottom:550px;
    display: block;
  }
  #calendar_weekdays div{
    width: calc(100% / 7);
    height: calc(340px / 7); 
    line-height: calc(340px / 7); 
    /* height: calc(335px / 7); */
    /* line-height: calc(335px / 7); */
    overflow: hidden;
    text-align: center;
    background-color: #FFFFFF;
    /* color: rgb(46, 204, 113); */
    font-size: 20px;
  }
  
  #calendar_content div{
    float: left;
    width:  calc(100% / 7); 
    height: calc(340px / 7); 
    line-height:  calc(340px / 7);
    font-size: 25px;
  }
    
  
  }
  /* ------------------------------------------------------------ */
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
    fill:lightgrey;
  }
  
</style>