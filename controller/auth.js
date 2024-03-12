const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const auth = (req, res) => {

    const db = req.app.get('db')
    const { email, name, password } = req?.body
    const selectQuery = `SELECT * FROM user WHERE email = ?`

    db.query(selectQuery, [email], (err, data) => {

        if (err) return res.status(500).json("database error");
        if (data.length > 0) return res.status(400).json("user is already exists!")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const insertQuery = "INSERT INTO user(`name`,`email`,`password`) VALUES (?)"
        const values = [
            name,
            email,
            hash,
        ]
        db.query(insertQuery, [values], (err, data) => {
            console.log(data);
            if (err) return res.status(500).json(err);
            return res.status(200).json("user ha been created ")
        })
    })
}

const login = (req, res) => {

    const db = req.app.get('db')
    const { email } = req.body
    const selectQuery = `SELECT * FROM user WHERE email = ?`

    db.query(selectQuery, [email], (err, data) => {
        console.log(data)
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("user not found!")

        //check password

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if (!isPasswordCorrect)
            return res.status(400).json("wrong username or password")

        const token = jwt.sign({ id: data[0].id }, "jwtkey")
        const { password, ...other } = data[0]
        res.status(200).json({ data: { token, name: data[0]?.name, email: data[0]?.email, user_Id: data[0].id } })
    })

}

const todo = (req, res) => {
    const db = req.app.get('db');
    const { title, user_Id } = req.body;

    // Check if the title is provided
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const insertQuery = "INSERT INTO todo (title, user_Id) VALUES (?)";
    const values = [title, user_Id];

    db.query(insertQuery, [values], (err, data) => {
        // console.log(values)
        if (err) {
            console.error("Error adding todo:", err);
            return res.status(500).json({ error: "An error occurred while adding todo" });
        }
        return res.status(200).json("Todo has been added successfully");
    });
};

const fetchTodoList = (req, res) => {
    const db = req.app.get('db');
    const value = req.query.user_Id
    // console.log("value", value)
    // console.log("req.query", req.query)
    const selectQuery = `SELECT * FROM todo WHERE user_Id = ? `

    db.query(selectQuery, [value], (err, data) => {
        // console.log(data)
        if (err) {
            console.error("todo error while fecting the data", err);
            return res.status(500).json({ error: "an error occured fecting the data" })
        }
        return res.status(200).json(data)
    })
}

const deleteTodo = (req, res) => {
    const db = req.app.get('db');
    const { id, user_Id } = req.query

    const deleteQuery = `DELETE FROM todo WHERE id = ? AND user_Id = ?`

    db.query(deleteQuery, [id, user_Id], (err, data) => {
        // console.log(data)
        if (err) {
            console.error("error while fecthing todo ", err)
            return res.status(500).json({ error: "error delete todo" })
        }
        return res.status(200).json("Todo has been deleted successfully ")
    })
}

const editTodo = (req, res) => {
    const db = req.app.get('db')
    const { id, title, user_Id } = req.body

    console.log(req.body)

    const editQuery = `UPDATE todo SET title = ? WHERE id = ? AND user_Id = ?`
    db.query(editQuery, [title, id, user_Id], (err, data) => {
        console.log(data)
        if (err) {
            console.error("error while fetch")
            return res.status(200).json({ error: "error update todo item" })
        }
        return res.status(200).json(data)
    })
}


// Export controller functions
module.exports = {
    auth,
    login,
    todo,
    fetchTodoList,
    deleteTodo,
    editTodo
};