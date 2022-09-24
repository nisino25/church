<template>
  <div class="content">
    <h1>京都上賀茂教会へのアクセス</h1>
    <img src="../../public/img/drawing.jpg" alt="" >
    <img src="../../public/img/map.jpg" alt="">
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
export default{
  components: { 
    GoogleMap, 
    Marker,
  },

  data(){
    return{
    }
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
  margin: 150px auto;
}

h1{
  width: 100%;
  margin: 50px auto;
  text-align: center;
}
img{
  width: 600px;
  height: auto;
  text-align: center;
  margin: 50px auto;
  display: block;
}

@media (min-width:320px) and (max-width:800px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  img{
    width: 90vw;
    height: auto;
    text-align: center;
    margin: 50px auto;
    display: block;
  }
    


  


  }
</style>