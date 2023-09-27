import React from 'react';
import { Select } from 'antd';
import { Divider } from '@mui/material';
import Icon from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CalendarWidgetEventCard from './calendar-widget-event-card';

const monthOptions = [
	{ label: 'January', value: 0 },
	{ label: 'February', value: 1 },
	{ label: 'March', value: 2 },
	{ label: 'April', value: 3 },
	{ label: 'May', value: 4 },
	{ label: 'June', value: 5 },
	{ label: 'July', value: 6 },
	{ label: 'August', value: 7 },
	{ label: 'September', value: 8 },
	{ label: 'October', value: 9 },
	{ label: 'November', value: 10 },
	{ label: 'December', value: 11 },
];

export default function EventCalendarWidgetUI(props) {
	const {
		month, onChangeMonth,
		selectedDate, onChangeSelectedDate,
		weekRange, onChangeWeekRange,
		dateEvents,
	} = props;
	const [lang] = useTranslation("language");

	const dispatch = useDispatch();

	const onNext = () => {
		const newWeekRange = [];
		const curWeekEnd = weekRange[weekRange.length - 1];
		let newWeekStart = curWeekEnd.clone().add(1, 'days');
		const newWeekEnd = newWeekStart.clone().endOf('isoWeek');
		while (newWeekStart.isBefore(newWeekEnd)) {
			newWeekRange.push(newWeekStart);
			newWeekStart = newWeekStart.clone().add(1, 'days');
		}
		onChangeWeekRange(newWeekRange);
		onChangeMonth(newWeekRange[newWeekRange.length - 1].month())
	}

	const onPrev = () => {
		const newWeekRange = [];
		const curWeekEnd = weekRange[0];
		let newWeekStart = curWeekEnd.clone().subtract(1, 'days').startOf('isoWeek');
		const newWeekEnd = newWeekStart.clone().endOf('isoWeek');
		while (newWeekStart.isBefore(newWeekEnd)) {
			newWeekRange.push(newWeekStart);
			newWeekStart = newWeekStart.clone().add(1, 'days');
		}
		onChangeWeekRange(newWeekRange);
		onChangeMonth(newWeekRange[newWeekRange.length - 1].month())
	}

	return (
		<div className="calendar-widget-wrapper">
			<div className="calendar-widget-header">
				<div className="d-flex justify-content-between align-items-center pb-2">
					<span className="calendar-header-title">Calendar</span>
					<span>
						<Icon className="mr-3" onClick={onPrev} component={LeftArrow} />
						<Icon onClick={onNext} component={RightArrow} />
					</span>
					<span>
						<Select
							size="small"
							value={month}
							bordered={false}
							onChange={onChangeMonth}
							options={monthOptions}
						/>
					</span>
				</div>
				<div className="d-flex justify-content-between align-items-center">
					{
						weekRange.length == 7
						&& weekRange.map((date) => (
							<div role="button" onClick={() => onChangeSelectedDate(date)} className="d-flex flex-column justify-content-between align-items-center">
								<span className="week-day">{date.format("dd")}</span>
								<span className={selectedDate.isSame(date, 'd') ? "week-date-active" : "week-date"}>{date.format("DD")}</span>
							</div>
						))
					}
				</div>
			</div>
			<div className="mt-2">
				<Divider />
			</div>
			<div className="calendar-widget-body">
				<div className="calendar-widget-event">
					{
						dateEvents.length == 0
							? <div className="no-event-ui"><span>{lang("CALENDAR_WIDGET.NO_EVENTS")}</span></div>
							: dateEvents.map((e, i) => <div className={i == dateEvents.length - 1 ? "" : "pb-2"}><CalendarWidgetEventCard event={e} /></div>)
					}
				</div>
			</div>
		</div>
	)
}

const RightArrow = () => (
	<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.15625 8.825L3.97292 5L0.15625 1.175L1.33125 0L6.33125 5L1.33125 10L0.15625 8.825Z" fill="#051F4E" />
	</svg>
);

const LeftArrow = () => (
	<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.84375 1.175L3.02708 5L6.84375 8.825L5.66875 10L0.66875 5L5.66875 0L6.84375 1.175Z" fill="#051F4E" />
	</svg>
);
