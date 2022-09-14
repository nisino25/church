<template>
  <h1 style="margin:100px auto;">schedule</h1> 
  <div>
<div>
  <div>
    <br>
    <!-- <div style="margin-top:-15px; margin-bottom:-10px">
      <input type="num" v-model="selectingYear" style="width: 10%;"> year
      &nbsp;
      <input type="num" v-model="showingMonthlyCount" style="width: 10%;"> month
      <button @click="setCalendar()">Update</button>

    </div> -->

    <div class="calendar-container">
                
          
                <header @touchstart="tStart($event)" @touchend="tEnd($event)" >
          
                  <div class="month">{{showingMonth}}</div>
                  <div class="year" style="marginTop:10px">{{showingYear}}</div>
          
                </header>
    

      <table class="calendar">
            
            <thead>
    
              <tr>

                <template v-for="(day,i) in weekday" :key="i">
                  <td>{{day}}</td>
                </template>
    
                <!-- <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td> -->
    
              </tr>
    
            </thead>
    
            <tbody>
    
              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i">
                  <td v-if="i<7 " :class="[day > 15 ? 'prev-month' : '' ]" class="circle" >{{day}}</td>

                  <!-- <td v-if="i<7 && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
                  :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day}}</td> -->

                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >

                  <td v-if="(i >6 &&i<14)"  class="circle">{{day}}</td>
                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >13 &&i<21)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle">{{day}}</td>
                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >20 &&i<28)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle">{{day}}</td>
                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >27 &&i<35)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle">{{day}}</td>
                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >34 &&i<42)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle">{{day}}</td>
                </template>
              </tr>

              <tr>
                <template v-for="(day, i) in showingCallendar" :key="i" >
                  <td v-if="(i >41 &&i<49)" :class="[day < 10 ? 'prev-month' : '' ]"  class="circle">{{day}}</td>
                </template>
              </tr>
    
            </tbody>
    
      </table>

    </div>

    
    
     <!-- end calendar-container -->

  </div> <!-- end container -->

  <!-- <Calendar title-position="left" />
  <DatePicker title-position="left" v-model="date"  /> -->

  <!-- <div>
    <h1>Calendar</h1>
    
    <div class="month">      
      <ul>
        <li class="prev">&#10094;</li>
        <li class="next">&#10095;</li>
        <li>
          {{showingCal.month}}<br>
          <span style="font-size:18px">{{showingCal.year}}</span>
        </li>
      </ul>
    </div>

    <ul class="weekdays">
      <li>Mo</li>
      <li>Tu</li>
      <li>We</li>
      <li>Th</li>
      <li>Fr</li>
      <li>Sa</li>
      <li>Su</li>
    </ul>

    <ul class="days">  
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li><span class="active">10</span></li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>  -->

  
  

  <!-- <div>
    <h5>{{showingCal}}</h5>
  </div> -->

</div>
</div>
</template>

<script>
  const weekday = ["月","火","水","木","金","土","日",]
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

      getPreviousDay(date = new Date(), howMany) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        // previous.setDate(date.getDate() - 2);

        console.log(howMany)
        console.log(previous)

        // console.log(String(previous.getDate()).padStart(2, '0')) 

        

        // let count = 0 
        // this.dayOfTheWeek = 

        // console.log(date.getFullYear())

        const d = new Date(`${date.getMonth()+ 1} 1, ${date.getFullYear()} `);
        console.log(d)
        this.dayOfTheWeek = d.getDay()

        console.log(`day of the week ${this.dayOfTheWeek}`)

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
          console.log('herr tight?')
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
      }


    },

    mounted(){
      console.clear()
      this.settingUp()



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

      console.log(dayOfTheWeek)

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

      console.log(this.showingCallendar)
    }

  }
</script>

<style>

table {
  border-collapse: collapse;
  border-spacing: 0;
}
 
td {
  padding: 0;
  /* color: red  */
}

.calendar-container {
   /* position: relative;   */
  margin-top: 20px;
  width: 650px; 
  /* width: 100%;   */
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* left:50%; */
  /* background-color: yellow; */
}
 
.calendar-container header {
  border-radius: 1em 1em 0 0;
  background: #e66b6b;
  color: #fff;
  padding: 2em 2em;
  /* height: 20%; */
  /* width: 80%; */
}
 
.month {
  /* width: 50%; */
  font-size: 4em;
  font-weight: 900; 
  line-height: 1em;
  text-align: left;
  margin-left: -10px;
}
 
.year {
  font-size: 2em;
  line-height: 1em;
  text-transform: lowercase;
  text-align: left;
  /* margin-left: 10px; */
}
  .calendar {
    background: #fff;
    border-radius: 0 0 1em 1em;
    -webkit-box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px #fff;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2), 0 3px 1px #fff;
    color: #555;
    display: inline-block;
    /* padding: 2em; */
    width: 100%;
    /* padding-bottom: 100px; */
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    margin: 0 auto;
  }
  
  .calendar thead {
    color: #e66b6b;
    font-weight: 700;
    text-transform: uppercase;
    /* margin-top: 100px; */
    padding-top: 100px;
  }
  
  .calendar td {
    padding: 0.5em 1em; 
    padding: 5px 5px; 
    margin-right: 100px; 
    text-align: center;
    /* width:100%; */
  
  }
  .circle{
      /* border-radius: 50%;
      width: auto;
      height: auto; 
      background-color: yellow; */
  }
  
  .current-day {
    color: #e66b6b;
  }
  
  .prev-month,
  .next-month {
    color: #b8aeae;
  }
  


</style>