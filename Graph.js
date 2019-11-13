class Graph {
  constructor(nodes=[],edges=[]) {
    this.nodes=nodes;
    this.edges=edges;
    this.selected;
    this.planar=undefined;
    this.home=new Node();
    this.end=new Node();
    this.nosel();
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
    this.nosel();
  }

  unconnect(find) {
    for(let c of this.edges) if(c.isempty) return false;
      else if((c.nodes[0]==this.selected[0]||c.nodes[0]==this.selected[1])&&(c.nodes[1]==this.selected[0]||c.nodes[1]==this.selected[1]))
        if(find)return true;
        else this.edges.splice(this.edges.indexOf(c),1);

    if(find)return false;
    else this.nosel();
  }

  neighbors() {}

  sethome() {
    let n = this.nodes[this.nodes.indexOf(this.selected[1])],
    p = this.nodes[this.nodes.indexOf(this.home)]
    if(p)p.home=false;
    n.home = !n.home;
    n.end = false;
    this.home = n;
    this.nosel();
  }
  setend() {
    let n = this.nodes[this.nodes.indexOf(this.selected[1])],
    p = this.nodes[this.nodes.indexOf(this.end)];
    if(p)p.end=false;
    n.end = !n.end;
    n.home = false;
    this.end = n;
    this.nosel();
  }

  nosel() {this.selected=[new Node(),new Node()];}
  valueOf() {return this.nodes;}
}
