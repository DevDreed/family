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
