<template>
  <div class="content">
    <h1>京都上賀茂教会へのアクセス</h1>
    <div class="grid-container">
      <img src="../../public/img/drawing.jpg" alt="" >
      <img src="../../public/img/map.jpg" alt="">
    </div>
    <br><br>

    <div style="text-align: center">    
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.907687671745!2d135.75486057671435!3d35.05904697279453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6001a7fb4fe056a7%3A0xdd9dcadad2c9adb3!2z5pel5pys5Z-6552j5pWZ5ZujIOS6rOmDveS4iuizgOiMguaVmeS8mg!5e0!3m2!1sja!2sjp!4v1724867038170!5m2!1sja!2sjp" width="600" height="450" style="border:0; max-width: 95vw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div> 
    
  </div>

</template>

<script>
export default{

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
  width: 100%;
  max-width: 600px;
  height: auto;
  text-align: center;
  margin: 50px auto;
  display: block;
}

.grid-container{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  justify-content: space-between;
  gap: 15px;
}
@media (min-width:320px) and (max-width:800px)  { /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  .grid-container{
    width: 100%;
    display: block;
  }
  img{
    width: 100%;
    max-width: 900px;
    height: auto;
    text-align: center;
    margin: 50px auto;
    display: block;
  }
    


  


  }
</style>