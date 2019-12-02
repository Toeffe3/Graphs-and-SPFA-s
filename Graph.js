function Graph(nodes=[], edges=[]) {
  this.nodes=nodes;
  this.edges=edges;
  this.selected=[new Node(),new Node()];
  this.planar=undefined;
  this.home=new Node();
  this.end=new Node();
}

Graph.prototype.add       = function (x)    {this.nodes.push(x); return x}
Graph.prototype.connect   = function ()     {this.edges.push(new Edge(this.selected[0],this.selected[1]))}
Graph.prototype.unconnect = function (find) {for(let c of this.edges)if(c.isempty)return 0;else if(this.isselected(c.nodes[0],c.nodes[1]))if(find)return 1;else this.edges.splice(this.edges.indexOf(c),1);if(find)return 0;else this.nosel()}
Graph.prototype.select    = function (node) {this.selected.shift();this.selected.push(node)}
Graph.prototype.isselected= function (a,b=a){if((a==this.selected[0]||a==this.selected[1])&&(b==this.selected[0]||b==this.selected[1]))return 1;return}
Graph.prototype.nosel     = function ()     {this.selected=[new Node(),new Node()]}
Graph.prototype.getNode   = function (node) {for(let n of this.nodes)if(node==n.name||node==n)return n;return new Node()}
Graph.prototype.getEdge   = function (a,b)  {for(let e of this.edges)if(e.islinked(a)&&e.islinked(b))return e;return{path:-1}}
Graph.prototype.simpel    = function ()     {let sg=[];for(let e of this.edges)sg.push([e.nodes[0].name,e.nodes[1].name,round(e.length)]);return sg}
Graph.prototype.valueOf   = function ()     {return this.nodes}
Graph.prototype.draw      = function ()     {for(let e of this.edges)e.draw();for(let n of this.nodes)n.draw()}
Graph.prototype.setend    = function (a)    {for(node of this.nodes)node.end=false;let n=this.nodes[this.nodes.indexOf(this.selected[1])];n.end=true;n.home=false;this.end=n}
Graph.prototype.sethome   = function (a)    {for(node of this.nodes)node.home=false;let n=this.nodes[this.nodes.indexOf(this.selected[1])];n.home=true;n.end=false;this.home=n}
