import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const iconStyles = {
  fontSize: '24px', // Adjust the icon size as needed
  marginRight: '8px', // Add some spacing between the icon and the message
};
const Alert = React.forwardRef(function Alert(props, ref) {
  const { severity, message } = props; // Destructure the 'message' prop here

  let IconComponent;

  switch (severity) {
    case 'success':
      IconComponent = CheckCircleIcon;
      break;
    case 'error':
      IconComponent = ErrorOutlineIcon;
      break;
    case 'warning':
      IconComponent = WarningAmberIcon;
      break;
    case 'info':
      IconComponent = InfoIcon;
      break;
    default:
      IconComponent = InfoIcon;
      break;
  }

  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      iconMapping={{
        success: <IconComponent style={{ ...iconStyles, color: '#4caf50' }} />,
        error: <IconComponent style={{ ...iconStyles, color: '#f44336' }} />,
        warning: <IconComponent style={{ ...iconStyles, color: '#ff9800' }} />,
        info: <IconComponent style={{ ...iconStyles, color: '#2196f3' }} />,
      }}
      sx={{
        width: '300px',
        fontSize: '17px',
        borderRadius: '5px', // Customize the border radius
        backgroundColor: '#333', // Customize the background color
        color: '#fff', // Customize the text color
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
        zIndex: 9999, // Set a high zIndex value to ensure the alert appears above other elements

      }}
    />
  );
});

export default function CustomizedSnackbars({ severity, message, open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right', marginTop: '100px' }}
      TransitionComponent={TransitionLeft}
    >
      {/* Pass the 'message' prop directly instead of using 'children' */}
      <Alert onClose={onClose} severity={severity} message={message}>
        {message}
      </Alert>
    </Snackbar>
  );
}