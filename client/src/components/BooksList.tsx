import React from 'react';
import { observer } from 'mobx-react';
import BookItem from './BookItem';
import Grid from '@mui/material/Grid';
import BooksStore from '../stores/BooksStore';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { Box } from '@mui/system';

interface Props {
  store: BooksStore;
}

const BooksList: React.FC<Props> = observer(({ store }) => {
  console.log({ books: store.books });
  return (
    <Grid container spacing={1}>
      {!store.loading.get() ? store.books.map((singleBook) => (
        <Grid xs={12} md={4} sm={6} item key={singleBook.id}>
          <BookItem store={store} {...singleBook} />
        </Grid>
      )) : (
        <Grid marginY={3} justifyItems="center" container justifyContent="center" alignContent="center" alignItems="center" xs={12} item>
          <CircularProgress color="primary" />
        </Grid>
      )}
    </Grid>
  );
});

export default BooksList;
