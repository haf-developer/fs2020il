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
  }
})

// const classes = useStyles()

export default useStyles;