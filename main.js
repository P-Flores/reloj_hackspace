
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOYKqiqoGO7CGhEbnRDJcjemY3Pl8rYc0",
    authDomain: "proyecto-demo-87025.firebaseapp.com",
    databaseURL: "https://proyecto-demo-87025.firebaseio.com",
    storageBucket: "proyecto-demo-87025.appspot.com",
    messagingSenderId: "139511772847"
  };
  firebase.initializeApp(config);
  
  function getOrigin(){
    return $('#origen').val();
  }

  function getDestiny(){
    return $('#destino').val();
  }
  
  function getMessage(){
    return $('#mensaje').val();
  }

  function getHour(){
    return hh.className.slice(-1)+hx.className.slice(-1);
  }
  function getMinute(){
    return mm.className.slice(-1)+mx.className.slice(-1);
  }
  function getSecond(){
    return ss.className.slice(-1)+sx.className.slice(-1);
  }
  function storeMessage(origin,destiny,message){
    //console.log(getHour()+"-"+getMinute()+"-"+getSecond());
    //console.log(origin+"-"+destiny+"-"+message);
    firebase.database().ref(
      'reloj/'+getHour()+'/'+getMinute()+'/'+getSecond()+'/'+getOrigin()
    ).set({
      mensaje : message,
      destino : destiny
    });
  }

  $(document).ready(function(){
    $('#mensaje').on('keypress', function(e){
      //console.log(e.which);
      if (e.which==13){
        storeMessage(getOrigin(), getDestiny(), getMessage());
      }
    });
  });

var led = document.getElementById('led'),
      els = led.childNodes,
    uid=0, size=15, w=0, h=0, row=0, col=0,
    arr_lights=[];

var hh = document.getElementById('time-hh'),
      hx = document.getElementById('time-h'),
      mm = document.getElementById('time-mm'),
      mx = document.getElementById('time-m'),
      ss = document.getElementById('time-ss'),
      sx = document.getElementById('time-s');

for(var k=0, len=els.length; k<len; k++){
  if(els[k].nodeType!=1)
    continue;
    w = parseInt(els[k].clientWidth);
  h = parseInt(els[k].clientHeight);
  row   = parseInt(h/size);
    col = parseInt(w/size);

  var t, l, sum=0;
  for(var i=0; i<row; i++){
    for(var j=0; j<col; j++){
      uid++;
      t = size*i;
      l = size*j;
      arr_lights.push( '<div uid="'+uid+'" id="l-'+uid+'" class="light row-'+i+' col-'+j+'" style="top:'+t+'px;left:'+l+'px"></div>');
    }
  }
  els[k].innerHTML = arr_lights.join("");
  arr_lights=[];
}

setInterval(function(){
    var now = new Date(),
        time_hh = parseInt(now.getHours()),
          time_mm = parseInt(now.getMinutes()),
            time_ss = parseInt(now.getSeconds());
    hh.className = "block-digital num-"+parseInt(time_hh/10);
    hx.className = "block-digital num-"+parseInt(time_hh%10);
    mm.className = "block-digital num-"+parseInt(time_mm/10);
    mx.className = "block-digital num-"+parseInt(time_mm%10);
    ss.className = "block-digital num-"+parseInt(time_ss/10);
    sx.className = "block-digital num-"+parseInt(time_ss%10);

}, 1000);
