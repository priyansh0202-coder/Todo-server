const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');



router.post('/signup', authController.auth);

router.post('/login', authController.login)
router.post('/todo', authController.todo)
router.get('/fetch', authController.fetchTodoList)
router.delete('/deleteTodo', authController.deleteTodo)
router.put("/editTodo", authController.editTodo)



module.exports = router;