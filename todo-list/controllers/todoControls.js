/**

 post /remaining
 delete /remaining/:id
 put /remaining

 */

const Task = require("../models/tableTask");

exports.addNewTask = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newRow = await Task.create({
      name,
      description,
      completed: false,
    });
    res.status(201).json({ id: newRow.id, message: "Task added!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error saving the task!" });
  }
};

exports.removeTask = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Task.destroy({
      where: {
        id,
      },
    });
    res.status(201).json({ message: "Task removed!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error removing the task!" });
  }
};

exports.completeTask = async (req, res, next) => {
  const id = req.body.id;
  try {
    await Task.update(
      {
        completed: true,
      },
      {
        where: { id },
      }
    );
    res.status(201).json({ message: "Task marked as completed!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error completing the task!" });
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const entries = await Task.findAll();
    res.status(201).json({ entries });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error fetching tasks!" });
  }
};
