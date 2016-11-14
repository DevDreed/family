(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

const FbAPI = require('./firebase');
const FbMethods = require('./firebaseMethods');

let apiKeys = {};

function putFamilyInDOM() {
    FbMethods.getFamily(apiKeys).then(function(items) {
        $('#family-list').html("");
        items.map((item) => {
            console.log('item', item);
            let familyHTML = `<div class="col-xs-6"><div>Name: ${item.name}</div>`;
            familyHTML += `<div>Age: ${item.age}</div>`;
            familyHTML += `<div>Age: ${item.gender}</div>`;
            familyHTML += `<div>Skills: `;
            familyHTML += item.skills.map(skill => {
                return skill;
            }).join(', ');
            familyHTML += "</div>";
            familyHTML += `<button class="btn btn-danger col-xs-6 delete" data-fbid="${item.id}">Delete</button> `;
            familyHTML += "</div>";
            $('#family-list').append(familyHTML);
        });
    });
}

$(document).ready(function() {

    FbAPI.firebaseCredentials().then(function(keys) {
        console.log("keys", keys);
        apiKeys = keys;
        firebase.initializeApp(apiKeys);
        putFamilyInDOM();
    });

    $('#add-member').on('click', function(e) {
        e.preventDefault();
        let newItem = {
            name: $('#name').val(),
            age: $('#age').val(),
            gender: $("input:radio[name='gender']:checked").val(),
            skills: $('#skills').val().split(",")
        };

        FbMethods.addFamilyMember(apiKeys, newItem).then(function() {
            putFamilyInDOM();
        });
    });

    $('#family-list').on('click', '.delete', function() {
        console.log("this", $(this));
        let itemId = $(this).data("fbid");

        FbMethods.deleteFamilyMember(apiKeys, itemId).then(function() {
            putFamilyInDOM();
        });
    });
});

},{"./firebase":1,"./firebaseMethods":2}]},{},[3]);
