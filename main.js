this.d = undefined;
let graph = new Graph();
let lastpath="0", dijkstraBtn, connectBtn, unconnectBtn, setStartBtn, setEndBtn;

function setup() {
  createCanvas(500,500);
  background(0);

  dijkstraBtn = createButton('Dijkstra');
  connectBtn = createButton('Forbind');
  unconnectBtn = createButton('Frakobel');
  setStartBtn = createButton('Hjem');
  setEndBtn = createButton('Mål');
  clearSelection = createButton('Ryd markering');
  dijkstraBtn.mousePressed(function() {
    if(graph.home.isempty)graph.home=graph.nodes[0];
    if(graph.end.isempty)graph.end=graph.nodes[graph.nodes.length-1];
    if(!window.d) window.d = dijkstra(graph.simpel(), graph.home.name, graph.end.name);
    [path, length] = window.d();
    if(typeof path == "string") {
      graph.getNode(path).path=1;
      if(lastpath)graph.getEdge(path, lastpath).path=1;
    }
    lastpath = path;
    if(length!=-1 && typeof path == "object") {
      for (n of graph.nodes) n.path=0;
      for (e of graph.edges) e.path=0;
      for (let i = 0; i < path.length; i++) {
        graph.getNode(path[i]).path=2;
        let p = path[i+1]?graph.getEdge(path[i], path[i+1]):{path:0};
        if(p.path!==-1)p.path=2
      } window.d = undefined
    }
  });
  connectBtn.mousePressed(function() {graph.connect();});
  unconnectBtn.mousePressed(function() {graph.unconnect();});
  setStartBtn.mousePressed(function() {graph.sethome();});
  setEndBtn.mousePressed(function() {graph.setend();});
  clearSelection.mousePressed(function() {graph.nosel();});

  tempgraph();

}

function draw() {
  background(0);
  graph.draw();
  if(graph.unconnect(true)) unconnectBtn.show(); else {
    unconnectBtn.hide();
    if(!graph.selected[0].isempty&&!graph.selected[1].isempty) connectBtn.show();
    else connectBtn.hide();
  }
  if(!graph.selected[1].isempty && (graph.selected[0].isempty || graph.selected[0] == graph.selected[1])) {
    setStartBtn.show();
    setEndBtn.show();
  } else {
    setStartBtn.hide();
    setEndBtn.hide();
  }
  if(graph.selected[0].isempty&&graph.selected[1].isempty) clearSelection.hide();
  else clearSelection.show();
  if(graph.edges.length>0) dijkstraBtn.show();
  else dijkstraBtn.hide();
}

function mousePressed() {
  if(mouseX > width || mouseY > height) return 0;
  let state=0;          //0: Placér - 1: Valgt - 2: Forbundet - 3: Kollideret
  for (node of graph.valueOf())
    if(node.collide(10)) {
      graph.selected.shift();
      graph.selected.push(node);
      state=1;
    } else if(node.collide(20))state=2;
  if(state==0)graph.add(new Node(mouseX,mouseY));
}

function tempgraph(p=[[100,200,200,250,230,340,450,100],[100,100],[100,300,100,400]]) {
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < p[i].length; j+=2) {
      graph.selected.shift();
      graph.selected.push(graph.add(new Node(p[i][j],p[i][j+1])));
      graph.connect();
    }
    graph.nosel();
    graph.selected.shift();
    graph.selected.push(graph.nodes[i]);
  }
  graph.nosel();
}
