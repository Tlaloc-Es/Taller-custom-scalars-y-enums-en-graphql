const {ApolloServer, gql} = require('apollo-server')
const {GraphQLScalarType, Kind} = require('graphql')

const typeDefs = gql`

  scalar Nota

  type Examen {
    nota: Nota,
    asignatura: String
  }

  type Query {
    listarNotas: [Examen]
  }

  type Mutation {
    insertarNota(asignatura: String, nota: Nota): Examen
  }
`

const notaValida = (value) => {
  if (typeof(value) === 'number' && Number.isInteger(value) && value >= 0 && value <=10){
    return value
  }
  throw new Error('Tiene que ser un numero entero entre 0 y 10')
}

const resolvers = {
  Nota: new GraphQLScalarType({
    name: 'Nota',
    description: 'Representa una nota del 0 al 10',
    serialize:notaValida,
    parseValue:notaValida,
    parseLiteral(ast) {
      console.log(JSON.stringify(ast))
      if (ast.kind === Kind.INT) {
        return notaValida(parseInt(ast.value))
      }
      throw new Error('Tiene que ser un numero entero entre 0 y 10')
    }
  }),

  Query: {
    listarNotas: (obj) => {
      return [
        {'asignatura': 'GraphQL', nota: -1},
        {'asignatura': 'kubernetes', nota: 1},
      ]
    }
  },

  Mutation: {
    insertarNota: (obj, {asignatura, nota}) => {
      return {asignatura, nota}
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Servidor iniciado en ${url}`)
})