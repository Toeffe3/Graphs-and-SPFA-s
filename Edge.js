class Edge {
  constructor(node1,node2,bidir=true) {
    this.nodes=[];
    this.nodes.push(node1);
    this.nodes.push(node2);
    this.bidir=bidir;
  }

  draw() {
    push();
    stroke(255);
    noFill();
    if(this.nodes[0]==this.nodes[1]) {translate(20,20); ellipse(this.nodes[0].valueOf("x"), this.nodes[0].valueOf("y"), 50);}
    else line(this.nodes[0].valueOf("x"), this.nodes[0].valueOf("y"),this.nodes[1].valueOf("x"),this.nodes[1].valueOf("y"));
    pop();
  }
}
