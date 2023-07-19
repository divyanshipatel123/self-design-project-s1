AFRAME.registerComponent("drive",{
    init:function(){
      this.driveCar() //also add the game component
    },
    isVelocityActive:function(){
        console.log("hi")
        return Math.random() < 0.25
    },
    driveCar:function(){
        var multiply = 10
        var wheelRotation = 0
        window.addEventListener("keydown" , function(e){
            //wheel rotation settting 
            var wheel = document.querySelector("#steeringWheel")
            if(e.code === "ArrowRight" && wheelRotation > -40){
                wheelRotation = wheelRotation - 5
                wheel.setAttribute("rotation" , {x:0 , y:0 , z:wheelRotation})
            }
            if(e.code === "ArrowLeft" && wheelRotation < 40){
                wheelRotation = wheelRotation+5
                wheel.setAttribute("rotation" , {x:0 , y:0 , z:wheelRotation})  
             }
            // camera settings 
            var cameraRig = document.querySelector("#camerarig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")
            

            //cameraRig.setAttribute("movement-controls" , {speed:cameraMoveControl.speed+0.005})
            

            var cameraDirection = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDirection)

            if(e.code === "ArrowRight"){
                cameraRotation.y -= 5 
                cameraRig.setAttribute("rotation" , {x:0 , y:cameraRotation.y , z:0})
                cameraRig.setAttribute("movement-controls" , {"speed":cameraMoveControl.speed + 0.005})
                console.log("control right" , cameraMoveControl.speed)

            }
            if(e.code === "ArrowLeft"){
                cameraRotation.y += 5 
                cameraRig.setAttribute("rotation" , {x:0 , y:cameraRotation.y , z:0})
               cameraRig.setAttribute("movement-controls" , {"speed":cameraMoveControl.speed + 0.005})
               console.log("control left" , cameraMoveControl.speed)

                
            }

            if(e.code ==="ArrowUp"){
                multiply += 0.5
                if(multiply<= 100 && cameraPosition.z > -500){
                    cameraRig.setAttribute("movement-controls" , {"speed":cameraMoveControl.speed+0.005})
                    console.log("control" , cameraMoveControl.speed)
                    var accelerateCar = document.querySelector("#acc")
                    accelerateCar.setAttribute("material" , "color","green")
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text" , {value:multiply}) 
                    var sound = document.querySelector("#sound1")
                    sound.components.sound.playSound()  
                }
            }
            if(e.code === "Space"){
                multiply = 10
                cameraRig.setAttribute("movement-controls" , {"speed":0})
                var stopCar = document.querySelector("#break")
                stopCar.setAttribute("material" ,"color","red")
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text" , {value:multiply}) 
            }

        })
        window.addEventListener("keyup" , function(e){
            var cameraRig = document.querySelector("#camerarig")
            var cameraDirection = new THREE.Vector3()
            cameraRig.object3D.getWorldDirection(cameraDirection)
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")
            if (e.code ==="Space"){
                var stopCar = document.querySelector("#break")
                stopCar.setAttribute("material" , "color" , "grey")
            }
            if (e.code ==="ArrowUp"){
                if(multiply>10){
                    //multiply-=0.5
                    cameraRig.setAttribute("movement-controls" ,{"speed": cameraMoveControl.speed + 0.005})
                }
                var accCar = document.querySelector("#acc")
                accCar.setAttribute("material" , "color" , "grey")

                var sound = document.querySelector("#sound1")
                sound.components.sound.stopSound()
            }
        })


    }
})