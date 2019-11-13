let graph = new Graph();
let connectBtn, unconnectBtn, setStartBtn, setEndBtn;

function setup() {
  createCanvas(500,500);
  background(0);

  connectBtn = createButton('Forbind');
  unconnectBtn = createButton('Frakobel');
  setStartBtn = createButton('Hjem');
  setEndBtn = createButton('Mål');
  clearSelection = createButton('Ryd markering');
  connectBtn.mousePressed(function() {graph.connect();});
  unconnectBtn.mousePressed(function() {graph.unconnect();});
  setStartBtn.mousePressed(function() {graph.sethome();});
  setEndBtn.mousePressed(function() {graph.setend();});
  clearSelection.mousePressed(function() {graph.nosel();});
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
}

function mousePressed() {
  let state=0;          //0: Placér - 1: Valgt - 2: Forbundet - 3: Kollideret
  for (node of graph.valueOf()) {
    if(node.collide(10)) {
      graph.selected.shift();
      graph.selected.push(node);
      state=1;
    } else if(node.collide(20))state=2;
  } if(state==0)graph.add(new Node(mouseX,mouseY));
}
