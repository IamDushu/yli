import React, { useState, useEffect, useRef, } from 'react';
import { useRouter } from 'next/router'
import { Select, Button, Row, Col, } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // For week view
import listPlugin from '@fullcalendar/list'; // For list view
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
	getCalendarEvents,
	deleteEvents,
	removeEvents,
} from "../../store/actions";

import eventInfo from './events-info';
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
	const [title, setTitle] = useState('');
	const calendarRef = useRef(null);
	const { list } = useSelector((state) => state.calendar);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleViewChange = newView => {
		setCurrentView(newView);
	};

	useEffect(() => {
		const calendarApi = calendarRef.current.getApi();

		calendarApi.on('dateClick', function (info) {
			const { clientX, clientY } = info.jsEvent;

			// Handle the click event here
			const clickedDate = info.date;
			setSelectedEvent({
				eventTime: [moment(info.date), moment(+info.date + (30 * 60 * 1000))]
			});

			setPopupPosition({ left: clientX, top: clientY });
			setAddEditPopup(true);
		});


		calendarApi.on('eventClick', function (info) {
			const rect = info.el.getBoundingClientRect();
			setSelectedEvent({});
			setAddEditPopup(false);
			setPopupPosition({ left: rect.x, top: rect.y });
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
		<div className="events-wrapper">
			<Row className="mb-3 pb-3 d-flex image-editor-optimization-wrapper">
				<Col span={6}>
					<EventCalendarWidget />
				</Col>
				<Col className="ml-3" span={17}>
					<div className="calender-wrapper">
						<div className="calender-title">
							<h2>{title}</h2>
							<div>
								<Button onClick={onPrevious} size="small">Previous</Button> &nbsp;
							<Button onClick={onToday} size="small">Today</Button> &nbsp;
							<Button onClick={onNext} size="small">Next</Button> &nbsp;&nbsp;&nbsp;
							<Select
									size="small"
									value={currentView}
									onChange={handleViewChange}
									style={{
										width: 100,
									}}
									options={viewOptions}
								/>
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
							eventContent={prop => eventInfo(prop, onEdit, onDelete)}
							slotDuration="01:00:00"
							allDaySlot={false}
							eventMinHeight={20}
						// onClick={handleSlotClick}
						// selectable={true}
						/>
					</div>
				</Col>
			</Row>
			{
				addEditPopup
				&& <AddEditEvents
					selectedEvent={selectedEvent}
					reloadEvents={reloadEvents}
					position={popupPosition}
					closePopup={closePopup}
				/>
			}
		</div>
	);
}
