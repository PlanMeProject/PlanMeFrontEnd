// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import Usa from "assets/img/dashboards/usa.png";

// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";

import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up momentLocalizer
const localizer = momentLocalizer(moment);

// Example data for events
const events = [
  {
    title: 'Meeting 1',
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 11, 0),
  },
  {
    title: 'Meeting 2',
    start: new Date(2023, 10, 16, 14, 0),
    end: new Date(2023, 10, 16, 15, 0),
  },
  // Add more events as needed
];

// Custom event component
const CustomEvent = ({ event }) => (
  <div
    style={{
      backgroundColor: useColorModeValue('#6678b4', '#fdfdfd'),
      color: useColorModeValue('#ffffff', '#091435'),
      padding: '8px',
      borderRadius: '5px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    }}
  >
    {event.title}
  </div>
);

// Custom toolbar component
const CustomToolbar = (toolbar) => (
  <div
    style={{
      backgroundColor: useColorModeValue('#6678b4', '#fdfdfd'),
      color: useColorModeValue('#ffffff', '#091435'),
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
      {/* Apply hover effect to the buttons */}
      <button
        style={{
          background: 'none',
          borderRadius: '4px',
          color: useColorModeValue('#ffffff', '#091435'),
          cursor: 'pointer',
          marginRight: '15px',
          padding: '8px',
          transition: 'background 0.3s ease',
        }}
        onClick={toolbar.onNavigate.bind(null, 'TODAY')}
        // Add hover effect
        onMouseOver={(e) => (e.target.style.background = '#33425d')}
        onMouseOut={(e) => (e.target.style.background = 'none')}
      >
        Today
      </button>
      <button
        style={{
          background: 'none',
          borderRadius: '4px',
          color: useColorModeValue('#ffffff', '#091435'),
          cursor: 'pointer',
          marginRight: '15px',
          padding: '8px',
          transition: 'background 0.3s ease',
        }}
        onClick={toolbar.onNavigate.bind(null, 'PREV')}
        // Add hover effect
        onMouseOver={(e) => (e.target.style.background = '#33425d')}
        onMouseOut={(e) => (e.target.style.background = 'none')}
      >
        Back
      </button>
      <button
        style={{
          background: 'none',
          borderRadius: '4px',
          color: useColorModeValue('#ffffff', '#091435'),
          cursor: 'pointer',
          padding: '8px',
          transition: 'background 0.3s ease',
        }}
        onClick={toolbar.onNavigate.bind(null, 'NEXT')}
        // Add hover effect
        onMouseOver={(e) => (e.target.style.background = '#33425d')}
        onMouseOut={(e) => (e.target.style.background = 'none')}
      >
        Next
      </button>
    </div>
  </div>
);

const UserReports = () => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Box mt="4">
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
        />
      </Box>
    </Box>
  );
};

export default UserReports;
