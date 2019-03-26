const { User } = global.App.Components;

module.exports.register = async (req, res) => {
    try {
        req.body.role = req.params.role;
        const user = await User.create(req.body);
        res.status(200);
        res.json(user);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};