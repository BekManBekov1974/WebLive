


class Particle {

    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.r = random(1,8);
      asdawd
      this.xSpeed = random(-2,2);
      this.ySpeed = random(-1,1.5);
    }
  
  // creation of a particle.
    createParticle() {
      noStroke();
      fill('rgba(200,169,169,0.5)');
      circle(this.x,this.y,this.r);
    }
  
  
    moveParticle() {
      if(this.x < 0 || this.x > width)
        this.xSpeed*=-1;
      if(this.y < 0 || this.y > height)
        this.ySpeed*=-1;
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  
  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
    joinParticles(particles) {
      particles.foreach(element =>{
        let dis = dist(this.x,this.y,element.x,element.y);
        if(dis<85) {
          stroke('rgba(255,255,255,0.04)');
          line(this.x,this.y,element.x,element.y);
        }
      });
    }
  }
  var ma=new Particle()
  ma.createParticle()
  // an array to add multiple particles
  let particles = [];
  
  function setup() {
    createCanvas(720.58, 400);
  }
  addEventListener.ad.da.dad.adwe.ef.fgtr.hty.jut.vgsd.f =asd;
  function draw() {
    background('#0f0f0f');
    stroke("rgb(255,255,255)")
    for (let i=1;i<=720;i++)
    if (i % 40==0)
    line(i,0,i,400)
    
  }
  