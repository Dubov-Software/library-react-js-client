import React, { Props } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { observer } from "mobx-react-lite";
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { runInAction } from 'mobx';
import BooksStore from "../stores/BooksStore";

interface BookModalProps {
  store: BooksStore;
}

const BookModal: React.FC<BookModalProps> = observer(({ store }) => {
  console.log({ store });
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const save = () => {

    let isValid = true;

    if (store.currentBook?.title?.length <= 0) {
      setTitleError("Title can't be empty");
      isValid = false;
    }

    if (!!store.currentBook?.publication_date) {
      setDateError("Date can't be empty");
      isValid = false;
    }

    if (isValid) store.saveBook(store.currentBook);
  };

  const handleClose = () => {
    store.isOpen.set(false)
    setTitleError("");
    setDateError("");
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={store.isOpen.get() || false}
      onClose={handleClose}
    >
      <Stack
        sx={{ backgroundColor: "#fff", height: "100vh" }}
        padding={2}
        spacing={3}
      >
        <Typography variant="h5">Edit book</Typography>
        <TextField
          inputProps={{
            value: store.currentBook.title
          }}
          onChange={e => runInAction(() => { store.currentBook.title = e.target.value })}
          name="title"
          id="title"
          label="Title"
          variant="outlined"
          placeholder="Name the book"
          error={!!titleError}
        />
        <TextField
          inputProps={{
            value: store.currentBook.author
          }}
          onChange={e => runInAction(() => { store.currentBook.author = e.target.value })}
          name="author"
          id="author"
          label="Author"
          variant="outlined"
          placeholder="Author name"
          error={store.currentBook?.author?.length === 0}
        />
        {titleError.length ? <span>{titleError}</span> : null}
        <MobileDatePicker
          inputFormat="dd/MM/yyyy"
          renderInput={(props) => <TextField variant="outlined" {...props} />}
          InputProps={{
            id: "date-picker-inline"
          }}
          label="Publication date"
          value={store.currentBook.publication_date}
          maxDate={new Date()}
          onChange={(d) => !!d && runInAction(() => { store.currentBook.publication_date = d })}
        />
        {dateError.length ? <span>{dateError}</span> : null}
        <Stack justifyContent="space-around" flexDirection="row">
            <Button fullWidth variant="outlined" color="primary" onClick={save}>
              Save
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
        </Stack>
      </Stack>
    </Modal>
  );
});

export default BookModal;
