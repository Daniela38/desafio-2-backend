import { Router } from 'express';
import userModel from '../dao/models/users.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    }
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
})

router.post('/login', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (!userEmail) return res.status(400).send({ status: "error", error: "User does not exists" });
    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "User exists but password is incorrect" });
    }
    if (user) {
        let userRole = false;
        if (email.includes("admin")) {
            userRole = true;
        }
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: userRole
    }

    res.send({ status: "success", payload: req.session.user, message: "Successfully login" });
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({status: 1, message: "Successfully logout"})
});

export default router;