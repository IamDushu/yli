import React from 'react';
import { Popover, Typography, } from 'antd';
import EventInfoModal from './events-info-modal';

const { Text } = Typography;

export default function eventInfo(eventInfo, onEdit, onDelete) {
	return (
		<Popover
			content={<EventInfoModal event={eventInfo.event} onEdit={onEdit} onDelete={onDelete} />}
			trigger="click"
		>
			<div id={eventInfo.event.id} className="event-wrappe">
				<Text
					style={{ width: "100%" }}
					ellipsis={{ tooltip: eventInfo.event.title }}
				>
					<b>{eventInfo.event.title}</b>
				</Text>
			</div>
		</Popover>
	)
}
