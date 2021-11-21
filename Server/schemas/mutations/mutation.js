//GraphQL types
const { GraphQLObjectType,  GraphQLList,  GraphQLString,  GraphQLBoolean,} = require("graphql");
//Custom types
const { automataType } = require("../types/automata/automata.js");
const { inputStateType } = require("../types/input/state_input.js");
const { inputTransitionType } = require("../types/input/transition_input.js");
const { saveStatusType } = require("../types/automata/savestatus.js");
//Resolvers
const {  deleteAutomata,  saveAutomata,
    replaceAutomata, deleteAutomataByRegex} = require("../../resolvers/automataresolver.js");
/*
 *
 * Description:
 * Handle mutation querys in graphql schema
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutate data stored on database",
  fields: () => ({
    saveAutomata: {
      type: saveStatusType,
      description: "Save a new automata on database",
      args: {
        id: { type: GraphQLString },
        regex: { type: GraphQLString },
        alphabet: { type: GraphQLList(GraphQLString) },
        states: { type: GraphQLList(inputStateType) },
        transitions: { type: GraphQLList(inputTransitionType) },
      },
      resolve: (_, args) =>
        saveAutomata(
          args.id,
          args.regex,
          args.alphabet,
          args.states,
          args.transitions
        ),
    },
    deleteAutomata: {
      type: GraphQLBoolean,
      description: "Delete a single automata stored on db",
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => deleteAutomata(args.id),
    },
    replaceAutomata: {
      type: GraphQLBoolean,
      description: "Replace a single automata stored on database",
      args: {
        id: { type: GraphQLString },
        regex: { type: GraphQLString },
        alphabet: { type: GraphQLList(GraphQLString) },
        states: { type: GraphQLList(inputStateType) },
        transitions: { type: GraphQLList(inputTransitionType) },
      },
      resolve: (_, args) =>
        replaceAutomata(
          args.id,
          args.regex,
          args.alphabet,
          args.states,
          args.transitions
        ),
    },
    deleteAutomataByRegex:{
      type:GraphQLBoolean,
      description:"Deletes a single automata by regex stored on db",
      args:{
        regex: { type:GraphQLString }
      },
      resolve:(_, args)=>deleteAutomataByRegex(args.regex)
    }
  }),
});

module.exports = { mutation };
