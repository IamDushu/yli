import React from 'react';
import Link from "next/link";
import { Typography } from 'antd';
import moment from 'moment';
import Icon from '@ant-design/icons';

import { EVENTS, } from "routes/urls";

const { Text } = Typography;

const CalendarWidgetEventCard = ({
	event
}) => {
	return (
		<Link href={{ pathname: EVENTS, query: { selectedId: event.id } }} /* passHref */>
			{/* <a target="_blank" rel="noopener noreferrer"> */}
			<div role="button" className="calendar-widget-event-card-wrapper">
				<div className="d-flex justify-content-start align-items-center">
					<span className="calendar-widget-event-title">{event.title}</span>
				</div>
				<div className="d-flex justify-content-between align-items-center">
					<Text
						className="calendar-widget-event-note"
						style={{ width: 100 }}
						ellipsis={{ tooltip: event.note }}
					>
						{event.note}
					</Text>
					<div>
						<span className="calendar-widget-event-time pr-1">
							{
								moment(event.startTime).format("h:mma").replace(/(:00)/g, '')} - {moment(event.endTime).format("h:ma").replace(/(:00)/g, '')}</span>
						<Icon component={EventTime} />
					</div>
				</div>
			</div>
			{/* </a> */}
		</Link>
	);
};

const EventTime = () => (
	<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.99996 12.3346C2.77821 12.3346 0.166626 9.72305 0.166626 6.5013C0.166626 3.27955 2.77821 0.667969 5.99996 0.667969C9.22171 0.667969 11.8333 3.27955 11.8333 6.5013C11.8333 9.72305 9.22171 12.3346 5.99996 12.3346ZM6.58329 6.5013V3.58464H5.41663V7.66797H8.91663V6.5013H6.58329Z" fill="#595D61" />
	</svg>
);

export default CalendarWidgetEventCard;
