function getUser(username, callback) {
    // This script should retrieve a user profile from your existing database,
    // without authenticating the user.
    // It is used to check if a user exists before executing flows that do not
    // require authentication (signup and password reset).
    //
    // There are three ways this script can finish:
    // 1. A user was successfully found. The profile should be in the following
    // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.
    //     callback(null, profile);
    // 2. A user was not found
    //     callback(null);
    // 3. Something went wrong while trying to reach your database:
    //     callback(new Error("my error message"));

    
    //define the user attributes you want to retrieve
    const userParameters =  ["email", "email_verified", "custom:designation"];
    const AWS = require('aws-sdk@2.593.0');
    AWS.config.update({ "accessKeyId": configuration.accessKeyId, "secretAccessKey": configuration.secretAccessKey, "region": configuration.region });
    const cognito = new AWS.CognitoIdentityServiceProvider();

    cognito.adminGetUser({
        UserPoolId: configuration.UserPoolId,
        Username: username
    }, (err, data) => {
        if (err) {
            //console.log(err);
            if (err.code === "UserNotFoundException") return callback(null);
            else callback(err);
        }
        else {
            //console.log(data);
            if (data.code === "UserNotFoundException") return callback(null);
            else {
                let profile = {
                    "user_id": data.UserAttributes.find(item=>item.Name==="sub").Value,
                    "username": data.Username,
                };
                userParameters.forEach(parameterName => {
                    profile[parameterName] = data.UserAttributes.find(item=>item.Name===parameterName).Value;
                });
                return callback(null, profile);
            }
        }

    });

}
