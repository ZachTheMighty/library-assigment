const myLibrary = [];

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
  this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.haveRead ? "read" : "not read yet"}`;
};

function addBookToLibrary(title, author, numOfPages, haveRead) {
  let book = new Book(title, author, numOfPages, haveRead);
  myLibrary.push(book);
}

function displayBook() {
  const library = document.querySelector("main");

  myLibrary.forEach((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book");

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("title");
    bookTitle.textContent = `${book.title}`;

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = `${book.author}`;

    let bookNumOfPages = document.createElement("div");
    bookNumOfPages.classList.add("num-of-pages");
    bookNumOfPages.textContent = `${book.numOfPages}`;

    let bookRead = document.createElement("div");
    bookRead.classList.add("read");
    bookRead.textContent = `${book.haveRead}`;

    bookContainer.append(bookTitle);
    bookContainer.append(bookAuthor);
    bookContainer.append(bookNumOfPages);
    bookContainer.append(bookRead);

    library.append(bookContainer);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

displayBook();
