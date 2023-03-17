const addBookBtn = document.querySelector('#addBookBtn');
const bookModal = document.querySelector('#bookModal');
const booksGrid = document.querySelector('.books-grid');
const addForm = document.querySelector('#add-form');
const closeNodes = document.querySelectorAll('.close');
const nameInput = document.getElementById('book-name');
const authorInput = document.getElementById('author-name');
const numPagesInput = document.getElementById('num-pages');
const nameInputError = document.getElementById('book-name-error');
const authorInputError = document.getElementById('author-name-error');
const numPagesInputError = document.getElementById('num-pages-error');

const {body} = document;

addBookBtn.addEventListener('click', ()=>{
    bookModal.style.display = 'block'
    body.style.overflow = 'hidden';
})

function clearInputFields(){
    const inputFields = document.querySelectorAll('.input');
    const checkbox = document.querySelector('.already-read');
    inputFields.forEach(input => {
        // eslint-disable-next-line no-param-reassign
        input.value = ""
    })
    checkbox.checked = false;
}

function clearErrorMessages(){
    const errorMessagesNodes = [nameInputError, authorInputError, numPagesInputError];
    errorMessagesNodes.forEach(error=>{
        // eslint-disable-next-line no-param-reassign
        error.style.display = 'none';
    })
}

function closeModal(){
    bookModal.style.display = 'none'
    body.style.overflow = 'auto';

    clearInputFields()
    clearErrorMessages();
}

closeNodes.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        closeModal()
    })
})

function Book(name, authorName, numPages, alreadyRead) {
    // Book constructor
    this.name = name;
    this.authorName = authorName;
    this.numPages = numPages;
    this.alreadyRead = alreadyRead;
}

const libraryArr = [new Book('The Great Gatsby', 'F. Scott Fitzgerald', 208, true), new Book('The Davinci Code', 'Dan Brown', 208, false)];

function renderBook(book){
    const el = document.createElement('div');
    el.classList.add('book');
    el.textContent = book.name;
    // eslint-disable-next-line no-unused-expressions
    book.alreadyRead ? el.classList.add('completed') : el.classList.add('not-completed');

    //  Create overlay + card content
    const elOverlay = document.createElement('div');
    const deleteBookBtn = document.createElement('button');
    const editBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('fa-solid', 'fa-trash', 'fa-lg');
    editBookBtn.classList.add('fa-solid', 'fa-pen-to-square', 'fa-lg')
    elOverlay.appendChild(deleteBookBtn);
    elOverlay.appendChild(editBookBtn);
    elOverlay.classList.add('card-overlay');
    el.appendChild(elOverlay);

    el.addEventListener('mouseover', ()=>{
        elOverlay.style.display = 'flex';
    })
    el.addEventListener('mouseout', ()=>{
        elOverlay.style.display = 'none';
    })

    deleteBookBtn.addEventListener('click', ()=>{
        const index = libraryArr.indexOf(book);
        libraryArr.splice(index, 1);
        booksGrid.removeChild(el);
    })

    editBookBtn.addEventListener('click', ()=>{
       if (book.alreadyRead){
        el.classList.remove('completed');
        el.classList.add('not-completed');
       }else{
        el.classList.remove('not-completed');
        el.classList.add('completed');
       }
       // eslint-disable-next-line no-param-reassign
       book.alreadyRead = !book.alreadyRead;

    })

    booksGrid.appendChild(el);
}

libraryArr.forEach(book => {
    renderBook(book);
});

function addToLibrary(book) {
    // Function to add book to library
    libraryArr.push(book);
    return libraryArr;
}

function submitForm(e){
    e.preventDefault();
    if (!addForm.checkValidity()){
        // eslint-disable-next-line no-use-before-define
        toggleErrors()
    }else{
        const formData = new FormData(e.target);

        const getCheckboxVal = formData.get('already-read');
        const checkChecked = !!getCheckboxVal;

        const createdBook = new Book(formData.get('book-name'), formData.get('author-name'), +formData.get('num-pages'), checkChecked)
        addToLibrary(createdBook);
        renderBook(createdBook);
        closeModal();
    }
    
}

addForm.addEventListener('submit', submitForm)


function toggleErrors(){
    nameInputError.style.display = !nameInput.validity.valid ? 'block' : 'none';
    authorInputError.style.display = !authorInput.validity.valid ? 'block' : 'none';
    numPagesInputError.style.display = !numPagesInput.validity.valid ? 'block' : 'none';
}




