const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

const secretString = 'secretString123'

module.exports = {
    authLogin: async (req, res) => {
        const { user, password } = req.body;
        if (user !== 'shacosu' || password !== '1234') return res.status(404).send('Usuario NO autenticado')
        const token = jwt.sign({
            user,
            email: 'text@example.com',
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
        }, secretString);
        const serielizedToken = serialize('myToken', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'none',
            secure: false,
        })
        res.setHeader('Set-Cookie', serielizedToken);
        return res.send('Usuario autenticado!!!')
    },
}