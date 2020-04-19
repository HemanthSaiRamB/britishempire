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
    Snackbar,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    FormHelperText
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {getDropDetails, addAppTypeDtls} from "../apicalls";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    rootCard: {
      minWidth: 270,
      maxWidth: 370,
      marginLeft: "auto",
      marginRight: "auto",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: "theme.palette.text.secondary"
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
  function AddApplTypeCard(props) {
    const classes = useStyles();
    let [name, setName] = useState("");
    let setAppType = props?.setAppType;
    let setMsg = props?.setMsg;
    let setStatus = props?.setStatus;
    let reset = () => {
      setName("");
    };
    let addingAppType = () => {
      if (name === "") {
        setMsg(4);
        setStatus(true);
        return;
      }
      let data = {
        typeLabel: name,
      };
      console.log("data: ", data);
      setAppType(data, reset);
    };
  
    return (
      <Card className={classes.rootCard}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Create {props.dropTypeRoute} Type 
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Add information for {props.dropTypeRoute} Type Details
          </Typography>
          <Grid container style={{ marginBottom: 10 }} spacing={3}>
            <InputItem
              label={"Name"}
              value={name}
              change={setName}
              ph={"Ex: X"}
            />
            <br />
          </Grid>
        </CardContent>
        <CardActions>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button color="primary" onClick={addingAppType}>
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
  function AddApplTypeDropCard(props) {
    const classes = useStyles();
    let [drop,setDrop]=useState("")
    let [dropArr,setDropArr]=useState([])
    let [name, setName] = useState("");
    let setAppType = props?.setAppType;
    let setMsg = props?.setMsg;
    let setStatus = props?.setStatus;
    useEffect(()=> {
        var bodyData={
            [props.bodyKey]:""
        }
        getDropDetails(bodyData,props.parentRoute).then(data=>{
            setDropArr(data)
        })
      },[])
  
    console.log(dropArr)
    let reset = () => {
      setName("");
    };
    let addingAppType = () => {
      if (name === "" || drop==="") {
        setMsg(4);
        setStatus(true);
        return;
      }
      let data = {
        [props.parentKey]:drop,
        typeLabel: name,
      };
      console.log("data: ", data);
      setAppType(data, reset);
    };
    let setDropValue=(event)=>{
        setDrop(event.target.value)
    }   
    return (
      <Card className={classes.rootCard}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Create {props.dropTypeRoute} Type 
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Add information for {props.dropTypeRoute} Type Details
          </Typography>
          <Grid container style={{ marginBottom: 10 }} spacing={3}>
          <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{props.parent}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={drop}
                onChange={setDropValue}
                >
                   {dropArr.map(drop=>(
                         <MenuItem 
                         style={{ display: "flex", alignItems: "center" }}
                         key={drop.id} 
                         value={drop.id}>
                             {drop.value}
                         </MenuItem>
                    ))}
                }
                
                </Select>
            </FormControl>
            <InputItem
              label={"Name"}
              value={name}
              change={setName}
              ph={"Ex: X"}
            />
            <br />
          </Grid>
        </CardContent>
        <CardActions>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button color="primary" onClick={addingAppType}>
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
  
function CreateAppType(){
    const classes = useStyles();
    let [appType, setAppType] = useState(null);
    let [dropTypeRoute,setDropTypeRoute]= useState(null);
    let [dropType,setDropType]= useState(null);
    let [refresh, setRefresh] = useState(false);
    let [msg, setMsg] = useState(-1);
    let [status, setStatus] = useState(false);
    let resetCallback = () => {};
    let [reset, setReset] = useState(() => {});
    useEffect(()=> {
        if(typeof reset === Function){
          console.log("RESET DONE");
          reset();
        }
      },[reset]);
    useEffect(() => {
        if (appType !== null) {
            addAppTypeDtls(appType,dropTypeRoute).then(data => {
            setStatus(true);
            setMsg(1);
            setRefresh(!refresh);
            console.log("App Type  Added", data);
          }).catch(err=>{
              console.log(err)
          });
        }
      }, [appType]);
      return(
          <>
          <br />
          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.paper}>
          <AddApplTypeCard
           dropTypeRoute='Appliance'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('applncType')
                await setDropType('Appliance')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <AddApplTypeCard
            dropTypeRoute='Nozzle'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
              await setDropTypeRoute('nozzleNoType')
              await setDropType('Nozzle')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          </Grid>
         
          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.paper}>
          <AddApplTypeCard
           dropTypeRoute='Filter Size'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('airFilterSizeType')
                await setDropType('Filter Size')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <AddApplTypeCard
            dropTypeRoute='Current Level'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
              await setDropTypeRoute('currentLevel')
              await setDropType('Current Level')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          </Grid>
         
          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.paper}>
          <AddApplTypeCard
           dropTypeRoute='Capacity'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('capacity')
                await setDropType('Capacity')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <AddApplTypeDropCard
          bodyKey="key"
          parentKey='applncId'
          parentRoute='applncDropDown'
          parent='Appliance Type'
           dropTypeRoute='Manufacturer'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('manufType')
                await setDropType('Manufacturer')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
        
          </Grid>
         
          <Grid container spacing={7}>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.paper}>
          <AddApplTypeDropCard
          bodyKey="applncId"
          parentKey='manufId'
           parentRoute='manufDropDown'
          parent='Manufacturer'
           dropTypeRoute='Model No'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('modelNoType')
                await setDropType('Model No')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <AddApplTypeDropCard
          bodyKey="manufId"
          parentKey='modelNoId'
           parentRoute='modelNoDropDown'
          parent='Model No'
           dropTypeRoute='Serial No'
            setMsg={setMsg}
            setStatus={setStatus}
            setAppType={async (data, callback) => {
                await setDropTypeRoute('serialNoType')
                await setDropType('Serial No')
              await setAppType(data);
              await setReset(callback);
            }}
          />
          </Grid>
          </Grid>
          <Snackbar
        open={status}
        autoHideDuration={5000}
        onClose={() => setStatus(false)}
        message={
          msg === 1
            ? `${dropType} Type Added `
            : msg === 2
            ? `Reset ${dropType} Type Form`
            : msg === 3
            ? "Refreshing data"
            : msg === 4
            ? "No fields should be empty"
            : "Something went wrong"
        }
      />
          </>
      )
}
  export default CreateAppType;

