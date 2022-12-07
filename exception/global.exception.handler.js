function globalExHandler(err, req, res, next) {
    console.log(err);
    res.status(500).render('main');
}

module.exports = {
    globalExHandler
};