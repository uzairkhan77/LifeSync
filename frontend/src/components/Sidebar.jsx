import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import InboxComponent from "./InboxComponent";
import ContactComponent from "./ContactComponent";
import { TodoWrapper } from "./tasks/TodoWrapper";
import EventsComponent from "./EventsComponent";
import NotesComponent from "./NotesComponent";
import  { useEffect, useRef, useContext } from 'react'
import NewsComponent from "./NewsComponent";
import Tooltip from "@mui/material/Tooltip";
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [title, setTitle] = React.useState("LifeSync");

    // ... (existing code)

    useEffect(() => {
      // Load the selected category from localStorage on component mount
      const savedCategory = localStorage.getItem("selectedCategory");
      setSelectedCategory(savedCategory || "To-do"); // Set a default category value here
  
      // Optionally, if you want to set the document title on initial load:
      updateDocumentTitle(savedCategory || "To-do");
  
      // Optionally, load the selected component on initial load:
      setSelectedComponent(getSavedComponent(savedCategory));
    }, []);
  
    // ... (existing code)
  
    const handleMenuItemClick = (component) => {
      setSelectedComponent(component.component);
      setSelectedCategory(component.text);
  
      // Save the selected category to localStorage when a new tab is clicked
      localStorage.setItem("selectedCategory", component.text);
  
      // Update the document title when a new tab is clicked:
      updateDocumentTitle(component.text);
    };
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
    };

  

  const handleTitleChange = (component) => {
    document.title = component ? `${component.text} - LifeSync` : "LifeSync";
    console.log(component.text);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getSavedComponent = (savedCategory) => {
    const componentMap = {
      // Add your component mapping here, based on the savedCategory
      "To-do": <TodoWrapper />,
      "Events": <EventsComponent />,
      "Notes": <NotesComponent />,
      "Contacts": <ContactComponent />,
    };
    return componentMap[savedCategory] || null;
  };
  
  // Function to update the document title based on the selected component
  const updateDocumentTitle = (selectedCategory) => {
    document.title = selectedCategory ? `${selectedCategory} - LifeSync` : "LifeSync";
  };

  // const handleMenuItemClick = (component) => {
  //   setSelectedComponent(component.component); // Store the selected menu item object
  //   setSelectedCategory(component.text);
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#8758ff", zIndex: 10000 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            LifeSync
          </Typography>
           {/* Logout button at the right corner */}
           <div className='nav__btns d-flex align-items-center gap-2' style={{ marginLeft: 'auto' }}>
          {
                           user ? <> <h5 className='mb-0' style={{color: 'white'}}>{user.username}</h5>
                                 <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                              </> : <>
                                 <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                 <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                              </>
                        }          </div>
                        
                     <span className="mobile__menu" onClick={toggleMenu}>
                        <i class="ri-menu-line"></i>
                     </span>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Home",
              component: <InboxComponent />,
              icon: <HouseRoundedIcon />,
            },
            {
              text: "Daily News",
              component: <NewsComponent />,
              icon: <NewspaperRoundedIcon />,
            },
            {
              text: "To-do",
              component: <TodoWrapper />,
              icon: <ChecklistRtlRoundedIcon />,
            },
            {
              text: "Events",
              component: <EventsComponent />,
              icon: <CalendarMonthRoundedIcon />,
            },
            {
              text: "Notes",
              component: <NotesComponent />,
              icon: <DescriptionRoundedIcon />,
            },
            {
              text: "Contacts",
              component: <ContactComponent />,
              icon: <PermContactCalendarRoundedIcon />,
            },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.text} placement="right">
                <ListItemButton
                  onClick={() => {
                    handleMenuItemClick(item);
                    handleTitleChange(item);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: selectedCategory === item.text ? "white" : "#8758ff", // Set the initial text color based on selection
                    backgroundColor:
                      selectedCategory === item.text
                        ? "#8758ff"
                        : "transparent", // Set the initial background color based on selection
                    "&:hover": {
                      backgroundColor:
                        selectedCategory === item.text
                          ? "#8758ff"
                          : "rgba(0, 0, 0, 0.04)", // Adjust hover background color based on selection
                      color: "white", // Change the text color when hovering over any item
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#8758ff",
                      ...(selectedCategory === item.text && { color: "white" }),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedComponent} {/* Render the selected component */}
      </Box>
    </Box>
  );
}
