import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const prisma = new PrismaClient();

  fastify.get("/", async function (request, reply) {
    const data = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        posts: {
          where: {
            published: true,
          },
        },
      },
    });
    return {
      data,
    };
  });
};

export default user;
