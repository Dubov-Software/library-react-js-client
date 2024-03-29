import { observable, runInAction, transaction } from 'mobx';
import axios from 'axios';
import { SERVER_URL } from '../Config';
import { makeAutoObservable } from 'mobx';
import { getBooks, updateBook, deleteBook } from '../Api';
import parseISO from 'date-fns/parseISO';

export interface Book {
  id: string;
  title: string;
  author: string;
  publication_date: Date;
}

const DEFAULT_BOOK: Book = {
  id: '',
  title: '',
  author: '',
  publication_date: new Date(),
};

class BooksStore {
  books = observable<Book>([]);
  isOpen = observable.box<boolean>(false);
  loading = observable.box<boolean>(false);
  currentBook = observable<Book>(DEFAULT_BOOK);

  constructor() {
    makeAutoObservable(this);
  }

  async getData() {
    try {
      runInAction(() => this.loading.set(true));
      const result = await getBooks();
      if (!!result?.data?.length) {
        runInAction(() => {
          this.loading.set(false);
          this.books.replace(
            result.data.map((currentBook) => ({
              ...currentBook,
              publication_date: parseISO(currentBook.publication_date),
            }))
          );
        });
      }
    } catch (e) {
      console.error('Store::getData', { e });
    }
  }

  async saveBook(draft: Book) {
    if (draft?.id?.length === 0) {
      this.createBook(draft);
    } else {
      const bookIndex = this.books.findIndex((b) => b.id === draft.id);
      transaction(() => {
        const prev = [...this.books];
        console.log({ prev, draft });
        prev[bookIndex] = draft;
        this.books.replace(prev);
      });
      await updateBook(draft);
    }

    runInAction(() => {
      this.isOpen.set(false);
    });
  }

  editMode = (id: string) => {
    transaction(() => {
      const b = this.books.find((book) => book.id === id);
      console.log({ b });
      this.currentBook = { ...this.currentBook, ...b };

      this.isOpen.set(true);
      console.log(`Entering book edit mode - see object -`, this.isOpen);
    });
  };

  async deleteBook(id: string) {
    this.books.replace(this.books.filter((curBook) => curBook.id !== id));
    await deleteBook(id);
  }

  async createBook(bookObj: Book) {
    const res = await axios.post(SERVER_URL + '/books', { ...bookObj, id: undefined });
    if (!!res.data) {
            runInAction(() => {
                this.books.replace([
                    ...this.books,
                    { ...res.data, publication_date: parseISO(res.data.publication_date) }
                ]);
            });
        }
    }

    newBook = () => {
        transaction(() => {
            this.currentBook = {...DEFAULT_BOOK};
            this.isOpen.set(true);
        });
    }
}

export default BooksStore;