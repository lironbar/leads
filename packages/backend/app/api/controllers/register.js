const { Auth } = global.App.Modules;

module.exports.register = (req, res) => {
    req.body.role = req.params.role;
    Auth.register(req.body)
        .then(user => {
            res.status(200);
            res.json(user);
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};