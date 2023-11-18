"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Courses_1 = __importDefault(require("../db/Courses"));
router.get('/', async (req, res) => {
    console.log("Hi");
    const course = await Courses_1.default.find();
    if (!course)
        res.json({ message: "Error finding any course" });
    return res.json(course);
});
router.get('/:id', async (req, res) => {
    const courseId = req.params.id; // Get the course ID from the URL params
    try {
        const course = await Courses_1.default.findById(courseId); // Use findById to find a course by ID
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.json(course);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
