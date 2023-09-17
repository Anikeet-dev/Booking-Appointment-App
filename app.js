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

        axios.post("https://crudcrud.com/api/1e5195dd03804c66b5d7cc3d5340b52f/appointmentData", userDetails)
            .then((response) => {
                const responseData = response.data;
                const user = document.createElement('li');

                user.innerHTML =
                    responseData.firstName + ', ' +
                    responseData.lastName + ', ' +
                    responseData.date + ', ' +
                    '+91 ' + responseData.contact;

                const userKey = responseData;

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
    axios.get("https://crudcrud.com/api/1e5195dd03804c66b5d7cc3d5340b52f/appointmentData")
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
    editButton(listItem, userItem);
}


//Deleting user from user list.
function deleteButtton(user, userItem) {

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = function () {
        user.remove();

        const apiUrl = `https://crudcrud.com/api/1e5195dd03804c66b5d7cc3d5340b52f/appointmentData/${userItem._id}`;
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
function editButton(user, userItem) {
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';

    editBtn.onclick = function () {

        const apiUrl = `https://crudcrud.com/api/1e5195dd03804c66b5d7cc3d5340b52f/appointmentData/${userItem._id}`;
        axios.get(apiUrl)
            .then((response) => {
                const userItem = response.data;

                firstName.value = userItem.firstName;
                lastName.value = userItem.lastName;
                dateInput.value = userItem.date;
                contactInput.value = userItem.contact;

                myForm.removeEventListener('submit', onSubmit);
                myForm.addEventListener('submit', onUpdate);

                user.remove();
            })
            
    };

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
        firstName: firstName.value,
        lastName: lastName.value,
        date: dateInput.value,
        contact: contactInput.value,
    };

    const apiUrl = `https://crudcrud.com/api/1e5195dd03804c66b5d7cc3d5340b52f/appointmentData/${userItem._id}`;
    axios.put(apiUrl, updatedDetails)
        .then((response) => {
  
            console.log('Appointment updated:', response.data);
        })
        .catch((err) => {
            console.error('Error updating appointment:', err);
        });

    myForm.removeEventListener('submit', onUpdate);
    myForm.addEventListener('submit', onSubmit);

    clearInputs();
}



//clearing inputs
function clearInputs() {

    firstName.value = '';
    lastName.value = '';
    dateInput.value = '';
    contactInput.value = '';
}
