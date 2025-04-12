import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";
import { getAuth } from "@clerk/nextjs/server";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (integrationContext: any) => {
    const req = integrationContext.req || integrationContext;
    const { userId } = getAuth(req);
    const user = userId ? { id: userId } : null;
    return { user };
  },
});

export { handler as GET, handler as POST };
