const myForm = document.querySelector('#my-form');
const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const genderInput = document.querySelector('#gender');
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
        // localStorage.setItem('FirstName', firstName.value);
        // localStorage.setItem('LastName', lastName.value);
        // localStorage.setItem('Gender', genderInput.value);
        // localStorage.setItem('Date', dateInput.value);
        // localStorage.setItem('Contact', contactInput.value);
        const userDetails = {
            firstName: firstName.value,
            lastName: lastName.value,
            gender: genderInput.checked ? 'Male' : 'Female',
            date: dateInput.value,
            contact: contactInput.value
        };

        let userDetails_serialized = JSON.stringify(userDetails);

        localStorage.setItem(firstName.value, userDetails_serialized);

        // let userDetails_deserialized = JSON.parse(localStorage.getItem('userDetails'));

        const user = document.createElement('li');

        user.innerHTML =
            userDetails.firstName + ', ' +
            userDetails.lastName + ', ' +
            userDetails.gender + ', ' +
            userDetails.date + ', ' + 
            '+91 ' + userDetails.contact;

        const userKey = firstName.value;

        //Delet Button
        const deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';

        //styling Delete Button
        deleteBtn.style.backgroundColor = 'light-grey';
        deleteBtn.style.borderColor = 'grey';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.right = '65px';
        deleteBtn.style.padding = '5px';

        //Deleting user from local storage and user list.
        deleteBtn.onclick = function () {
            user.remove();
            localStorage.removeItem(userKey);
        };

        user.appendChild(deleteBtn);
        

        //Edit Button
        const editBtn = document.createElement('input');
        editBtn.type = 'button';
        editBtn.value = 'edit';

        //styling edit Button
        editBtn.style.backgroundColor = 'light-grey';
        editBtn.style.borderColor = 'grey';
        editBtn.style.borderRadius = '3px';
        editBtn.style.cursor = 'pointer';
        editBtn.style.position = 'absolute';
        editBtn.style.right = '10px';
        editBtn.style.padding = '5px 12px';
        
        

        editBtn.onclick = function () {
            const storedUserDetails = JSON.parse(localStorage.getItem(userKey));

            firstName.value = storedUserDetails.firstName;
            lastName.value = storedUserDetails.lastName;
            genderInput.checked = storedUserDetails.gender === 'Male';
            dateInput.value = storedUserDetails.date;
            contactInput.value = storedUserDetails.contact;

            user.remove();
            localStorage.removeItem(userKey);
        };

        user.appendChild(editBtn);

        //Appends new registered user on user list.
        userList.appendChild(user);
        

        //clearing the inputs 
        firstName.value = '';
        lastName.value = '';
        genderInput.checked = false;
        dateInput.value = '';
        contactInput.value = '';

    }
}
