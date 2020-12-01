class Ball{
    constructor(x,y){
        this.radius = 25
        this.x  = x
        this.y = y
    }
 display(){
     if(frameCount % 60 === 0){
     fill("blue")
     circle(this.x,this.y,this.radius)
 }
}
}