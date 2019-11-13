class Graph {
  constructor(nodes=[],edges=[]) {
    this.nodes=nodes;
    this.edges=edges;
    this.selected=[new Node(null), new Node(null)];
    this.planar=undefined;
  }

  add(x) {
    this.nodes.push(x);
    return this;
  }

  draw() {
    for(let e of this.edges)e.draw();
    for(let n of this.nodes)n.draw();
  }

  connect() {
    this.edges.push(new Edge(this.selected[0],this.selected[1]));
    this.selected=[new Node(null),new Node(null)];
  }

  unconnect() {
    for(let c of this.edges)if((c.nodes[0]==this.selected[0]||c.nodes[0]==this.selected[1])&&(c.nodes[1]==this.selected[0]||c.nodes[1]==this.selected[1]))this.edges.splice(this.edges.indexOf(c),1);
    this.selected=[new Node(null),new Node(null)];
  }

  neighbors() {}

  valueOf() {return this.nodes;}
}
