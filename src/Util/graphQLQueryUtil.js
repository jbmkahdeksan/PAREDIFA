export const mapNodesForQuery = (nodes) =>
  nodes.map(
    (node) => `{
        id: "${node.id}",
        name: "${node.name}",
        coord: { x: ${node.x}, y: ${node.y} },
        end: ${node.final},
        start: ${node.start},
      }`
  );

export const mapEdgesForQuery = (edge) =>
  edge.map(
    (ed) => `{
    id: "${ed.id}",
    state_src_id: {id:"${ed.from.id}",x:${ed.from.x},y:${ed.from.y}},
    state_dst_id: {id:"${ed.to.id}",x:${ed.to.x},y:${ed.to.y}},
    symbols: ${JSON.stringify(ed.symbol.split(","))},
    coordTemp:{x:${ed.from.x},y:${ed.from.y}}
  }`
  );

export const queryMutationSaveSingleDfa = (automataId, alphabet, nodes, edge) =>
  `mutation{
      saveAutomata(id:"${
        automataId || Date.now()
      }",name:"NONE",alphabet:${JSON.stringify(
    alphabet
  )},states:[${mapNodesForQuery(nodes)}],transitions:[${mapEdgesForQuery(
    edge
  )}]){
        id
      }
    }`;

export const queryMutationUpdate = (currentDfaID, nodes, edge, alphabet) =>
  `mutation{
      replaceAutomata(id:"${currentDfaID}",name:"davd",alphabet:${JSON.stringify(
    alphabet
  )},states:[${mapNodesForQuery(nodes)}],transitions:[${mapEdgesForQuery(
    edge
  )}])
    }`;

export const queryMutationDelete = (currentDfaID) =>
  `
    mutation{
      deleteAutomata(id:"${currentDfaID}")
      
    }
    `;

export const querySingleAutomata = (idDfa) =>
  `
    {
      singleAutomata(id:"${idDfa}"){
        id
        name
        alphabet
        states{
          id
          name
          coord{
            x
            y
          }
          end
          start
        }
        transitions{
          id
          state_src_id{
            id
            x
            y
          }
          state_dst_id{
            id
            x
            y
          }
          symbols
          coordTemp{
            x
            y
          }
          
        }
      }
    }`;

export const queryAbout = `{
      about{
        authors{
          id
          name
        }
        team{
          id
        }
        course{
          id
          crn
          name
        }
        term{
          year
          id
        }
        version{
          id
        }
      }
    }
    `;
export const queryAllAutomatas = `{
  allAutomatas{
    id
    name
    alphabet
    states{
      id
      name
      coord{
        x
        y
      }
      end
      start
    }
    transitions{
      id
      state_src_id{
        id
        x
        y
      }
      state_dst_id{
        id
        x
        y
      }
      symbols
      coordTemp{
        x
        y
      }
    }
    
  }
}`;
export const querySaveImage = (href, firstName, lastName, id, time) =>
  `
    
      {
        sendAutomata(mailAddres:"skagro87@gmail.com",binaryInfo:"${href}",studentName:"${firstName} ${lastName}",  studentId:"${id}", studentSchedule:"${time}")
      }
      
`;
