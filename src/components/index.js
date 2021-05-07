import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export default function NewsList(props) {

  const classes = useStyles();
  const [data, setData] = React.useState(props.newsList);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('asc');

  React.useEffect(()=> {
    setData(props.newsList);
  }, [props.newsList])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleNavigation = (url) => {
    window.open(url);
  }

  const handleSearch =(value) => {
    const search = value.toLowerCase();
    if(value) {
      let arr = props.newsList.filter(obj =>obj.title.toLowerCase().includes(search) || obj.description.toLowerCase().includes(search));
      setData(arr);

    } else {
      setData(props.newsList)
    }
  }

  const handleSort = () => {
    if(order === 'asc') {
      setOrder('desc');
      setData(data.sort((a, b) => {
        const da = new Date(a.publishedAt);
        const db = new Date(b.publishedAt);
        return da - db;
    }));
      return;
    }
    if(order === 'desc') { 
      setOrder('asc');
      setData(data.sort((a, b) => {
        const da = new Date(a.publishedAt);
        const db = new Date(b.publishedAt);
        return db - da;
    }));
      return;
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xl={12}>
            <TextField id="standard-basic" label="Search" onChange={(e) => handleSearch(e.target.value)} />
          </Grid>
          <Grid item md={12}>

            {data && !!data.length && <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>

                    <TableSortLabel
        
               onClick={() => handleSort()}
            >
              Date
            
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
            </TableSortLabel>

                    </TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row) => (
                    <TableRow key={row.publishedAt} >
                      <TableCell component="th" scope="row">
                        <img src={row.urlToImage} width="50" height="50" />
                      </TableCell>
                      <TableCell>{row.source.name}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{moment(row.publishedAt).format('DD-MM-YYYY HH:MM')}</TableCell>
                      <TableCell><Button variant="contained" onClick={()=>handleNavigation(row.url) }>{row.url}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                     // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}


function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
