const namelist = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
class Node {
  constructor(x,y) {
    if(!x) return this.isempty=true;
    this.name=namelist[((graph.nodes.length+1)%namelist.length-1)+1];
    this.isempty=false;
    this.home=false;
    this.end=false;
    this.degree=0;
    this.score=Infinity;
    if(typeof x=="number"&&typeof y=="number")if(this.x=x)this.y=y;
  }

  setscore(score){if(score<this.score)this.score=score;else return false;return true;}

  collide(t=1,x=mouseX,y=mouseY){if(x<this.x+t&&x>this.x-t&&y<this.y+t&&y>this.y-t)return true;return false;}

  draw() {
    push();
    fill(255);
    if(this==graph.selected[0]||this==graph.selected[1])fill(0,255,0);
    else if(this.collide(20))fill(255,255,0);
    else if(this.home)fill(255,0,255);
    else if(this.end)fill(0,0,255);
    ellipse(this.x,this.y,20);
    fill(0);
    noStroke();
    text(this.name, this.x-5, this.y+5);
    pop()
  }

  valueOf(c) {
    if(c)return this[c];
    return[this.x,this.y];
  }
}
