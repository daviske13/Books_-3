import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) 
        {
            token
            user 
        
            {
                id
                username
                email
            }
        }
    }
';

// export const GET_USER = gql`
// {
//     GetUser($userId: ID!) {
//         getUser(userId: $userId) {
//           id
//           username
//           email
//         }
//       }
// }
// `;