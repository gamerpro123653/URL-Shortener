const { Url } = require('../model/url.model');
const urlValidator = require('../validators/url.validator');
const { v4: uuidv4 } = require('uuid');
const uniqid = require('uniqid');
const fetch = require('node-fetch');

require('dotenv').config();


async function createNewURL(req, res, next) {
    try {
        const { originalURL } = req.body;

        if (!urlValidator.validateUrl(originalURL)) {
            return res.status(400).send("Invalid URL");
        }

        let url = await Url.findOne({
            originURL : originalURL
        });

        if (url) {
            return res.status(200).json({
                "result": url.shortURL
            });
        }

        const urlID = uniqid();

        const shortURL = `${process.env.BASE_URL}/${urlID}`;

        let newUrlDocument = new Url({
            "urlID" : urlID,
            "originURL" : originalURL,
            "shortURL" : shortURL,
            "createdDate" : Date.now().toString(),
        })

        await newUrlDocument.save();
        
        res.status(201).json({
            "result" : shortURL
        });

    } catch (err) {
        next(err);
    }
}


async function accessURL(req, res, next) {
    try {
        let shortURLID = req.params['id'];

        let urlDocument = await Url.findOneAndUpdate({
            urlID: shortURLID
        }, {
            $inc : { accessCounts : 1}
        });

        if (!urlDocument) { return res.status(400).render('error'); }

        res.render('index');
        
    } catch (err) {
        next(err);
    }
}


async function requestURL(req, res, next) {
    try {
        const inputToken = req.body['input-token'];
        const urlID = req.params['id'];

        let verifyRecapchaResult = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.SECRET_GOOGLE_RECAPCHA}&response=${inputToken}`
        });

        let jsonVerifyRecapcha = await verifyRecapchaResult.json();

        if (jsonVerifyRecapcha.success === "false") {return res.status(400).render('main');} 
        
        let urlDocument = await Url.findOneAndUpdate({
            urlID: urlID
        }, {
            $inc : { finishRecapchaCounts : 1}
        });

        if (!urlDocument) {return res.status(400).render("error"); }

        return res.redirect(urlDocument.originURL);

    } catch (err) {
        next(err);
    }
}


module.exports = {
    createNewURL,
    accessURL,
    requestURL,
}

