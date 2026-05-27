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
    bookContainer.setAttribute("data-id", `${book.id}`);

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("title");
    bookTitle.textContent = `${book.title}`;

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = `By ${book.author}`;

    let bookNumOfPages = document.createElement("div");
    bookNumOfPages.classList.add("num-of-pages");
    bookNumOfPages.textContent = `${book.numOfPages} Pages`;

    let bookRead = document.createElement("div");
    bookRead.classList.add("read");
    bookRead.textContent = `${book.haveRead ? "Read" : "Haven't read yet"}`;

    bookContainer.append(bookTitle);
    bookContainer.append(bookAuthor);
    bookContainer.append(bookNumOfPages);
    bookContainer.append(bookRead);

    library.append(bookContainer);
  });
}

function addButtons() {
  let bookContainers = document.querySelectorAll(".book");

  bookContainers.forEach((bookContainer) => {
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons");

    let removeBook = document.createElement("button");
    removeBook.classList.add("remove-book");
    removeBook.textContent = "Remove Book";

    removeBook.addEventListener("click", () => {
      for (let i = 0; i < myLibrary.length; i++)
        if (myLibrary[i].id === bookContainer.getAttribute("data-id"))
          delete myLibrary[i];

      bookContainer.remove();
    });

    let toggleRead = document.createElement("button");
    toggleRead.classList.add("toggle-read");
    toggleRead.textContent = "Toggle Read";

    toggleRead.addEventListener("click", () => {
      for (let i = 0; i < myLibrary.length; i++)
      {
        if (myLibrary[i].id === bookContainer.getAttribute("data-id"))
          myLibrary[i].haveRead = !myLibrary[i].haveRead;

        for(const child of bookContainer.children)
          if(child.classList.contains("read"))
            child.textContent = `${myLibrary[i].haveRead ? "Read" : "Haven't read yet"}`;
      }
    });

    buttonContainer.append(toggleRead);
    buttonContainer.append(removeBook);

    bookContainer.append(buttonContainer);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

displayBook();
addButtons();
