function dataController (req, res) {
    res.json({
        catName: "Mimi",
        sister: "Ushe",
        count: req.count
    });
};

module.exports = { dataController };