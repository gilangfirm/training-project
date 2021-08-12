import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import { Drawer, List, CssBaseline, Divider, Collapse, IconButton, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BasePage from '../../../../app/BasePage';
import listMenu from "./menuItems.json";
import { Layout } from "../Layout"

const drawerWidth = 220;

const useStyles = makeStyles((theme) => {
  console.log('theme', theme)
  return ({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 6,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
});

function SideMenu({ user }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isParent = (item) => {
    const { children } = item;
    if (children === undefined || children.length === 0) {
      return Child(item)
    }
    return Parent(item);
  }

  const Child = (item) => {
    const history = useHistory();
    return (
      <List>
        <ListItem button onClick={() => history.push(item.to)}>
          <ListItemIcon style={{ paddingLeft: 12 }}><i className={`fa ${item.icon}`} /></ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      </List>
    );
  };

  const Parent = (item) => {
    const { children } = item;
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
    return (
      <React.Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon style={{ paddingLeft: 12 }}><i className={`fa ${item.icon}`} /></ListItemIcon>
          <ListItemText primary={item.title} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, key) =>
              isParent(child)
            )}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };


  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {!open ?
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            :
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          }
        </div>
        <Divider />
        {listMenu[user?.roles[0] === 1 ? 'admin' : 'user'].map((item) => isParent(item))}
        <List>
          <ListItem button onClick={() => history.push('/logout')}>
            <ListItemIcon style={{ paddingLeft: 12 }}><i class="fa fa-power-off" aria-hidden="true"></i></ListItemIcon>
            <ListItemText primary={"Sign out"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {/* <Layout> */}
        <BasePage />
        {/* </Layout> */}
      </main>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({ user: auth.user })

export default connect(mapStateToProps)(SideMenu)