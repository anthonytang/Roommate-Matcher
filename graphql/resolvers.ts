// /graphql/resolvers.ts
import { PrismaClient } from "@prisma/client";
import { GraphQLDateTime } from 'graphql-scalars';

const prisma = new PrismaClient();

export const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        getUser: async (_: any, { email }: { email: string }) => {
            return await prisma.user.findUnique({
              where: { email },
              include: { answers: true, matchResult: true },
            });
        },
        getAllUsers: async () => {
            return await prisma.user.findMany({
              include: { answers: true, matchResult: true },
            });
        },
        getQuestionAnswers: async (_: any, { email }: { email: string }) => {
          return await prisma.questionAnswer.findUnique({
            where: { email },
          });
        },      
    },
    Mutation: {
      submitQuestionAnswers: async (_: any, args: { email: string, answers: any }) => {
        const { email, answers } = args;
        return await prisma.questionAnswer.upsert({
          where: { email },
          update: { answers },
          create: { email, answers },
        });
      },
      updateUserInfo: async (_: any, args: {
        email: string;
        name: string;
        phoneNumber: string;
        residentialCollege: string;
        gender: string;
        year: string;
        livingType: string;
        major: string;
        roommateStatus: string;
        lookingFor: any;
        bringingItems: any;
        bio: string;
      }) => {
        return await prisma.user.upsert({
          where: { email: args.email },
          update: {
            name: args.name,
            phoneNumber: args.phoneNumber,
            residentialCollege: args.residentialCollege,
            gender: args.gender,
            year: args.year,
            livingType: args.livingType,
            major: args.major,
            roommateStatus: args.roommateStatus,
            lookingFor: args.lookingFor,
            bringingItems: args.bringingItems,
            bio: args.bio,
          },
          create: {
            email: args.email,
            name: args.name,
            phoneNumber: args.phoneNumber,
            residentialCollege: args.residentialCollege,
            gender: args.gender,
            year: args.year,
            livingType: args.livingType,
            major: args.major,
            roommateStatus: args.roommateStatus,
            lookingFor: args.lookingFor,
            bringingItems: args.bringingItems,
            bio: args.bio,
            role: "USER",
          },
        });
      },
    }
};
