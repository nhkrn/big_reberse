const n = 8;
var osero;
const enemy = -1;
const player = 1;
var which = 1

class vec2{
  constructor(){
    this.x = -1;
    this.y = -1;
  }
}
class Osero{
  constructor(){
    this.R = [];
    this.V = [];
    for(let i = 0;i < 2*n;i ++){
      this.V.push([]);
      for(let j = 0;j < 2*n;j ++){
        this.V[i].push(0);
      }
    }
    this.V[n-1][n-1] = -1;
    this.V[n][n] = -1;
    this.V[n-1][n] = 1;
    this.V[n][n-1] = 1;
    this.W = 2;
    this.B = 2;
  }
  jud(x,y,p){
    if(this.V[x][y] != 0){
      return 1;
    }
    if(osero.reverse(x,y,p).length == 1){
      return 1;
    }
    return 0;
  }
  decideR(){
    this.R = []
    for(let i = 0;i < 2*n;i ++){
      for(let j = 0;j < 2*n;j ++){
        if(osero.jud(i,j,which)==0){
          let ve = new vec2;
          ve.x = i;
          ve.y = j;
          this.R.push(ve)
        }
      }
    }
  }
  draw(){
    osero.decideR();
    background(255);
    this.B = 0;
    this.W = 0;
    for(let i = 0;i < 2*n+1;i ++){
      line(100+100*i,100,100+100*i,100+100*(2*n));
      line(100,100*(i+1),100*(2*n+1),100*(i+1));
    }
    for(let i = 0;i < 2*n;i ++){
      for(let j = 0;j < 2*n;j ++){
        if(this.V[i][j] != 0){
          if(this.V[i][j] == -1){
            fill(0);
            this.B ++;
          }
          if(this.V[i][j] == 1){
            fill(255);
            this.W ++;
          }
          circle(100*(i+1)+50,100*(j+1)+50,70);
        }
      }
    }
    text(this.B,100,20);
    text(this.W,300,20);
    if(this.W > this.B){
      text("player win",500,30)
    }else if(this.W == this.B){
      text("draw",500,30)
    }else{
      text("player lose",500,30)
    }
    for(let i = 0;i < this.R.length;i ++){
      fill(200,200,250);
      if(which == enemy)fill(0,0,50)
      circle(100*(osero.R[i].x+1)+50,100*(osero.R[i].y+1)+50,30);
    }
  }
  reverse(x,y,p){
    this.Q = []
    let Ve = new vec2;
    Ve.x = x;
    Ve.y = y;
    this.Q.push(Ve);
    for(let i = x+1;i < 2*n;i ++){
      if(this.V[i][y] == 0)break;
      if(this.V[i][y] == p){
        for(let j = x+1;j < i;j ++){
          let ve = new vec2;
          ve.x = j;
          ve.y = y;
          this.Q.push(ve);
        }
        break;
      }
    }
    for(let i = x-1;i >= 0;i --){
      if(this.V[i][y] == 0)break;
      if(this.V[i][y] == p){
        for(let j = x-1;j > i;j --){
          let ve = new vec2;
          ve.x = j;
          ve.y = y;
          this.Q.push(ve);
        }
        break;
      }
    }
    for(let i = y+1;i < 2*n;i ++){
      if(this.V[x][i] == 0)break;
      if(this.V[x][i] == p){
        for(let j = y+1;j < i;j ++){
          
          let ve = new vec2;
          ve.x = x;
          ve.y = j;
          this.Q.push(ve);
          
          
        }
        break;
      }
    }
    for(let i = y-1;i >= 0;i --){
      if(this.V[x][i] == 0)break;
      if(this.V[x][i] == p){
        for(let j = y-1;j > i;j --){
                 let ve = new vec2;
          ve.x = x;
          ve.y = j;
          this.Q.push(ve);
        }
        break;
      }
    }
    for(let i = 1;i < min(2*n-x,2*n-y);i ++){
      if(this.V[x+i][y+i] == 0)break;
      if(this.V[x+i][y+i] == p){
        for(let j = 1;j < i;j ++){
                 let ve = new vec2;
          ve.x = x+j;
          ve.y = y+j;
          this.Q.push(ve);
        }
        break;
      }
    }
    for(let i = 1;i < min(x+1,2*n-y);i ++){
      if(this.V[x-i][y+i] == 0)break;
      if(this.V[x-i][y+i] == p){
        for(let j = 1;j < i;j ++){
          let ve = new vec2;
          ve.x = x-j;
          ve.y = y+j;
          this.Q.push(ve);          
        }
        break;
      }
    }
    for(let i = 1;i < min(x+1,y+1);i ++){
      if(this.V[x-i][y-i] == 0)break;
      if(this.V[x-i][y-i] == p){
        for(let j = 1;j < i;j ++){
          let ve = new vec2;
          ve.x = x-j;
          ve.y = y-j;
          this.Q.push(ve);
        }
        break;
      }
    }
    for(let i = 1;i < min(2*n-x,y+1);i ++){
      if(this.V[x+i][y-i] == 0)break;
      if(this.V[x+i][y-i] == p){
        for(let j = 1;j < i;j ++){
          let ve = new vec2;
          ve.x = x+j;
          ve.y = y-j;
          this.Q.push(ve);
        }
        break;
      }
    }
    return this.Q;
  }
  turn(p,q){
    for(let i = 0;i < int(q.length);i ++){
      this.V[q[i].x][q[i].y] = p;
    }
    osero.draw();
  }
  changeto(p){
    let a = 1;
      for(let i = 0;i < 2*n;i ++){
        for(let j = 0;j < 2*n;j ++){
          if(osero.jud(i,j,p) == 0){
            a = 0;
          }
        }
      }
    osero.draw();
    console.log(a)
    return a;
  }
}

function setup() {
  createCanvas((n+1)*200, (n+1)*200);
  osero = new Osero();
  osero.draw();
  which = enemy;
}

function draw(){
    osero.draw();
    if(osero.R.length == 0)which = -which;
  ENEMY();
}

function ENEMY(){
  if(which == enemy){
    osero.draw();
    let a = int(Math.random()*(osero.R.length));
    osero.turn(enemy,osero.reverse(osero.R[a].x,osero.R[a].y,enemy));
    if(osero.changeto(player)==0){
        which = player;
      }else{
        if(osero.changeto(enemy)==0){
          which = enemy;
        }else{
          which = 0;
        }
      }
      osero.draw();
  }
}

function mouseClicked(){
  var X = int(mouseX/100)-1;
  var Y = int(mouseY/100)-1;
  if(X >= 0 && Y >= 0 && X <2*n && Y < 2*n && which == player){
    if(osero.jud(X,Y,player) == 0){
      osero.turn(player,osero.reverse(X,Y,player));
      if(osero.changeto(enemy)==0){
        which = enemy;
      }else{
        if(osero.changeto(player)==0){
          which = player;
        }else{
          which = 0;
        }
      }
      osero.draw();
    }
  }else if(which == enemy){
    ENEMY();
  }
}
