const {ApolloServer, gql} = require('apollo-server')


const ROL = {
  PROFESOR: "profesor",
  ADMINISTRADOR: 2,
  ESTUDIANTE: 3
}

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
      return 1
    },

    testEnum: (obj, {rol}) => {
      return rol
    }
  },
  ROL
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Iniciado servidor en ${url}`)
})
