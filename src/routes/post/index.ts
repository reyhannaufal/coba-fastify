import { PrismaClient } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import { Post } from "../../models/post";

const post: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const prisma = new PrismaClient();

  fastify.get("/", async function (_request, _reply) {
    const data: Post[] = await prisma.post.findMany({
      select: {
        title: true,
        published: true,
        content: true,
        viewCount: true,
      },
    });
    return {
      data,
    };
  });
};

export default post;
