import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getAccountDtls, addAccountDtls } from "../apicalls";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  rootCard: {
    minWidth: 270,
    maxWidth: 370,
    marginLeft: "auto",
    marginRight: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold"
  },
  pos: {
    marginBottom: 10,
    fontSize: 12,
    textAlign: "left"
  }
}));

function InputItem(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.paper}>
      <TextField
        id={props.label}
        size="small"
        onChange={text => props.change(text.target.value)}
        value={props.value}
        variant="outlined"
        label={props.label}
        placeholder={props.ph}
      />
    </Grid>
  );
}
function AddCustomerInfoCard(props) {
  const classes = useStyles();
  let [name, setName] = useState("");
  let [num, setNum] = useState("");
  let [addr, setAddr] = useState("");
  let setAccDetail = props?.setAccDetail;
  let setMsg = props?.setMsg;
  let setStatus = props?.setStatus;
  let reset = () => {
    setNum("");
    setName("");
    setAddr("");
  };
  let addingAccount = () => {
    if (num === "" || name === "" || addr === "") {
      setMsg(4);
      setStatus(true);
      return;
    }
    let data = {
      accountNo: num,
      customerName: name,
      customerAddr: addr
    };
    console.log("data: ", data);
    setAccDetail(data, reset);
  };

  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Create Customer Detail
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Add information for customer details
        </Typography>
        <Grid container style={{ marginBottom: 10 }} spacing={3}>
          <InputItem
            label={"Name"}
            value={name}
            change={setName}
            ph={"Ex: Asher"}
          />
          <InputItem
            label={"No."}
            value={num}
            change={setNum}
            ph={"Ex: 1234"}
          />
          <br />
        </Grid>
        <TextField
          label={"Address"}
          multiline
          rows="4"
          value={addr}
          onChange={text => setAddr(text.target.value)}
          helperText="New Line: shift + enter"
          variant="outlined"
          placeholder={"Ex: M1E 234, Canada"}
        />
      </CardContent>
      <CardActions>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button color="primary" onClick={addingAccount}>
            Add
          </Button>
          <Button color="secondary" onClick={() => reset()}>
            Reset
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
function CustomerList(props) {
  const classes = useStyles();
  let accountNo = props?.accountNo;
  let setAccountNo = props?.setAccountNo;
  let user = props?.user;
  return (
    <Card
      className={classes.rootCard}
      style={{
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <CardContent>
        <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
          Customer's List
        </Typography>
        <TextField
          label="Customer search"
          variant="outlined"
          size="small"
          value={accountNo}
          onChange={text => setAccountNo(text.target.value)}
          placeholder="Ex: 1234"
          style={{ width: "100%" }}
        />
        <List
          dense
          style={{
            position: "relative",
            overflow: "auto",
            maxHeight: 300
          }}
          aria-label="customer customer-list"
        >
          {user?.length !== 0 ? (
            user?.map((item, index) => (
              <ListItem key={item.id}>
                <>
                  <ListItemText
                    primary={`Id: ${item?.value}`}
                    secondary={`Name: ${item?.name} Addr: ${item?.address}`}
                  />
                </>
              </ListItem>
            ))
          ) : (
            <ListItem key={0}>
              <ListItemText
                style={{ textAlign: "center" }}
                color="textSecondary"
                primary="No Users / Loading users"
              />
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}
function CustomerDetails() {
  const classes = useStyles();
  let [user, setUsers] = useState([]);
  let [accountNo, setAccountNo] = useState("");
  let [refresh, setRefresh] = useState(false);
  let [accDetail, setAccDetail] = useState(null);
  let [status, setStatus] = useState(false);
  let [msg, setMsg] = useState(-1);
  let resetCallback = () => {};
  let [reset, setReset] = useState(() => {});
  useEffect(()=> {
    if(typeof reset === Function){
      console.log("RESET DONE");
      reset();
    }
  },[reset]);
  useEffect(() => {
    getAccountDtls(accountNo)
      .then(data => {
        console.log(JSON.stringify(data));
        setUsers(JSON.parse(JSON.stringify(data)));
      })
      .catch(err => console.log("Error : ", err));
  }, [accountNo, refresh]);
  useEffect(() => {
    if (accDetail !== null) {
      addAccountDtls(accDetail).then(data => {
        setStatus(true);
        setMsg(1);
        setRefresh(!refresh);
        console.log("Account Added", data);
      });
    }
  }, [accDetail]);
  return (
    <>
      <br />
      <Grid container spacing={7}>
        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.paper}>
          <AddCustomerInfoCard
            setMsg={setMsg}
            setStatus={setStatus}
            setAccDetail={async (data, callback) => {
              await setAccDetail(data);
              await setReset(callback);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CustomerList
            user={user}
            accountNo={accountNo}
            setAccountNo={setAccountNo}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={status}
        autoHideDuration={5000}
        onClose={() => setStatus(false)}
        message={
          msg === 1
            ? "Customer Added "
            : msg === 2
            ? "Reset Customer Form"
            : msg === 3
            ? "Refreshing data"
            : msg === 4
            ? "No fields should be empty"
            : "Something went wrong"
        }
      />
    </>
  );
}

export default CustomerDetails;
