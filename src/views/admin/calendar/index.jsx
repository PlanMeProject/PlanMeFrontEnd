import React, { useState, useEffect } from "react";
import { Box, Flex, Select, useColorModeValue } from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FixedPlugin from "../../../components/fixedPlugin/FixedPlugin";

const localizer = momentLocalizer(moment);

const Calendar = () => {
    const [tasks, setTasks] = useState([]);
    const [view, setView] = useState('month');

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const loadTasks = () => {
            const selectedSubjectFromStorage = localStorage.getItem('selectedSubjects');

            if (selectedSubjectFromStorage === null) {
                return;
            }

            let selectedSubjects;
            try {
                selectedSubjects = JSON.parse(selectedSubjectFromStorage);
            } catch (e) {
                console.error("Error parsing JSON from localStorage:", e);
                return;
            }

            const courseParams = selectedSubjects.map(course => `courses=${encodeURIComponent(course)}`).join('&');
            const fetchURL = `https://planme-3366bb9023b7.herokuapp.com/api/users/${userId}/tasks/?user_id=${userId}&${courseParams}`;

            fetch(fetchURL)
                .then((response) => response.json())
                .then((data) => {
                    const taskData = data.data;
                    if (taskData) {
                        setTasks(taskData);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        };

        loadTasks();
    }, []);

    const events = tasks.map(task => {
        const dueDate = new Date(task.attributes.due_date);
        return {
            title: task.attributes.title,
            start: dueDate,
            end: dueDate,
            allDay: true
        };
    });

    const CustomEvent = ({ event }) => (
        <div
            style={{
                backgroundColor: useColorModeValue('#0b1437', '#ffffff'),
                color: useColorModeValue('#ffffff', '#0b1437'),
                padding: '3px',
                borderRadius: '5px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                transition: 'background 0.3s ease, color 0.3s ease',
            }}
        >
            <strong>{event.title}</strong>
        </div>
    );

    const CustomToolbar = (toolbar) => (
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
                <button style={toolbarButtonStyle} onClick={() => toolbar.onNavigate('TODAY')}>
                    Today
                </button>
                <button style={toolbarButtonStyle} onClick={() => toolbar.onNavigate('PREV')}>
                    Back
                </button>
                <button style={toolbarButtonStyle} onClick={() => toolbar.onNavigate('NEXT')}>
                    Next
                </button>
            </div>
        </div>
    );

    const toolbarButtonStyle = {
        background: 'none',
        borderRadius: '4px',
        color: '#0b1437',
        cursor: 'pointer',
        marginRight: '15px',
        padding: '8px',
        transition: 'background 0.3s ease, color 0.3s ease',
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const dayPropGetter = (date) => {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

        let backgroundColor = 'inherit';
        if (isToday) {
            backgroundColor = 'rgba(159,157,157,0.61)';
        } else if (isWeekend) {
            backgroundColor = 'rgba(159,157,157,0.28)';
        }

        return {
            style: {
                backgroundColor,
            },
        };
    };

    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex mb="4" justify="space-between" align="center">
                <Select
                    value={view}
                    onChange={(e) => handleViewChange(e.target.value)}
                    width="150px"
                    marginRight="4"
                    color={useColorModeValue('#0b1437', '#ffffff')}
                    bg={useColorModeValue('#ffffff', '#1a202c')}
                    borderRadius="4px"
                    _focus={{ boxShadow: '0 0 0 1px #6678b4' }}
                >
                    <option value="month" style={{ backgroundColor: useColorModeValue('#ffffff','#1a202c'), color: useColorModeValue('#1a202c','#ffffff') }}>
                        Month
                    </option>
                    <option value="week" style={{ backgroundColor: useColorModeValue('#ffffff','#1a202c'), color: useColorModeValue('#1a202c','#ffffff') }}>
                        Week
                    </option>
                </Select>
            </Flex>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                allDayMaxRows={3}
                popup={true}
                style={{
                    height: 800,
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
                dayPropGetter={dayPropGetter}
            />
            <FixedPlugin />
        </Box>
    );
};

export default Calendar;
