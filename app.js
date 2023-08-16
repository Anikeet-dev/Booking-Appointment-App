const myForm = document.querySelector('#my-form');
const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const genderInput = document.querySelector('#gender');
const dateInput = document.querySelector('#date');
const contactInput = document.querySelector('#phNumber');


myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(firstName.value === '' || lastName.value === ''){
        alert('Please enter fields !');
     }
     else{
        localStorage.setItem('FirstName', firstName.value);
        localStorage.setItem('LastName', lastName.value);
        localStorage.setItem('Gender', genderInput.value);
        localStorage.setItem('Date', dateInput.value);
        localStorage.setItem('Contact', contactInput.value);

     }
}