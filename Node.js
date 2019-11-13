class Node {
  constructor(x,y,weight) {
    if(x==undefined){this.isempty=true;return this.isempty;}
    this.isempty=false;
    this.home=false;
    this.end=false;
    this.weight=weight;
    this.degree=0;
    if(typeof x=="number"&&typeof y=="number")if(this.x=x)this.y=y;
  }

  collide(t=1,x=mouseX,y=mouseY) {
    if(x<this.x+t&&x>this.x-t&&y<this.y+t&&y>this.y-t)return true;
    return false;
  }

  draw() {
    fill(255);
    if(this==graph.selected[0]||this==graph.selected[1])fill(0,255,0);
    else if(this.collide(20))fill(255,255,0);
    else if(this.home)fill(255,0,255);
    else if(this.end)fill(0,0,255);
    ellipse(this.x,this.y,20);
  }

  valueOf(c) {
    if(c)return this[c];
    return[this.x,this.y];
  }
}
