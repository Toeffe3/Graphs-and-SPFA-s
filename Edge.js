class Edge {
  constructor(node1,node2,bidir=true) {
    this.nodes=[];
    this.nodes.push(node1);
    this.nodes.push(node2);
    this.bidir=bidir;
    this.length=sqrt(pow(node2.x-node1.x,2)+pow(node2.y-node1.y,2));
    this.angle=atan(pow(node2.x-node1.x,2)/pow(node2.y-node1.y,2))||-1;
  }

  islinked(node){if(node==this.nodes[0]||node==this.nodes[1])return true;return false;}

  draw() {
    push();
    stroke(255);
    noFill();
    if(this.nodes[0]==this.nodes[1]) {translate(20,20); ellipse(this.nodes[0].x, this.nodes[0].y, 50);}
    else line(this.nodes[0].x, this.nodes[0].y,this.nodes[1].x,this.nodes[1].y);
    let x = this.nodes[0].x>this.nodes[1].x?this.nodes[0].x:this.nodes[1].x, y = this.nodes[0].y>this.nodes[1].y?this.nodes[0].y:this.nodes[1].y;
    text(round(this.length,2),abs(this.length*sin(this.angle)/2-x),abs(this.length*cos(this.angle)/2-y),);
    pop();
  }
}
