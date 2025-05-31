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

app.post('/create-user', (req, res) => {
    const { email, password, username } = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ success: false, message: 'Invalid JSON format' });
        }

        const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);

        const newUser = {
            id: maxId + 1,
            email: email,
            password: password,
            username: username,
            role: "user",
            passportData: "",
            phoneNumber: "",
            publicKey: "",
            creationDate: new Date().toISOString(),
            additionalData: []
        };

        const existingUser = users.find(u=> {
            return u.email === email || u.username === username
        });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with that email or username already exists' });
        }

        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("WRITE ERROR:", writeErr);
                return res.status(500).json({ success: false, message: 'Failed to save user' });
            }

            res.status(201).json({ success: true, user: newUser });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));