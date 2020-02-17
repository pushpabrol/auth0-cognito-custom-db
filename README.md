# Custom database connection with Cognito & Migration turned on

This repo contains the files and insturctions required to setup Cognito as a custom database connection with Auth0.

## Cognito Setup

- Create a user pool in aws cognito
    - For this user pool create an app client
        - This client should have no client secret
        - Make sure to check `Enable username password auth for admin APIs for authentication (ALLOW_ADMIN_USER_PASSWORD_AUTH)`
        - Make sure to select `Legacy` under `Prevent User Existence Errors`
- Make a note of the following properties
    - `UserPoolId` - ID of the user pool
    - `ClientID` - Client ID of the application created above
    - `region` - AWS Region
    - `accessKeyId` - Access Key ID
    - `secretAccessKey` - Secret Access Key


## Auth0 Setup

- Create a custom database connection
    - Create a custom database connection and choose the name you want to use for it
    - Turn on the toggle `Use my own database` under the `Custom Database` tab
    - Under the database `settings` tab turn on toggles for
        - `Requires Username`
        - `Import Users to Auth0` - This enables migration at login with Cognito
    - Go back to the `Custom Database` tab 
        - Copy contents of `auth0LoginDirect.js` under the `Login` script
        - Copy contents of `auth0GetUserDirect.js` under the `Get User` script
    - Make sure you save both the scripts above
    - Remain on the same tab and scroll down to `settings`
        - Set the Confgiuration variables
            - accessKeyId : your access key for AWS
            - secretAccessKey: your secret key for AWS>
            - region : region of aws
            - UserPoolId : Id of the User Pool
            - ClientId : client id of the app created in cognito

    - At this point you have everything setup for the connection
    - Enable the connection in Auth0 by enabling this connection on an application
    - Test login and get user scripts





