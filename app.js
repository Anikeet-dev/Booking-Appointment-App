const myForm = document.querySelector('#my-form');
const userName = document.querySelector('#username');
const contactInput = document.querySelector('#phNumber');
const emailId = document.querySelector('#email');
const userList = document.getElementById('users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (userName.value === '' || contactInput.value === '') {
        alert('Please enter fields!');
    } else {
        const userDetails = {
            userName: userName.value,
            contact: contactInput.value,
            emailId: emailId.value,
        };

        axios.post("http://localhost:3000/user/add-user", userDetails)
            .then((response) => {
                const responseData = response.data;
                setTimeout(() => {
                    axios.get("http://localhost:3000/user/get-users")
                        .then((response) => {
                            console.log('Received Users:', response);
                            showUsersOnScreen(response.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }, 0);

                clearInputs();
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/user/get-users")
        .then((response) => {
            console.log('Received Users:', response);
            showUsersOnScreen(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
});

function showUsersOnScreen(users) {
    userList.innerHTML = '';

    if (Array.isArray(users)) {

        users.forEach((userItem) => {
            const listItem = document.createElement('li');
            const userElement = document.createElement('span');
            userElement.textContent =
                userItem.username + ', ' +
                userItem.contact + ',' +
                userItem.email;

            listItem.appendChild(userElement);
            userList.appendChild(listItem);

            deleteButton(listItem, userItem);
            editButton(listItem, userItem);
        });
    } else if (users && typeof users === 'object') {
        const userArray = users.allUsers || [];
        userArray.forEach((userItem) => {
            const listItem = document.createElement('li');
            const userElement = document.createElement('span');
            userElement.textContent =
                userItem.username + ', ' +
                userItem.contact + ',' +
                userItem.email;

            listItem.appendChild(userElement);
            userList.appendChild(listItem);

            deleteButton(listItem, userItem);
            editButton(listItem, userItem);
        });
    }
}


//Deleting user from user list.
function deleteButton(user, userItem) {
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = function () {
        user.remove();

        const apiUrl = `http://localhost:3000/user/delete-user/${userItem.id}`;
        axios.delete(apiUrl)
            .then((response) => {
                console.log('User deleted:', response.data);
            })
            .catch((err) => {
                console.error('Error deleting user:', err);
            });
    };

    // Styling Delete Button
    deleteBtn.style.backgroundColor = 'light-grey';
    deleteBtn.style.borderColor = 'grey';
    deleteBtn.style.borderRadius = '3px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.right = '65px';
    deleteBtn.style.padding = '5px';

    user.appendChild(deleteBtn);
}

// Edit Button 
function editButton(user, userItem) {
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';

    editBtn.onclick = function () {

        const apiUrl = `http://localhost:3000/user/get-user/${userItem._id}`;
        axios.get(apiUrl)
            .then((response) => {
                const userItem = response.data;

                userName.value = userItem.username;
                contactInput.value = userItem.contact;
                emailId.value = userItem.email;

                myForm.removeEventListener('submit', onSubmit);
                myForm.addEventListener('submit', onUpdate);

                user.remove();
            })
            .catch((err) => {
                console.error('Error getting user for edit:', err);
            });
    };

    // Styling Edit Button
    editBtn.style.backgroundColor = 'light-grey';
    editBtn.style.borderColor = 'grey';
    editBtn.style.borderRadius = '3px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.position = 'absolute';
    editBtn.style.right = '10px';
    editBtn.style.padding = '5px 12px';

    user.appendChild(editBtn);
}

function onUpdate(e) {
    e.preventDefault();

    const updatedDetails = {
        userName: userName.value,
        contact: contactInput.value,
        emailId: emailId.value,
    };

    const apiUrl = `http://localhost:3000/user/add-user/${userItem._id}`;
    axios.put(apiUrl, updatedDetails)
        .then((response) => {

            console.log('User updated:', response.data);
        })
        .catch((err) => {
            console.error('Error updating user:', err);
        });

    myForm.removeEventListener('submit', onUpdate);
    myForm.addEventListener('submit', onSubmit);

    clearInputs();
}



//clearing inputs
function clearInputs() {

    userName.value = '';
    contactInput.value = '';
    emailId.value = '';
}
