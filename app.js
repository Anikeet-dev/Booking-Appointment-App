const myForm = document.querySelector('#my-form');
const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const dateInput = document.querySelector('#date');
const contactInput = document.querySelector('#phNumber');
const userList = document.getElementById('users');



myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (firstName.value === '' || lastName.value === '') {
        alert('Please enter fields !');
    }
    else {

        const userDetails = {
            firstName: firstName.value,
            lastName: lastName.value,
            date: dateInput.value,
            contact: contactInput.value
        };

        axios.post("https://crudcrud.com/api/6f3b328c8ed94aee820289f5c6260497/appointmentData", userDetails)
            .then((response) => {
                const responseData = response.data;
                const user = document.createElement('li');

                user.innerHTML =
                    responseData.firstName + ', ' +
                    responseData.lastName + ', ' +
                    responseData.date + ', ' +
                    '+91 ' + responseData.contact;

                const userKey = firstName.value;

                deleteButtton(user, responseData._id);
                editButton(user, userKey);

                //Appends new registered user on user list.
                userList.appendChild(user);

                clearInputs();
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/6f3b328c8ed94aee820289f5c6260497/appointmentData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                showUsersOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

function showUsersOnScreen(userItem) {
    const listItem = document.createElement('li');
    const userElement = document.createElement('span');
    userElement.textContent =
        userItem.firstName + ', ' +
        userItem.lastName + ', ' +
        userItem.date + ', ' +
        '+91 ' + userItem.contact;

    listItem.appendChild(userElement);
    userList.appendChild(listItem);

    deleteButtton(listItem, userItem);
    editButton(listItem, userItem.firstName);
}


//Deleting user from user list.
function deleteButtton(user, userItem) {

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = function () {
        user.remove();

        const apiUrl = `https://crudcrud.com/api/6f3b328c8ed94aee820289f5c6260497/appointmentData/${userItem._id}`;
        axios.delete(apiUrl);

    };
    //styling Delete Button
    deleteBtn.style.backgroundColor = 'light-grey';
    deleteBtn.style.borderColor = 'grey';
    deleteBtn.style.borderRadius = '3px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.right = '65px';
    deleteBtn.style.padding = '5px';

    user.appendChild(deleteBtn);
};

//Edit Button 
function editButton(user, userKey) {
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'edit';

    editBtn.onclick = function () {
        const storedUserDetails = JSON.parse(localStorage.getItem(userKey));

        firstName.value = storedUserDetails.firstName;
        lastName.value = storedUserDetails.lastName;
        dateInput.value = storedUserDetails.date;
        contactInput.value = storedUserDetails.contact;

        user.remove();
        localStorage.removeItem(userKey);
    };
    //styling edit Button
    editBtn.style.backgroundColor = 'light-grey';
    editBtn.style.borderColor = 'grey';
    editBtn.style.borderRadius = '3px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.position = 'absolute';
    editBtn.style.right = '10px';
    editBtn.style.padding = '5px 12px';


    user.appendChild(editBtn);
};


//clearing inputs
function clearInputs() {

    firstName.value = '';
    lastName.value = '';
    dateInput.value = '';
    contactInput.value = '';
}
