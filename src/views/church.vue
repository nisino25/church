<template>
  <div class="content">
    <h1>京都上賀茂教会について</h1><hr>

    <strong>牧師</strong><br> <br> 
    
    <div>
      <span>主任牧師: &nbsp;生田 香緒里</span><br> 
      <span>牧師: &nbsp;&nbsp; 粟津原 淳</span><br> 
      <span>牧師: &nbsp; &nbsp;張 悦子（間之町伝道所）</span><br> 
      <span>牧師: &nbsp; &nbsp;浜本 京子 (在米国ハワイ)</span>
    </div>
    <br>

    <img src="../../public/img/drawing.jpg" alt="" class="churchPic">
    <img src="../../public/img/map.jpg" alt="" class="mapPic">
    <br><br>

    <div class="" style="width: 80%; margin: auto auto">    
      <GoogleMap api-key="AIzaSyDypz7XN6k4Q1gEj6mKRt65nAbpOelob8o" style="width: 100%; height: 500px" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </div> 

    


    
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map"; 

export default {
  components: { 
    GoogleMap, 
    Marker,
  },

  setup() {
    const center = { lat: 35.05922090366774,  lng: 135.7575056779574, };
    const markerOptions = { position: center, label: "京都上賀茂教会", title: "京都上賀茂教会" };

    

    return { center, markerOptions };
  },
}
</script>

<style>
  .content{
    /* margin-top: 1000px; */
    width: 70%;
    margin: 200px auto;
    text-align: center;
    font-size: 150%;
    
    /* background-color: aqua; */
    
  }
  .content h1{
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .content strong{
    width: 50%;
    margin: 0 auto;
    
    /* color: */
  }

  .churchPic{
    margin-top: 50px;
    width: 45%;
    height: auto;
    margin-right: 20px;
    /* text-align: left; */
    /* text-align: left; */
  }
  
  .mapPic{
    margin-top: 50px;
    width: 45%;
    height: auto;
  }


</style>