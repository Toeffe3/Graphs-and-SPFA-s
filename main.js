this.d = undefined;
let graph = new Graph();
let dijkstraBtn, connectBtn, unconnectBtn, setStartBtn, setEndBtn;

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
    if(!window.d) window.d = dijkstra(graph.simpel(), "A", "D");
    [path, length] = window.d();
    console.log(path)
    console.log(length)
    if(length!=-1) window.d = undefined;
  });
  connectBtn.mousePressed(function() {graph.connect();});
  unconnectBtn.mousePressed(function() {graph.unconnect();});
  setStartBtn.mousePressed(function() {graph.sethome();});
  setEndBtn.mousePressed(function() {graph.setend();});
  clearSelection.mousePressed(function() {graph.nosel();});

  graph.selected.shift();
  graph.selected.push(graph.add(new Node(100,200)));
  graph.selected.shift();
  graph.selected.push(graph.add(new Node(200,250)));
  graph.connect();
  graph.selected.shift();
  graph.selected.push(graph.valueOf()[1]);
  graph.selected.shift();
  graph.selected.push(graph.add(new Node(230,340)));
  graph.connect();
  graph.selected.shift();
  graph.selected.push(graph.valueOf()[2]);
  graph.selected.shift();
  graph.selected.push(graph.add(new Node(450,100)));
  graph.connect();
  graph.draw();
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
  for (node of graph.valueOf()) {
    if(node.collide(10)) {
      graph.selected.shift();
      graph.selected.push(node);
      state=1;
    } else if(node.collide(20))state=2;
  } if(state==0)graph.add(new Node(mouseX,mouseY));
}
