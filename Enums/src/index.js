const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql `

  enum ROL {
    PROFESOR
    ADMINISTRADOR
    ESTUDIANTE
  }

  type Query {
    getRol: ROL,
    testEnum(rol: ROL): ROL
  }

`

const resolvers = {
  Query: {
    getRol: (obj) => {
      return "PROFESOR"
    },

    testEnum: (obj, {rol}) => {
      return rol
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Iniciado servidor en ${url}`)
})
