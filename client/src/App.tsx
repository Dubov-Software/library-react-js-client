import React from 'react';
import BooksList from './components/BooksList';
import Credit from './components/Credit';
import Header from './components/Header';
import BookModal from './components/BookModal';
import BooksStore from './stores/BooksStore';
import { observer } from 'mobx-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { runInAction, transaction } from 'mobx';

const store = new BooksStore();
store.getData();

const App = observer(() => {
    return (
        <Container sx={{ paddingY: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                <Header />
                <BooksList store={store} />
                <Credit />
                <BookModal store={store} />
            </LocalizationProvider>
            <Fab onClick={e => store.newBook()} sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Container>
    );
});

export default App;