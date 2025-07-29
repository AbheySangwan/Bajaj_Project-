const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const fullName = "Abhey_Sangwan";
const dob = "11102003";
const email = "abhey@gmail.com";
const rollNumber = "1149";

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const input = req.body.data;
        if (!Array.isArray(input)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let allAlphaChars = [];

        input.forEach(item => {
            const str = String(item);
            if (/^[0-9]+$/.test(str)) {
                if (parseInt(str) % 2 === 0) {
                    even_numbers.push(str);
                } else {
                    odd_numbers.push(str);
                }
                sum += parseInt(str);
            } else if (/^[a-zA-Z]+$/.test(str)) {
                alphabets.push(str.toUpperCase());
                allAlphaChars.push(...str);
            } else {
                special_characters.push(str);
            }
        });

        // Reversed concatenation
        let concat_string = allAlphaChars.reverse()
            .map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
            .join('');

        const response = {
            is_success: true,
            user_id: `${fullName.toLowerCase()}_${dob}`,
            email: email,
            roll_number: rollNumber,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('BFHL API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
