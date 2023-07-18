# s3-file-upload
Small application that allows to upload images to S3 bucket.

## Application Architecture

![S3-upload-diagram](https://github.com/filipflorek/s3-file-upload/assets/52381251/3681dd4f-e158-4bed-b43a-0446435f7a5a)

## Application Setup
To install the application, run the following: `npm install`

To run the application run the following: `npm run dev`

`.env` file needs to be created in the project root folder. The following variables have to be added:
* `VITE_API_ENDPOINT=your-api-gateway-endpoint`
* `VITE_API_KEY=your-api-key`
  
## Amazon Cognito User Management
Because this is a sample app, no self registration functionality was added. User authenticates by username/password credentials. Users should be manually created in Amazon Cognito.

To complete registration, permament password needs to be set. This can be done through CloudShell:
`aws cognito-idp admin-set-user-password --user-pool-id "your-user-pool"  --username "your-user" --password "your-password" --permanent`

## MIS-file-upload additional information
List of created services:
* S3 bucket: `mis-file-upload-demo-bucket`
* Lambda Function: `mis-file-upload-demo-function`
* API: `mis-file-upload-demo-function-REST-API`
* User Pool: `filip-basic-pool`
