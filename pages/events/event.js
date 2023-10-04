import React, { useState, useEffect, useRef, } from 'react';
import { useRouter } from 'next/router'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // For week view
import listPlugin from '@fullcalendar/list'; // For list view
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ReactDOMServer from 'react-dom/server';

import EventInfoModal from './events-info-modal';
import Popover from '@mui/material/Popover';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import {
	getCalendarEvents,
	deleteEvents,
	removeEvents,
} from "../../store/actions";

import EventInfo from './events-info';
import AddEditEvents from './events-edit';
import EventCalendarWidget from './events-calendar-widget';

const viewOptions = [{
	value: "timeGridDay",
	label: "Day"
}, {
	value: "timeGridWeek",
	label: "Week"
}, {
	value: "dayGridMonth",
	label: "Month"
}];

export default function Events() {
	const [addEditPopup, setAddEditPopup] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ left: 20, top: 20 });
	const [currentView, setCurrentView] = useState('timeGridWeek');
	const [selectedEvent, setSelectedEvent] = useState({});
	const [viewEvent, setViewEvent] = useState(null);
	const [viewEventAnchor, setViewEventAnchor] = useState(null);
	const [title, setTitle] = useState('');
	const calendarRef = useRef(null);
	const eventRef = useRef(null);
	const { list } = useSelector((state) => state.calendar);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleViewChange = newView => {
		setCurrentView(newView);
	};

	const renderEventComponent = (event) => {
		const htmlString = ReactDOMServer.renderToString(
			<EventInfo eventInfo={event} />
		);
		return htmlString;
	};

	const handleEventClick = (e, event) => {
		setViewEventAnchor(e.currentTarget);
		setViewEvent(event);
	};

	const handleClose = () => {
		setViewEvent(null);
		setViewEventAnchor(null);
	};

	useEffect(() => {
		const calendarApi = calendarRef.current.getApi();

		calendarApi.on('dateClick', function (info) {
			const { clientX, clientY } = info.jsEvent;

			// Handle the click event here
			setSelectedEvent({
				eventTime: [moment(info.date), moment(+info.date + (30 * 60 * 1000))]
			});

			const react = eventRef.current.getBoundingClientRect();
			setPopupPosition({ left: clientX - react.left, top: clientY - react.top });
			setAddEditPopup(true);
		});


		calendarApi.on('eventClick', function (info) {
			const rect = info.el.getBoundingClientRect();
			setSelectedEvent({});
			setAddEditPopup(false);
			const eventContainer = eventRef.current.getBoundingClientRect();
			setPopupPosition({ left: rect.x - eventContainer.left, top: rect.y - eventContainer.top });
		});

	}, []);

	useEffect(() => {
		calendarRef.current.getApi().changeView(currentView);
		resetTitle();
	}, [currentView]);

	useEffect(() => {
		if (router.query.selectedId) {
			const index = list.findIndex(e => e.id == router.query.selectedId);
			if (index != -1) {
				const event = list[index];
				calendarRef.current.getApi().gotoDate(new Date(event.startTime));
				resetTitle();
				calendarRef.current.getApi().scrollToTime(moment(event.startTime).format("HH:mm:ss"));

				setTimeout(() => {
					const eventElement = document.getElementById(event.id);
					if (eventElement) {
						eventElement.click();
					}
				}, [500])
			}
		}
	}, [router.query]);

	const reloadEvents = () => {
		dispatch(getCalendarEvents({
			from: moment(calendarRef.current.getApi().view.currentStart).clone().subtract(7, 'days').valueOf(),
			to: moment(calendarRef.current.getApi().view.currentEnd).clone().add(7, 'days').valueOf(),
		}));
	}

	// const handleDateClick = (arg) => {
	// 	const { clientX, clientY } = arg.jsEvent;
	// 	setPopupPosition({ left: clientX, top: clientY });
	// 	// setAddEditPopup(true);
	// }

	// const handleSlotClick = (clickInfo) => {
	// 	const { clientX, clientY } = clickInfo.jsEvent;
	// 	setPopupPosition({ left: clientX, top: clientY });
	// 	// setAddEditPopup(true);
	// };

	const onEdit = (event) => {
		handleClose();
		setSelectedEvent({
			title: event.title,
			eventTime: [moment(event.start), moment(event.end)],
			eventUsers: JSON.parse(JSON.stringify(event.extendedProps.calendarEventUsers)),
			id: event.id,
			note: event.extendedProps.note,
			reminder: event.extendedProps.reminder,
		});
		setAddEditPopup(true);
	}

	const onDelete = async (event) => {
		const res = await deleteEvents(event.id);
		if (res) {
			dispatch(removeEvents(event.id));
		}
	}

	const closePopup = () => {
		setSelectedEvent({});
		setAddEditPopup(false);
	};

	const resetTitle = () => {
		setTitle(calendarRef.current.getApi().currentData.viewTitle);
		reloadEvents();
	}

	const onNext = () => {
		calendarRef.current.getApi().next();
		resetTitle();
	}

	const onPrevious = () => {
		calendarRef.current.getApi().prev();
		resetTitle();
	}

	const onToday = () => {
		calendarRef.current.getApi().today();
		resetTitle();
	}

	return (
		<div ref={eventRef} className="events-wrapper">
			<Grid container className="mb-3 pb-3 d-flex image-editor-optimization-wrapper">
				<Grid xs={12}>
					<div className="calender-wrapper">
						<div className="calender-title">
							<span className="calender-title-range">{title}</span>
							<div>
								<Button className="calendar-today-button" variant="outlined" onClick={onToday} size="small">Today</Button> &nbsp;
								<ArrowLeftIcon role="button" onClick={onPrevious} size="small" /> &nbsp;
								<ArrowRightIcon role="button" onClick={onNext} size="small" /> &nbsp;&nbsp;&nbsp;
								<Select
									value={currentView}
									IconComponent={KeyboardArrowDownOutlinedIcon}
									onChange={(e) => handleViewChange(e.target.value)}
									size="small"
									className="calendar-view-select"
								>
									{
										viewOptions.map(o => (<MenuItem value={o.value}>{o.label}</MenuItem>))
									}
								</Select>
							</div>
						</div>
						<FullCalendar
							ref={calendarRef}
							plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
							initialView="timeGridWeek"
							headerToolbar={{
								left: 'prev,next today',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
							}}
							events={list}
							// dateClick={handleDateClick}
							eventContent={prop => () => <div
								aria-describedby={prop.id} variant="contained"
								onClick={(e) => handleEventClick(e, prop)}
								dangerouslySetInnerHTML={{ __html: renderEventComponent(prop) }}></div>}
							slotDuration="01:00:00"
							allDaySlot={false}
							eventMinHeight={20}
							dayHeaderContent={(args) => {
								return moment(args.date).format('ddd')
							}}
							slotLabelFormat={{
								hour: '2-digit',
								minute: '2-digit',
								omitZeroMinute: false,
								hour12: false,
							}}
						/>
					</div>
				</Grid>
			</Grid>
			{
				addEditPopup
				&& <AddEditEvents
					selectedEvent={selectedEvent}
					reloadEvents={reloadEvents}
					position={popupPosition}
					closePopup={closePopup}
				/>
			}
			{
				viewEvent
				&& <Popover
					id={viewEvent.id}
					open={!!viewEvent}
					anchorEl={viewEventAnchor}
					onClose={handleClose}
					variant="popover"
				>
					<EventInfoModal event={viewEvent.event} onEdit={onEdit} onDelete={onDelete} />
				</Popover>}
		</div>
	);
}
