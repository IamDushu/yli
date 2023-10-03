import React from 'react';

export default function EventInfo({ eventInfo }) {
	return (
		<div className="event-wrappe">
			<span
				style={{ maxWidth: "100%" }}
			>
				<b>{eventInfo.event.title}</b>
			</span>
		</div>
	)
}
