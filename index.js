function bfs(rootNode, vertices, edges){
  rootNode.distance = 0

  let discovered = [rootNode]
  let discoveredOrder = [rootNode]

  while (discovered.length > 0) {
    let current = discovered.shift()
    let adjacentNodes = findAdjacent(current.name, vertices, edges)

    discoveredOrder = discoveredOrder.concat(adjacentNodes)
    markDistanceAndPredecessor(current, adjacentNodes)
    discovered = discovered.concat(adjacentNodes)
  }

  return discoveredOrder
}

const findAdjacent = (node, verticies, edges) => {
  let adjacent = []

  edges.forEach(pair => {
    if (pair[0] === node) {
      adjacent.push(pair[1])
    }
    if (pair[1] === node) {
      adjacent.push(pair[0])
    }
  })

  let nodes = []

  while (adjacent.length > 0) {
    const name = adjacent.pop()
    
    verticies.forEach(vert => {
      if (name === vert.name && vert.distance === null) {
        nodes.push(vert)
      }
    })
  }

  return nodes.reverse()
}

const markDistanceAndPredecessor = (node, adjacentNodes) => {
  adjacentNodes.map(adj => {
    adj.distance = node.distance + 1
    adj.predecessor = node
  })
}