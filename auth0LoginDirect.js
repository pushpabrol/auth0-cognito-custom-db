function login(username, password, callback) {
 

    global.fetch = require('node-fetch@2.6.0');
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js@3.0.14');
    const poolData = {
        UserPoolId: configuration.UserPoolId,
        ClientId: configuration.ClientId

    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    });
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            //console.log(result);
            var idTokenPayload = result.getIdToken().payload;
            console.log(idTokenPayload);
            let { sub, aud, event_id, token_use, auth_time, iss, exp, iat, ...rest } = idTokenPayload;
            callback(null, { user_id: sub, username: idTokenPayload["cognito:username"], ...rest });
        },
        onFailure: (function (err) {
            return callback(new WrongUsernameOrPasswordError(username))
        })
    });
}
