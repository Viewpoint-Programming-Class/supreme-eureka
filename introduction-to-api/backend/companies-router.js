const express = require('express');
const Router = express.Router();
const FSDB = require('file-system-db');
const db = new FSDB();


async function getAll(){
    let data = await db.get('COMPANIES');
    return data || [];
}

Router.get('/', async (req, res) => {
    let data = await getAll();
    res.send(data);
});

Router.put('/', async (req, res) => {
    let companies = await getAll();
    let companyIndex = companies.findIndex(c => c.id === req.body.id);
    if(!companyIndex) return res.status(404).send(`Company id does not exist`);
    companies[companyIndex] = req.body;
    await db.set('COMPANIES', companies);
    res.redirect(`/?token=${req.query.token}`);
});


Router.post('/', async (req, res) => {
    let companies = await getAll();
    req.body.id = companies.length+1;
    companies.push(req.body);
    await db.set('COMPANIES', companies);
    res.redirect(`/?token=${req.query.token}`);
});



module.exports = Router;