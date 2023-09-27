import React, { useState, useEffect, } from 'react';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import EventCalendarWidgetUI from 'pages/events/events-calendar-widget-ui';
import {
	getCalendarEvents,
} from "store/actions";

export default function EventCalendarWidget() {
	const [month, setMonth] = useState(0);
	const [year, setYear] = useState(new Date().getFullYear());
	const [selectedDate, setSelectedDate] = useState(moment());
	const [weekRange, setWeekRange] = useState([]);
	const [dateEvents, setDateEvents] = useState([]);
	const { list } = useSelector((state) => state.calendar);

	const dispatch = useDispatch();

	useEffect(() => {
		getMonthEvent(month);
	}, [month]);

	useEffect(() => {
		resetDateEvents();
	}, [list, selectedDate]);

	useEffect(() => {
		resetDateEvents();
		getMonthEvent(month);
	}, [weekRange]);

	const getMonthEvent = async (m) => {
		const firstDayOfMonth = moment([year, m, 1]);

		dispatch(getCalendarEvents({
			from: firstDayOfMonth.clone().subtract(6, 'days').startOf('month').valueOf(),
			to: firstDayOfMonth.clone().add(6, 'days').endOf('month').valueOf(),
		}));
	}

	const resetDateEvents = () => {
		setDateEvents(
			list.filter((e) => {
				const startTime = moment(e.startTime);
				const endTime = moment(e.endTime);

				return (startTime.isSame(selectedDate, 'd') || endTime.isSame(selectedDate, 'd'))
			})
		);
	}

	useEffect(() => {
		const currentDate = moment();
		const newWeekRange = [];
		let startDate = currentDate.clone().startOf('isoWeek');
		const endDate = currentDate.clone().endOf('isoWeek');

		while (startDate.isBefore(endDate)) {
			newWeekRange.push(startDate);
			startDate = startDate.clone().add(1, 'days');
		}
		setWeekRange(newWeekRange);
		setMonth(newWeekRange[newWeekRange.length - 1].month())
	}, [])

	return (<EventCalendarWidgetUI
		month={month}
		onChangeMonth={setMonth}
		selectedDate={selectedDate}
		onChangeSelectedDate={setSelectedDate}
		weekRange={weekRange}
		onChangeWeekRange={setWeekRange}
		dateEvents={dateEvents}
	/>);
}
