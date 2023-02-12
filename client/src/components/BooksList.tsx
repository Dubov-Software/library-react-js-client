import React from 'react';
import { observer } from 'mobx-react';
import BookItem from './BookItem';
import Grid from '@mui/material/Grid';
import BooksStore from '../stores/BooksStore';

interface Props {
  store: BooksStore;
}

const BooksList: React.FC<Props> = observer(({ store }) => {
  console.log({ books: store.books });
  return (
    <Grid container spacing={1}>
      {store.books.map((singleBook) => (
        <Grid xs={12} md={4} sm={6} item key={singleBook.id}>
          <BookItem store={store} {...singleBook} />
        </Grid>
      ))}
    </Grid>
  );
});

export default BooksList;
