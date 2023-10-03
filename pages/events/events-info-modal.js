import React from 'react';
import moment from "moment";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


export default function EventInfoModal({ event, onEdit, onDelete }) {
	return (
		<div className="event-info-modal-wrapper">
			<div className="event-info-modal-header">
				<ModeEditOutlineOutlinedIcon onClick={() => onEdit(event)} fontSize="small" />&nbsp;
				<DeleteOutlineOutlinedIcon onClick={() => onDelete(event)} fontSize="small" />
			</div>
			<div className="event-info-modal-body">
				<span className="font-weight-bold event-title d-block">{event.title}</span>
				<span className="event-info-row d-block">{moment(event.start).format("ddd, MMM YYYY h:mm a")}</span>
				<span className="event-info-row d-block">Time zone: {event.extendedProps.timeZone}</span>
				<span className="event-info-row d-block">
					Joining info:
				</span>
			</div>
		</div>
	)
}
