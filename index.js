const myLibrary = [];

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
  const id = crypto.randomUUID();
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.haveRead ? "read" : "not read yet"}`;
};

function addBookToLibrary(title, author, numOfPages, haveRead) {
  let book = Book(title, author, numOfPages, haveRead);
  myLibrary.push(book);
}
