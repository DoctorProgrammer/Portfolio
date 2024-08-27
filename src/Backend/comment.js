const express = require('express');
const cors = require('cors');
const MYSQL = require('mysql');
const corsOptions = require('./index.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors(corsOptions));

// Connect to the database once when the application starts

router.get('', cors(corsOptions), async (req, res) => {
    const SQL = 'SELECT * FROM comments';

    try {
        const RESULT = await sqlQuery(SQL);
        res.send(RESULT);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('', cors(corsOptions), async (req, res) => {
    const comment = req.body;
    const prename = comment.prename;
    const name = comment.name;
    const author = prename + ' ' + name;
    const initials = prename.charAt(0) + name.charAt(0);

    const newComment = {
        id: -1,
        reference: comment.reference,
        author: author,
        initials: initials,
        content: comment.content
    };

    const SQL = `INSERT INTO comments (reference, author, initials, content) VALUES ('${newComment.reference}', '${newComment.author}', '${newComment.initials}', '${newComment.content}')`;

    const RESULT = await sqlQuery(SQL);

    // send all comments back
    const SELECT = 'SELECT * FROM comments';
    const COMMENTS = await sqlQuery(SELECT);
    res.send(COMMENTS);
});

router.get('/:id', cors(corsOptions), async (req, res) => {
    const id = parseInt(req.params.id);

    const SQL = `SELECT * FROM comments WHERE id = ${id}`;

    const RESULT = await sqlQuery(SQL);

    if (RESULT.length === 0) {
        res.status(404).send({ error: 'Comment not found' });
    } else {
        res.send(RESULT[0]);
    }
});

router.delete('/:id', cors(corsOptions), async (req, res) => {
    const id = parseInt(req.params.id);

    const SQL = `DELETE FROM comments WHERE id = ${id}`;

    const RESULT = await sqlQuery(SQL);

    if (RESULT.affectedRows === 0) {
        res.status(404).send({ error: 'Comment not found' });
    } else {
        res.status(204).send();
    }
});

router.put('/:id', cors(corsOptions), async (req, res) => {
    const id = parseInt(req.params.id);
    const comment = req.body;

    const SQL = `UPDATE comments SET content = '${comment.content}' WHERE id = ${id}`;

    const RESULT = await sqlQuery(SQL);

    if (RESULT.affectedRows === 0) {
        res.status(404).send({ error: 'Comment not found' });
    } else {
        res.status(204).send();
    }
});

async function sqlQuery(SQL) {
    return new Promise((resolve, reject) => {
        const CONNECTION = MYSQL.createConnection({
            host: process.env.MYSQL_HOST || "localhost", // comments.azavokeh.dbs.hostpoint.internal
            database: process.env.MYSQL_DATABASE || "comments", // azavokeh_comments
            user: process.env.MYSQL_USER || "root", // azavokeh_root
            password: process.env.MYSQL_PWD || "MysRob04." // Das Passwort, welches auf dem Server gesetzt wurde (Datenbanken> Datenbankbenutzer> Bearbeiten)
        });

        CONNECTION.connect((err) => {
            if (err) {
                reject(err);
                return;
            }

            CONNECTION.query(SQL, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                CONNECTION.end();
            });
        });
    });
}

module.exports = [
    router
];
