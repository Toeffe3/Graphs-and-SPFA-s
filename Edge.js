function Edge(node1,node2,bidir=true) {
  this.nodes=[];
  this.nodes.push(node1);this.nodes.push(node2);
  this.bidir=bidir;
  this.path=0;
  this.length=sqrt(pow(node2.x-node1.x,2)+pow(node2.y-node1.y,2));
  this.angle=atan(pow(node2.x-node1.x,2)/pow(node2.y-node1.y,2))||-1;
}

Edge.prototype.islinked   = function (node) {let r=node.name||node;if(r==this.nodes[0].name||r==this.nodes[1].name)return true;return false;}
Edge.prototype.draw       = function ()     {push();noFill();switch(this.path){case 1:stroke(223,110,198);break;case 2:stroke(110,164,8);break;default:stroke(255)}if(this.nodes[0]==this.nodes[1]){translate(20,20);ellipse(this.nodes[0].x,this.nodes[0].y,50)}else{line(this.nodes[0].x,this.nodes[0].y,this.nodes[1].x,this.nodes[1].y)}text(round(this.length,2),abs(this.length*sin(this.angle)/2-this.greater("x")),abs(this.length*cos(this.angle)/2-this.greater("y")));pop();}
Edge.prototype.greater    = function (com)  {return this.nodes[0][com]>this.nodes[1][com]?this.nodes[0][com]:this.nodes[1][com]}
