import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { formatDate } from "../Helpers";
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Stack from '@mui/material/Stack';
import format from 'date-fns/format'
import BooksStore, { Book } from '../stores/BooksStore';

type BookItemProps = Book & {
  store: BooksStore
}

const BookItem: React.FC<BookItemProps> = ({ id, title, publication_date, author, store }) => {
  return (
    <Card className="book-item">
      <CardContent>
        <Typography textAlign="left" variant="h6">{title}</Typography>
        <Typography textAlign="left" variant="body1">{author}</Typography>
        <Typography textAlign="left" variant="body2">{!!publication_date ? format(publication_date, 'dd/MM/yyyy') : "N/A"}</Typography>
        <CardActions>
          <Stack alignItems="space-between" flexDirection="row">
            <Button fullWidth startIcon={<ModeEditIcon />} onClick={e => store.editMode(id)}>
              Edit
            </Button>
            <Button fullWidth startIcon={<DeleteForeverIcon />} onClick={e => store.deleteBook(id)}>
              Delete
            </Button>
          </Stack>
          
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BookItem;