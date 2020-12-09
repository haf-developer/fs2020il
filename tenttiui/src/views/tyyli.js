import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const theme=createMuiTheme(
  {
  }
)

  // const vari=palette.bgcolor

const useStyles = makeStyles({
  root: {
    /*
    display: "flex",
    backgroundColor: theme.palette.grey[200],
  backgroundColor: "#fff",
  backgroundColor: "white",
        */
  color: "white",
  backgroundColor: theme.palette.primary.main,
  },
  tyokalubaari: {
    backgroundColor: theme.palette.primary.main,
  },
  painike: {
    flexGrow: 1,
    marginLeft: "60%",
    backgroundColor: theme.palette.primary.main,
    /*
    justifyContent: "flexend",
    edge: "end",
    */
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      /*
      backgroundColor: "#808080"
      */
    },
  },
  valinta: {
    margin: "1em",
    outlineColor: "Black",
    outlineStyle: "Solid",
    outlineWidth: "1px",
  },
  vanhatvalinnat: {
    width: "80vmax",
    outlineColor: "Black",
    outlineStyle: "Solid",
    outlineWidth: "1px"
  },
  roskis: {
    float: "right"
  },
  valintakentta: {
    alignContent: "Center",
    alignItems: "Center",
    verticalAlign: "Justified",
    backgroundColor: "lightgrey",
    margin: "4px",
    padding: "2px",
    outlineColor: "Black",
    outlineStyle: "Shadow",
    outlineWidth: "1px",
    width: "70vmax"
  },
  tekstilaatikko: {
    margin: "4px",
    width: "50vmax"
  }
})

// const classes = useStyles()

export default useStyles;