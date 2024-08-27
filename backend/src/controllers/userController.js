const usersCollection = require('../config/firestore');
const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res) => {
  try {
    const { name, email, age, weight, height, healthGoals } = req.body;
    const id = uuidv4();
    const createdAt = new Date();

    await usersCollection.doc(id).set({
      id,
      name,
      email,
      age,
      weight,
      height,
      healthGoals,
      createdAt,
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const snapshot = await usersCollection.get();
    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await usersCollection.doc(id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, weight, height, healthGoals } = req.body;

    const userDoc = await usersCollection.doc(id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await usersCollection.doc(id).update({
      name,
      email,
      age,
      weight,
      height,
      healthGoals,
    });

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDoc = await usersCollection.doc(id).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await usersCollection.doc(id).delete();
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
