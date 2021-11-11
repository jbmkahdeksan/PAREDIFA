/*
 *
 * Description:
 * Utils for querying graphql
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */

/**  This method returns nodes mapped
 * @param nodes the nodes that want to be mapped to a valid graphql query
 * @return an array of string nodes
 */
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

/**  This method returns edges mapped
 * @param edge the edges that want to be mapped to a valid graphql query
 * @return an array of string edges
 */
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

/**  This method a mutation query for saving a single DFA
 * @param automataId the id of the DFA to be saved
 * @param alphabet the current alphabet of the application
 * @param nodes the current nodes of the application
 * @param edge the current edges of the application
 * @return a string
 */
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

/**  This method is a mutation query for updating a DFA
 * @param currentDfaID the id of the DFA to be updated
 * @param alphabet the current alphabet of the application
 * @param nodes the current nodes of the application
 * @param edge the current edges of the application
 * @return a string
 */
export const queryMutationUpdate = (currentDfaID, nodes, edge, alphabet) =>
  `mutation{
      replaceAutomata(id:"${currentDfaID}",name:"davd",alphabet:${JSON.stringify(
    alphabet
  )},states:[${mapNodesForQuery(nodes)}],transitions:[${mapEdgesForQuery(
    edge
  )}])
    }`;

/**  This method is a mutation query for deleteing a DFA
 * @param currentDfaID the id of the DFA to be deleted
 * @return a string
 */
export const queryMutationDelete = (currentDfaID) =>
  `
    mutation{
      deleteAutomata(id:"${currentDfaID}")
      
    }
    `;

/**  This method is  a query for retrieving a single  DFA
 * @param idDfa the id of the DFA to be retrieved
 * @return a string and its attributes
 */
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

/**  This method is  a query for retrieving team information
 * @return a string and its attributes
 */
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

/**  This method is  a query for retrieving all DFA in the BD
 * @return a string and its attributes
 */
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

/**  This method is  a query for sending an image to the server
 */
export const querySaveImage = (href, firstName, lastName, id, time) =>
  `
    
      {
        sendAutomata(mailAddres:"skagro87@gmail.com",binaryInfo:"${href}",studentName:"${firstName} ${lastName}",  studentId:"${id}", studentSchedule:"${time}")
      }
      
`;
