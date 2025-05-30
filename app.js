const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const { userData, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

    let searchFunc;
    if (userData.includes("@")) {
        searchFunc = () => users.find(u => u.email === userData && u.password === password);
    } else {
        searchFunc = () => users.find(u => u.username === userData && u.password === password);
    }

    const user = searchFunc();

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));