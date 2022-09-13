<template>
  schedule
  <div>
<div>
  <div>
    <br>
    <div style="margin-top:-15px; margin-bottom:-10px">
      <input type="num" v-model="selectingYear" style="width: 10%;"> year
      &nbsp;
      <input type="num" v-model="showingMonthlyCount" style="width: 10%;"> month
      <button @click="setCalendar()">Update</button>

    </div>
    

    <div class="calendar-container">
      

      <header @touchstart="tStart($event)" @touchend="tEnd($event)" >

        <div class="month">{{showingMonth}}</div>
        <div class="year" style="marginTop:10px">{{showingYear}}</div>

      </header>

      <table class="calendar">

        <thead>

          <tr>

            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Sun</td>

          </tr>

        </thead>

        <tbody>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i">
              <td v-if="i<7 && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="i<7 && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >

              <td v-if="(i >6 &&i<14) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i >6 &&i<14) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >

              <td v-if="(i >13 &&i<21) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i > 13&&i<21) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >
              <td v-if="(i >20 &&i<28) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i >20 &&i<28) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >
              <td v-if="(i >27 &&i<35) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i >27 &&i<35) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >
              <td v-if="(i >34 &&i<42) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i >34 &&i<42) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

          <tr>
            <template v-for="(day, i) in showingCal" :key="i" >

              <td v-if="(i > 41&&i<49) && (!dataList[showingYear][showingMonthlyCount][day.date] || day.additional) " :class="[day.additional ? 'prev-month' : '' ]"
              class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>

              <td v-if="(i > 41&&i<49) && dataList[showingYear][showingMonthlyCount][day.date] && !day.additional" :class="[day.additional ? 'prev-month' : '' ]"
              :style="{backgroundColor: moodStyle[dataList[showingYear][showingMonthlyCount][day.date].mood], color: textColor[dataList[showingYear][showingMonthlyCount][day.date].mood]}" class="circle" @click="edit(showingYear,showingMonthlyCount,day.date,day.yoobi,day.additional)">{{day.date}}</td>
            </template>
          </tr>

        </tbody>

      </table>
      <!-- <span>{{moodStyle[dataList[showingYear][showingMonthlyCount][3].mood]}}</span> -->

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
  // const weekday = ["日","月","火","水","木","金","土"]
  export default{
    data() {
      return {
        currentDay: undefined,
        currentDate: undefined,
        currentMonth: undefined,
        currentYear: undefined,

        dayOfTheWeek: undefined,

        showingCallendar: undefined,
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

        console.log(howMany)
        console.log(previous)

        console.log(String(previous.getDate()).padStart(2, '0'))

        

        // let count = 0 
        // this.dayOfTheWeek = 

        const d = new Date(`${this.currentMonth} 1, ${this.currentYear} `);
        this.dayOfTheWeek = d.getDay()
        
      
      },

      getCurrentCalendar(year, month){
        this.showingCallendar =[],

        console.log(year + month)
      },
    },

    mounted(){
      console.clear()
      this.settingUp()

      this.getPreviousDay(new Date(`2022-${this.currentMonth}-01`))
    }

  }
</script>