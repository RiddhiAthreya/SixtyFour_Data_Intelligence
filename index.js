var chartColors = {
    blue: 'rgb(54, 162, 235)',
  };
  
  var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
  };
  
  // draws a rectangle with a rounded top
  Chart.helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    // top right corner
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    // bottom right	corner
    ctx.lineTo(x + width, y + height);
    // bottom left corner
    ctx.lineTo(x, y + height);
    // top left	
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };
  
  Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
    draw: function() {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var left, right, top, bottom, signX, signY, borderSkipped;
      var borderWidth = vm.borderWidth;
  
      if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top? 1: -1;
        borderSkipped = vm.borderSkipped || 'bottom';
      } else {
        // horizontal bar
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left? 1: -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
      }
  
      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize? barSize: borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }
  
      // calculate the bar width and roundess
      var barWidth = Math.abs(left - right);
      var roundness = this._chart.config.options.barRoundness || 0.5;
      var radius = barWidth * roundness * 0.5;
      
      // keep track of the original top of the bar
      var prevTop = top;
      
      // move the top down so there is room to draw the rounded top
      top = prevTop + radius;
      var barRadius = top - prevTop;
  
      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;
  
      // draw the rounded top rectangle
      Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);
  
      ctx.fill();
      if (borderWidth) {
        ctx.stroke();
      }
  
      // restore the original top value so tooltips and scales still work
      top = prevTop;
    },
  });
  
  Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);
  
  Chart.controllers.roundedBar = Chart.controllers.bar.extend({
    dataElementType: Chart.elements.RoundedTopRectangle
  });
  
  var ctx = document.getElementById("canvas").getContext("2d");
  var myBar = new Chart(ctx, {
    type: 'roundedBar',
      data: {
          labels: ["Jan", "Feb", "March", "April", "May", "Jun", "July","Aug","Sep","Oct","Nov","Dec"],
          datasets: [ 
    { 
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              hoverBackgroundColor: "#59597F",         
              data: [50, 90, 40, 75 , 80, 45, 60,90,80,40,100,60 ]
    }
    ]
      },
      
    options: {
      responsive: true,
      barRoundness: 1,
      legend:{
      display:false,
    },
      title: {
        display: true,
        align:"start",
        text: "GNPA trend",
        
      },
      scales: {
                yAxes: [{
                display: true,
            
                gridLines: {display: false,
                           },
                 ticks: {
                  beginAtZero: true,
                   stepSize:20,
              }
                }],
                xAxes: [{
                  
                  gridLines: {
                  display: false,
                    drawBorder: false,
              },
                  barPercentage: 0.2
                }]   
      }
    }
  });






  var ctx = document.getElementById("canvas2").getContext("2d");
  var myBar1 = new Chart(ctx, {
    type: 'roundedBar',
      data: {
          labels: ["Jan", "Feb", "March", "April", "May", "Jun", "July","Aug","Sep","Oct","Nov","Dec"],
          datasets: [ 
    { 
              backgroundColor: "rgba(135,176,242,255)",
              borderColor: "rgba(135,176,242,255)",
              borderWidth: 2,
              hoverBackgroundColor: "#59597F",         
              data: [50, 90, 40, 75 , 80, 45, 60,90,80,40,100,60 ]
    }
    ]
      },
      
    options: {
      responsive: true,
      barRoundness: 1,
      legend:{
      display:false,
    },
      title: {
        display: true,
        align:"start",
        text: "GNPA trend",
        
      },
      scales: {
                yAxes: [{
                display: true,
            
                gridLines: {display: false,
                           },
                 ticks: {
                  beginAtZero: true,
                   stepSize:20,
              }
                }],
                xAxes: [{
                  
                  gridLines: {
                  display: false,
                    drawBorder: false,
              },
                  barPercentage: 0.2
                }]   
      }
    }
  });

chart1 = document.getElementsByClassName("chart1");
chart1.onclick = changeValue;

for(var i = 0, x = chart1.length; i < x; i++) {
  chart1[i].onclick = changeValue;
}


chart2 = document.getElementsByClassName("chart2");
chart2.onclick = changeValue2;

for(var i = 0, x = chart2.length; i < x; i++) {
  chart2[i].onclick = changeValue2;
}

function changeValue(){
  let request= new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:5000/");
  request.send()
  request.onload = () =>{
  console.log(request);
  if (request.status==200){
    answer=JSON.parse(request.response);
    for(var i=0;i<myBar.data.datasets[0].data.length;i++){
      myBar.data.datasets[0].data[i]=answer[i]
      myBar.update()
    }
  }
  else{
    console.log("error");
  }
} 
}

function changeValue2(){
  let request= new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:5000/");
  request.send()
  request.onload = () =>{
  console.log(request);
  if (request.status==200){
    answer=JSON.parse(request.response);
    for(var i=0;i<myBar1.data.datasets[0].data.length;i++){
      myBar1.data.datasets[0].data[i]=answer[i]
      myBar1.update()
    }
  }
  else{
    console.log("error");
  }
}  
}
