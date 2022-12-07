function accessMain(req, res, next) {
    try {
        res.render('main');
    } catch (err) {
        next(err);
    }
}


module.exports = {
    accessMain
}
