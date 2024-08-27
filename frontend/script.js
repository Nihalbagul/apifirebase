const API_URL = 'http://localhost:5000/api/users';

// Handle form submission
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const healthGoals = document.getElementById('healthGoals').value;

    const user = { name, email, age, weight, height, healthGoals };

    if (id) {
        // Update existing user
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert('User updated successfully!');
            clearForm();
            getUsers();  // Refresh the user list after updating
        } else {
            alert('Error updating user');
        }
    } else {
        // Create new user
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert('User created successfully!');
            clearForm();
            getUsers();  // Refresh the user list after creating
        } else {
            alert('Error creating user');
        }
    }
});

// Function to fetch and display all users
async function getUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();

    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Clear the current list

    users.forEach((user) => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Age: ${user.age}</p>
            <p>Weight: ${user.weight} kg</p>
            <p>Height: ${user.height} cm</p>
            <p>Health Goals: ${user.healthGoals}</p>
            <button onclick="editUser('${user.id}')">Edit</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
            <hr>
        `;
        usersList.appendChild(userDiv);
    });
}

// Function to delete a user
async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('User deleted successfully!');
        getUsers(); // Refresh the user list after deletion
    } else {
        alert('Error deleting user');
    }
}

// Function to edit a user
async function editUser(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const user = await response.json();

    // Populate the form with the user's current data
    document.getElementById('user-id').value = id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age;
    document.getElementById('weight').value = user.weight;
    document.getElementById('height').value = user.height;
    document.getElementById('healthGoals').value = user.healthGoals;

    // Change the button text to "Update User"
    document.getElementById('submit-btn').innerText = 'Update User';
}

// Function to clear the form and reset it for creating a new user
function clearForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('healthGoals').value = '';
    document.getElementById('submit-btn').innerText = 'Create User';
}

// Add event listener to "Get All Users" button
document.getElementById('get-users-btn').addEventListener('click', getUsers);

// Fetch and display users when the page loads
getUsers();
