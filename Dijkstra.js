const dijkstra = (edges,source,target) => {
  // Opsætning af algoritmen
  const Q = new Set(),
        prev = {},                    // Lager knuders forrige (korteste distance) knude
        dist = {},                    // Lager distancen for stien for enhvert punkt
        adj = {}                      // Lager distancen mellem knuder

  // Function til at finde den knude med mindste længde
  const vertex_with_min_dist = (Q,dist) => {
    let min_distance = Infinity,      // Længden til knuden er uendelig hvis den ikke er forbundet med andre
        u = null

    for (let v of Q) {                // For alle knuder
      if (dist[v] < min_distance) {   // Hvis knuden er mindre end min_distance
        min_distance = dist[v]        // Sæt ny min_distance
        u = v                         // Gem knuden som u
      }
    } return u                        // Retuner u
  }

  // Funktion til at udfører næste trin i algoritmen
  const next = () => {
    let u = vertex_with_min_dist(Q,dist),                   // Lad u være den knude med mindste længde
        neighbors = Object.keys(adj[u]).filter(v=>Q.has(v)) // Alle forbundne knuder der ikke er blevet tjekket

    Q.delete(u)                       // Fjern u fra listen

    if (u===target) {                 // Hvis u er slutknuden
      let u = target,                 // u er slutknuden
          S = [u],                    // S er en liste med u
        len = 0                       // Stilængden er 0

      while (prev[u] !== undefined) { // I listen for alle punkter der er blevet brugt
        S.unshift(prev[u])            // Tilføjer 'forrige knude' til starten af listen med stien
        len += adj[u][prev[u]]        // Læg det forreste punkts distance til stilængden
        u = prev[u]                   // Sæt u til knuden der lige blev indsat i stien
      } return [S,len]                // Løsning er blevet fundet, retuner stien og den endelige længde
    }
    // Hvis u ikke er slutknuden
    for (let v of neighbors) {        // For enhver knude der er forbundet til den den nuværene knude
      let alt = dist[u] + adj[u][v]   // Den totale distance plus distancen mellem den nuværene knude og denne knude
      if (alt < dist[v]) {            // Hvis den distance er mindre end den totale distance til denne knude
        dist[v] = alt                 // Opdater denne knudes distance
        prev[v] = u                   // Og sæt den forrige knude til den nuværene knude
      }
    } return [u, -1]; // Retunere det næste "nuværene bedste punkt" og angiv længden -1 for at indikere at algoritmen ikke er færdig
  }

  // Opsætning når funktionen bliver kaldt første gang
  for (let i=0;i<edges.length;i++) {  // For alle kanter
    let v1 = edges[i][0],             // Få begge knuder
        v2 = edges[i][1],             // ..
        len =edges[i][2]              // og længden

    Q.add(v1)                         // Tilføj begge knuder og sæt deres stilængde til uendelig
    Q.add(v2)                         // ..
    dist[v1] = Infinity               // ..
    dist[v2] = Infinity               // ..

    if (adj[v1] === undefined) adj[v1] = {}
    if (adj[v2] === undefined) adj[v2] = {}

    adj[v1][v2] = len                 // Sæt knudernes distance
    adj[v2][v1] = len                 // ..
  }

  dist[source] = 0                    // Sæt startknudens distance til 0

  return next                         // retuner funktionen next()
}
