import React from 'react';
import { Typography, Button, } from 'antd';
import moment from "moment";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function EventInfoModal({ event, onEdit, onDelete }) {
	return (
		<div className="event-info-modal-wrapper">
			<div className="event-info-modal-header">
				<Button type="link" onClick={() => onEdit(event)}><EditOutlined /></Button>
				<Button type="link" onClick={() => onDelete(event)}><DeleteOutlined /></Button>
			</div>
			<div className="event-info-modal-body">
				<Text className="font-weight-bold event-title d-block">{event.title}</Text>
				<Text className="event-info-row d-block">{moment(event.start).format("ddd, MMM YYYY h:mm a")}</Text>
				<Text className="event-info-row d-block">Time zone: {event.extendedProps.timeZone}</Text>
				<Text className="event-info-row d-block">
					Joining info:<Button target="_blank" href={event.extendedProps.joiningLink} type="link">{event.extendedProps.joiningLink}</Button>
				</Text>
			</div>
		</div>
	)
}
