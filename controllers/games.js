const { writeData } = require('../utils');

const addGameController = async (req, res) => {
    req.isNew = !Boolean(req.games.find(item => item.title === req.body.title));

    if (req.isNew) {
        const inArray = req.games.map(item => Number(item.id));
        let maximalId;

        if (inArray.length > 0) {
            maximalId = Math.max(...inArray);
        } else {
            maximalId = 0;
        }

        req.updatedObject = {
            id: maximalId + 1,
            title: req.body.title,
            image: req.body.image,
            link: req.body.link,
            description: req.body.description
        };

        req.games = [...req.games, req.updatedObject];
    } else {
        console.log(req.games);
        res.send({ status: 'error', message: 'Игра с таким именем уже есть.' });

        return;
    }

    await writeData('./data/games.json', req.games);

    res.send({
        games: req.games,
        updated: req.updatedObject
    });
}

const sendAllGames = async (req, res) => {
    res.send(req.games);
}

const sendUpdatedGames = (req, res) => {
    res.send({
        games: req.games,
        updated: req.updatedObject
    });
};

module.exports = {
    sendAllGames,
    addGameController,
    sendUpdatedGames,
}