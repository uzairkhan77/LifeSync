import StatBox from './StatBox';
import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, useTheme, Grid, Paper } from '@mui/material';
import { tokens } from './theme';
import ProgressCircle from './ProgressCircle';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
// Import Material-UI Icons
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { PieChart, Pie, Cell, AreaChart, Area } from 'recharts'; // Import Recharts components

import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import Recharts components

const StatBoxCard = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = theme.palette;

  // CSS styles for the ProgressCircle container
  const progressCircleContainerStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  return (
    <Card variant="outlined" style={{ backgroundColor: '#8758ff', color: 'white', position: 'relative' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            {/* {React.cloneElement(icon, { style: { color: 'yellow', fontSize: 30 } })} */}
            <Typography variant="h6" style={{ color: 'white' }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" style={{ color: 'white' }}>
              {subtitle}
            </Typography>
          </div>

        </Box>
        <Box mt={2}>
          <Typography variant="body1" color={colors.text.secondary} style={{ color: 'white' }}>
            updated
          </Typography>
          <Typography variant="body1" color={colors.text.primary} style={{ color: 'white' }}>
            {increase}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};


const InboxComponent = () => {
  const [completedTodoCount, setCompletedTodoCount] = useState(0);
  const [uncompletedTodoCount, setUncompletedTodoCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);

  const data = [
    { name: 'Completed', count: completedTodoCount },
    { name: 'Uncompleted', count: uncompletedTodoCount },
  ];

  // Data for the pie chart
  const pieChartData = [
    { name: 'Completed', value: completedTodoCount },
    { name: 'Uncompleted', value: uncompletedTodoCount },
  ];

   // Data for the area chart (can use same data as bar chart)
   const areaChartData = data;

   // Colors for the pie chart
   const pieChartColors = ['#8884d8', '#82ca9d'];
 
   // CSS styles for the chart containers
   const chartContainerStyle = {
     width: '90%',
     height: 300,
     margin: 'auto',
   };


  // const userId = user.userId; // Get the userId from the user object

  useEffect(() => {
    fetchCompletedTodoCount();
    fetchUncompletedTodoCount();
    fetchTodoCount();
  }, []);

    // Access the user object from AuthContext
    const { user } = useContext(AuthContext);

  const fetchCompletedTodoCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/todos/comp/${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch completed todo count');
      }
      const data = await response.json();
      setCompletedTodoCount(data.count);
    } catch (error) {
      console.error('Failed to fetch completed todo count:', error);
    }
  };
  
  const fetchUncompletedTodoCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/todos/uncomp/${user._id}`);
     if (!response.ok) {
        throw new Error('Failed to fetch uncompleted todo count');
      }
      const data = await response.json();
      setUncompletedTodoCount(data.count);
    } catch (error) {
      console.error('Failed to fetch uncompleted todo count:', error);
    }
  };
  
  const fetchTodoCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/todos/count/${user._id}`);
     if (!response.ok) {
        throw new Error('Failed to fetch todo count');
      }
      const data = await response.json();
      setTodoCount(data.count);
    } catch (error) {
      console.error('Failed to fetch todo count:', error);
    }
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="containter">
    <Box>
      <Box
        py={2}
        color="Black"
        textAlign="center"
      >
        <Typography variant="h4">Todos Analysis</Typography>
      </Box>
      <Box p={9}>
        
        <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Todos"
              subtitle={`Total Count: ${todoCount}`}
              icon={<EventIcon />}
              progress={todoCount > 0 ? 0.85 : 0}
              increase="✔️"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Todos"
              subtitle={`Completed: ${completedTodoCount}`}
              icon={<PersonIcon />}
              progress={completedTodoCount > 0 ? 0.75 : 0}
              increase="✔️"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Todos"
              subtitle={`Uncompleted: ${uncompletedTodoCount}`}
              icon={<LocationOnIcon />}
              progress={uncompletedTodoCount > 0 ? 0.65 : 0}
              increase="✔️"
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={3}>
            <StatBoxCard
              title="Reservations"
              subtitle={`Total Count: ${booking2Count}`}
              icon={<ConfirmationNumberIcon />}
              progress={booking2Count > 0 ? 0.95 : 0}
              increase="+37.4%"
            />
          </Grid> */}
        </Grid>
      </Box>
      {/* Bar Chart */}
      <Box p={2} textAlign="center">
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      {/* Pie Chart */}
      <Box p={2} textAlign="center" style={chartContainerStyle}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {/* Area Chart */}
        <Box p={2} textAlign="center" style={chartContainerStyle}>
          <ResponsiveContainer>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </div>
  );
};

export default InboxComponent;