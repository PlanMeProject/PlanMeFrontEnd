

import React, { useState} from "react";
import { Box, Flex, Select , useColorModeValue} from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  // Your event data here
];

const CustomEvent = ({ event }) => (
  <div
    style={{
      backgroundColor: '#6678b4',
      color: '#ffffff',
      padding: '8px',
      borderRadius: '5px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}
  >
    {event.title}
  </div>
);

const CustomToolbar = (toolbar) => {
  const buttonStyle = {
    ...toolbarButtonStyle,
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        color: '#0b1437',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
        {toolbar.label}
      </div>
      <div>
        <button
          style={buttonStyle}
          onClick={() => toolbar.onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          style={buttonStyle}
          onClick={() => toolbar.onNavigate('PREV')}
        >
          Back
        </button>
        <button
          style={buttonStyle}
          onClick={() => toolbar.onNavigate('NEXT')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const toolbarButtonStyle = {
  background: 'none',
  borderRadius: '4px',
  color: '#0b1437',
  cursor: 'pointer',
  marginRight: '15px',
  padding: '8px',
  transition: 'background 0.3s ease, color 0.3s ease',
};


const UserReports = () => {
  const [view, setView] = useState('month');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Custom function to get day properties
  const dayPropGetter = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    // Example: Set different background colors for today and weekends
    let backgroundColor = 'inherit';
    if (isToday) {
      backgroundColor = 'rgba(159,157,157,0.61)'; // Color for today
    } else if (isWeekend) {
      backgroundColor = 'rgba(159,157,157,0.28)'; // Color for weekends
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Box mt="4">
        <Flex mb="4" justify="space-between" align="center">
           <Select
            value={view}
            onChange={(e) => handleViewChange(e.target.value)}
            width="150px"
            marginRight="4"
            // Customize the background color of the options here
            color={useColorModeValue('#0b1437', '#ffffff')}
            bg={useColorModeValue('#ffffff', '#1a202c')}
            borderRadius="4px"
            _focus={{ boxShadow: '0 0 0 1px #6678b4' }}
          >
            <option value="month" style={{ backgroundColor: '#1a202c', color: '#ffffff' }}>
              Month
            </option>
            <option value="week" style={{ backgroundColor: '#1a202c', color: '#ffffff' }}>
              Week
            </option>
          </Select>
        </Flex>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          views={{
            month: true,
            week: true,
          }}
          view={view}
          dayPropGetter={dayPropGetter} // Set the dayPropGetter function
        />
      </Box>
    </Box>
  );
};

export default UserReports;


