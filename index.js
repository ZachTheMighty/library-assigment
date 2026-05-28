const myLibrary = [];
const form = document.querySelector("form");

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
  this.id = crypto.randomUUID();
  this.isDisplayed = false;
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
    if (!book.isDisplayed) {
      let bookContainer = document.createElement("div");
      bookContainer.classList.add("book");
      bookContainer.classList.add("hasNoButtons");
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
      book.isDisplayed = true;
    }
  });
}

function addButtons() {
  let bookContainers = document.querySelectorAll(".book");

  bookContainers.forEach((bookContainer) => {
    if (bookContainer.classList.contains("hasNoButtons")) {
      let buttonContainer = document.createElement("div");
      buttonContainer.classList.add("buttons");

      let removeBook = document.createElement("button");
      removeBook.classList.add("remove-book");
      removeBook.textContent = "Remove Book";

      removeBook.addEventListener("click", () => {
        for (let i = 0; i < myLibrary.length; i++)
          if (myLibrary[i].id === bookContainer.getAttribute("data-id")) {
            myLibrary.splice(i, 1);
            bookContainer.remove();
          }
      });

      let toggleRead = document.createElement("button");
      toggleRead.classList.add("toggle-read");
      toggleRead.textContent = "Toggle Read";

      toggleRead.addEventListener("click", () => {
        for (let i = 0; i < myLibrary.length; i++)
          if (myLibrary[i].id === bookContainer.getAttribute("data-id")) {
            myLibrary[i].haveRead = !myLibrary[i].haveRead;

            for (const child of bookContainer.children)
              if (child.classList.contains("read"))
                child.textContent = `${myLibrary[i].haveRead ? "Read" : "Haven't read yet"}`;
          }
      });

      buttonContainer.append(toggleRead);
      buttonContainer.append(removeBook);

      bookContainer.append(buttonContainer);

      bookContainer.classList.remove("hasNoButtons");
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = form.title.value;
  let author = form.author.value;
  let numOfPages = form.numOfPages.value;
  let haveRead = form.haveRead.value;

  addBookToLibrary(title, author, numOfPages, haveRead);
  displayBook();
  addButtons();
});
