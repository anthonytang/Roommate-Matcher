import { gql } from '@apollo/client';

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $email: String!,
    $name: String!,
    $phoneNumber: String!,
    $residentialCollege: String!,
    $gender: String!,
    $year: String!,
    $livingType: String!,
    $major: String!,
    $roommateStatus: String!,
    $lookingFor: JSON!,
    $bringingItems: JSON!,
    $bio: String!
  ) {
    updateUserInfo(
      email: $email,
      name: $name,
      phoneNumber: $phoneNumber,
      residentialCollege: $residentialCollege,
      gender: $gender,
      year: $year,
      livingType: $livingType,
      major: $major,
      roommateStatus: $roommateStatus,
      lookingFor: $lookingFor,
      bringingItems: $bringingItems,
      bio: $bio
    ) {
      id
      email
      name
      phoneNumber
      residentialCollege
      gender
      year
      livingType
      major
      roommateStatus
      lookingFor
      bringingItems
      bio
      updatedAt
    }
  }
`;


export const SUBMIT_ANSWERS = gql`
  mutation SubmitQuestionAnswers(
    $email: String!,
    $answers: JSON!
  ) {
    submitQuestionAnswers(
      email: $email,
      answers: $answers
    ) {
      email
      answers
    }
  }
`;
