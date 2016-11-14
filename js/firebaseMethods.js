"use strict";

let getFamily = (apiKeys) => {
    return new Promise((resolve, reject) => {
        $.ajax({method: 'GET', url: `${apiKeys.databaseURL}/family.json`}).then((response) => {
            console.log('get family response', response);
            let items = [];
            if (response) {
                Object.keys(response).map(key => {
                    response[key].id = key;
                    items.push(response[key]);
                });
            }
            resolve(items);
        }, (error) => {
            console.log(error);
        });
    });
};

const addFamilyMember = (apiKeys, newItem) => {
    return new Promise((resolve, reject) => {
        $.ajax({method: 'POST', url: `${apiKeys.databaseURL}/family.json`, data: JSON.stringify(newItem), dataType: 'json'}).then((response) => {
            console.log("response from POST", response);
            resolve(response);
        }, (error) => {
            console.log(error);
        });
    });
};

const deleteFamilyMember = (apiKeys, itemId) => {
    return new Promise((resolve, reject) => {
        $.ajax({method: 'DELETE', url: `${apiKeys.databaseURL}/family/${itemId}.json`}).then((response) => {
            console.log("response from DELETE", response);
            resolve(response);
        }, (error) => {
            console.log(error);
        });
    });
};

const FbMethods = {
    getFamily,
    addFamilyMember,
    deleteFamilyMember
};

module.exports = FbMethods;
