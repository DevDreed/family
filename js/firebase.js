"use strict";

const firebaseCredentials = () => {
    return new Promise((resolve, reject) => {
        $.ajax({method: "GET", url: `apiKeys.json`}).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    });
};

const FbAPI = {
    firebaseCredentials
};

module.exports = FbAPI;
