module.exports = (req, res, next) => {
    const { user } = req.session;

    if (!user) {
        return res.redirect("/login");
    }

    res.locals.user = user;
    return next();
};

/*
module.exports = (req, res, next) => {
    // user not logged in
    if (!req.session.user) res.redirect("/login");
    // user has a session
    next();
}

module.exports = (req, res, next) => {
    if (!req.session.user) res.redirect('/login');
    res.locals.user = req.session.user;
    next();
*/