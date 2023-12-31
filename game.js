AFRAME.registerComponent("game" , {
    schema:{
        gameState: {type:"string" , default:"play"}
    },
    init: function(){
        var duration = 300;
        var timerEl = document.querySelector("#timer")
        this.start_timer(duration , timerEl)
        
        //this.create_cars()
    },
    start_timer:function(duration, timerEl){
        var min , sec 
        setInterval(() => {
            if(duration>=0 ){
                
                this.data.gameState = "play"
               
                min = parseInt(duration/60)
                sec = parseInt(duration%60)
                if(min < 10){
                    min = "0"+min
                }
                if(sec<10){
                    sec = "0"+sec
                }
                
                timerEl.setAttribute("text",{value:min+":"+sec})
                duration -= 1
                
                this.isCollided()
                


            }else{
                this.data.gameState = "over"
                cameraRig = document.querySelector("#camerarig")
                cameraRig.setAttribute("velocity" , {x:0 , y:0 , z:0})
                var over = document.querySelector("#over")
                over.setAttribute("visible" , true)
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text" , {value:0})
            }
        }, 100);
    },
    isCollided:function(){
     
            car1 = document.querySelector("#car1")
            car2 = document.querySelector("#car2")
            


            car1.addEventListener("collide", (e)=>{

                console.log("is collided")
                var over = document.querySelector("#over")
                over.setAttribute("visible" , true)
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text" , {value:0})

                car2.setAttribute("velocity" , {x:0 , Y:0 , z:0})
                car1.setAttribute("velocity" , {x:0 , Y:0 , z:0})

               
                this.data.gameState="over"
                
                
            });


            car2.addEventListener("collide",(e)=>{
                console.log("is collided")
                var over = document.querySelector("#over")
                over.setAttribute("visible" , true)
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text" , {value:0})

                car2.setAttribute("velocity" , {x:0 , Y:0 , z:0})
                car1.setAttribute("velocity" , {x:0 , Y:0 , z:0})

                
                this.data.gameState="over"
               
            })
        
    }
    
})