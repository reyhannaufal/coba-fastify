import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import { User } from "../../models/user";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const prisma = new PrismaClient();

  fastify.get("/", async function (_request, _reply) {
    const data: User[] = await prisma.user.findMany({
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

  fastify.get<{
    Params: { id: number };
  }>("/:id", async function (request, _reply) {
    const { id } = request.params;
    const data = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        posts: true,
      },
    });
    return {
      data,
    };
  });
};

export default user;
