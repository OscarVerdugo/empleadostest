const Personal = require('../models/personal.js');

const PersonalController = {};

PersonalController.getpersonalmany = async (req, res, next) => {
    const personalmany = await Personal.find();
    res.json(personalmany);
};

PersonalController.createpersonal = async (req, res, next) => {
    Personal.save();
};   

PersonalController.getpersonaluno = async (req, res, next) => {

};   

PersonalController.editpersonal = async (req, res, next) => {

};   

PersonalController.deletepersonal = async (req, res, next) => {

};   
module.exports = PersonalController;