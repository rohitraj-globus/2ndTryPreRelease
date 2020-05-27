// eslint-disable-next-line no-undef
const { Client } = require('pg');
const express = require('express');
require('dotenv').config();
const jsforce = require('jsforce');

const { SF_USERNAME, SF_PASSWORD } = process.env;
if (!(SF_USERNAME && SF_PASSWORD)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
});
conn.login(SF_USERNAME, SF_PASSWORD, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});

module.exports = app => {
    // put your express app logic here
    app.use(express.json());

    app.get('/data/products', (req, res) => {
        var products = [];

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect();

        client.query(
            'select rohitraj__category__c,name,rohitraj__product_id__c,rohitraj__picture_url__c,rohitraj__price__c,rohitraj__picture_url_1__c,rohitraj__picture_url_2__c,rohitraj__Banner_Order__c,sfid from salesforce.rohitraj__product__c;',
            (err, data) => {
                if (err) console.log(err);
                products = data.rows.map(productRecord => {
                    return {
                        id: productRecord.rohitraj__product_id__c,
                        sfid: productRecord.sfid,
                        name: productRecord.name,
                        price: '₹' + productRecord.rohitraj__price__c,
                        quantity: 0,
                        category: productRecord.rohitraj__category__c,
                        banner_order: productRecord.rohitraj__banner_order__c,
                        picture: 'https://drive.google.com/uc?export=view&id=' + productRecord.rohitraj__picture_url__c,
                        picture2: 'https://drive.google.com/uc?export=view&id=' + productRecord.rohitraj__picture_url_1__c,
                        picture3: 'https://drive.google.com/uc?export=view&id=' + productRecord.rohitraj__picture_url_2__c
                        
                    };
                });
                res.json(products);
                client.end();
            }
        );
    });

    app.post('/data/placeOrder', (req, res) => {
        conn.apex.post('/placeOrder/', req.body, (err, data) => {
            if (err) {
                console.error(err);
            }
            res.json(data);
        });
    });
};
