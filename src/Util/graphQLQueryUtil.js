/*
 *
 * Description:
 * Utils for querying graphql
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
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
export const queryMutationSaveSingleDfa = (
  automataId,
  alphabet,
  nodes,
  edge,
  re = ""
) =>
  `mutation{
      saveAutomata(id:"${
        automataId || Date.now()
      }",regex:"${re}",alphabet:${JSON.stringify(
    alphabet
  )},states:[${mapNodesForQuery(nodes)}],transitions:[${mapEdgesForQuery(
    edge
  )}]){
        id
        repeatedID
      }
    }`;

/**  This method is a mutation query for updating a DFA
 * @param currentDfaID the id of the DFA to be updated
 * @param alphabet the current alphabet of the application
 * @param nodes the current nodes of the application
 * @param edge the current edges of the application
 * @return a string
 */
export const queryMutationUpdate = (
  currentDfaID,
  nodes,
  edge,
  alphabet,
  re = ""
) =>
  `mutation{
      replaceAutomata(id:"${currentDfaID}",regex:"${re}",alphabet:${JSON.stringify(
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
        regex
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
          professor
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
    regex
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
/**  This method is  a query for compiling a RE to a DFA
 * @param dfaId the id of the DFA given by the user
 * @param re the regular expression given by the user
 * @param checkSintax if it should the sintax should be checked
 * @param simplifyRe if it should simplify the RE
 * @return a string and its attributes
 */
export const queryCompileRe = (dfaId, checkSintax, simplifyRe, re) => `
{
  compileRE(re:{id:"${dfaId}",checkSintax:${checkSintax},simpBeforeComp:${simplifyRe},RE:"${re}"}){
    nodes{
      name
      label
      initial
      final
    }
   
    edges{
      source
      target
      symbol
    }
    alphabet
  }
}`;
/**  This method is  a query for sending an image to the server
 * @param href encoded base 64 encoded URL
 * @param firstName first name of the student
 * @param lastName last name of the student
 * @id id of the student
 * @param time scheduled time of the student
 * @return void
 * */
export const querySaveImage = (href, firstName, lastName, id, time) =>
  `
    
      {
        sendAutomata(mailAddres:"skagro87@gmail.com",binaryInfo:"${href}",studentName:"${firstName} ${lastName}",  studentId:"${id}", studentSchedule:"${time}")
      }
      
`;

/**  This method is  a query to delete a RE related to a DFA
 * @param re the regular expression
 * @return void
 * */
export const queryDeleteByRe = (re) =>
  `mutation{
    deleteAutomataByRegex(regex:"${re}")
  }
  `;

export const queryNfaToDfa = (alphabet, nodes, edges) =>
  `
    {
      convertNFA_into_DFA(alphabet:${JSON.stringify(
        alphabet
      )},states:[${mapNodesForQuery(nodes)}],transitions:[${mapEdgesForQuery(
    edges
  )}]){
        nodes{
          name
          label
          initial
          final
        }
        edges{
          source
          target
          symbol
        }
        alphabet
      }
    }
    `;
