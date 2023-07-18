import { CognitoUserPool } from "amazon-cognito-identity-js";

const cognitoConfig = {
  UserPoolId: "ca-central-1_k8uXodi51",
  ClientId: "6cmm0p46q0ujo89fos02esf6f8",
};

export default new CognitoUserPool(cognitoConfig);
