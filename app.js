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
            userDetails.firstName + ' ' +
            userDetails.lastName + ' ' +
            userDetails.gender + ' ' +
            userDetails.date + ' ' +
            userDetails.contact;

        //Delet Button
        const userKey = firstName.value;       
        const deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';

        //styling Delete Button
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.right = '0';
        deleteBtn.style.padding = '5px';
        deleteBtn.style.marginRight = '5px';

        deleteBtn.onclick = function () {
            user.remove();
            localStorage.removeItem(userKey);
        };

        user.appendChild(deleteBtn);
        userList.appendChild(user);

        //clearing the inputs 
        firstName.value = '';
        lastName.value = '';
        genderInput.checked = false;
        dateInput.value = '';
        contactInput.value = '';

    }
}
