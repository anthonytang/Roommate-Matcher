// graphql/schema.ts

export const typeDefs = `
    scalar JSON
    scalar DateTime

    enum Role {
        USER
        ADMIN
    }

    type User {
        id: ID!
        email: String!
        name: String!
        phoneNumber: String!
        residentialCollege: String!
        gender: String!
        year: String!
        livingType: String!
        major: String!
        roommateStatus: String!
        lookingFor: JSON!
        bringingItems: JSON!
        bio: String!
        role: Role!
        answers: QuestionAnswer
        matchResult: MatchResult
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type QuestionAnswer {
        id: ID!
        email: String!
        user: User!
        answers: JSON!
        weights: JSON
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Question {
        id: Int!
        text: String!
        options: JSON!
        category: String!
        createdAt: DateTime!
    }

    type MatchResult {
        id: ID!
        userId: ID!
        matches: JSON!
        createdAt: DateTime!
        user: User!
    }

    type Query {
        getUser(email: String!): User
        getAllUsers: [User!]!
        getQuestionAnswers(email: String!): QuestionAnswer
    }    

    type Mutation {
        submitQuestionAnswers(email: String!, answers: JSON!): QuestionAnswer!
        submitWeights(email: String!, weights: JSON!): QuestionAnswer!
        updateUserInfo(
            email: String!
            name: String!
            phoneNumber: String!
            residentialCollege: String!
            gender: String!
            year: String!
            livingType: String!
            major: String!
            roommateStatus: String!
            lookingFor: JSON!
            bringingItems: JSON!
            bio: String!
        ): User!
    }
    
`