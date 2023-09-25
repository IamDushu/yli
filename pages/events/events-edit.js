import React, { useState, useEffect, useRef, } from 'react';
import { Card, Input, DatePicker, Button, Select, Row, Col, Divider, } from 'antd';
import Icon, { CloseOutlined } from '@ant-design/icons';
import { Field, Form, Formik, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from "yup";

import { useSelector, useDispatch, } from "react-redux";
import EventSelectUser from './event-select-user';

import { selectUserInfo } from "store/selectors/user";
import {
	addUpdateEvents,
	searchConnections,
	updateEvents,
} from "../../store/actions";
import InputError from './input-error'

const { RangePicker } = DatePicker;

let formRef;
export default function AddEditEvents({ selectedEvent, reloadEvents, position, closePopup }) {
	const userInfo = useSelector(selectUserInfo);
	const [isLoading, setIsLoading] = useState(false);
	const [modalPosition, setModalPosition] = useState(position);
	const modalRef = useRef(null);
	const dispatch = useDispatch();

	const handleSubmit = async (values) => {
		setIsLoading(true);
		const payload = {
			title: values.title,
			startTime: values.eventTime[0].valueOf(),
			endTime: values.eventTime[1].valueOf(),
			note: values.note,
			// meeting: "meetingLink",
			reminder: values.reminder,
			eventUsers: [
				...values.eventUsers.map((u) => ({ userId: u.userId })),
				{ userId: userInfo?.id }
			]
		};
		if (selectedEvent.id) {
			payload.id = selectedEvent.id;
		}
		const created = await addUpdateEvents(payload);
		setIsLoading(false);
		if (created) {
			dispatch(updateEvents(created.data));
			reloadEvents();
			handleCancel();
		}
	}

	useEffect(() => {
		if (modalRef && modalRef.current) {
			makeElementVisible(modalRef.current);
		}
	}, [modalRef, modalPosition])

	useEffect(() => {
		setModalPosition(JSON.parse(JSON.stringify(position)));
	}, [position])

	const makeElementVisible = (element) => {
		const bottomPadding = 25;
		const rightPadding = 25;

		const rect = element.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const windowWidth = window.innerWidth || document.documentElement.clientWidth;
		if (windowHeight < rect.bottom + bottomPadding) {
			setModalPosition(prev => ({
				...prev,
				top: prev.top - (rect.bottom + bottomPadding - windowHeight)
			}))
		}

		if (windowWidth < rect.right + rightPadding) {
			setModalPosition(prev => ({
				...prev,
				left: prev.left - (rect.right + rightPadding - windowWidth)
			}))
		}
	}

	const handleCancel = () => {
		formRef.resetForm();
		closePopup(false);
	};

	const modalStyles = {
		position: 'fixed',
		left: modalPosition.left + 'px',
		top: modalPosition.top + 'px',
		backgroundColor: 'white',
		zIndex: 1000,
	};

	const onUserSelect = (user) => {
		if (!formRef.values.eventUsers.some((selectedUser) => selectedUser.id == user.id)) {
			formRef.setFieldValue("eventUsers", [...formRef.values.eventUsers, user])
		}
	}

	const onUserRemove = (user) => {
		console.log("formRef.values.eventUsers", formRef.values.eventUsers)
		formRef.setFieldValue("eventUsers", formRef.values.eventUsers.filter((selectedUser) => selectedUser.id != user.id));
	}

	return (
		<div ref={modalRef} style={modalStyles}>
			<Card className="add-edit-event-wrapper">
				<div className="add-edit-event-header">
					<CloseOutlined onClick={handleCancel} /> &nbsp;
				</div>
				<Formik
					enableReinitialize
					initialValues={{
						title: selectedEvent.title ?? "",
						eventUsers: (selectedEvent.eventUsers || []).map(eu => eu.userDetails) ?? [],
						eventTime: selectedEvent.eventTime ?? [],
						note: selectedEvent.note ?? "",
						reminder: selectedEvent.reminder ?? 10,
					}}
					validationSchema={Yup.object({
						title: Yup.string()
							.required('Required').max(100, "Title should not be more than 100"),

						eventTime: Yup.array().required('Required')
							.test('max', 'Event time required', function test(value) {
								return value.length >= 2
							}),
					})}
					onSubmit={handleSubmit}
				>
					{
						props => {
							formRef = props;
							return (
								<div>
									<Form className="add-edit-event-form">
										<Row className="pl-16 pr-16" gutter={24}>
											<Col span={24}>
												<span className="required">Title *</span>
												<Field name="title">
													{({ field }) => {
														const { setFieldValue } = useFormikContext();
														return (
															<React.Fragment>
																<Input placeholder="Enter Title" onChange={e => setFieldValue("title", e.target.value)} value={field.value} />
																<div className="event-text-limit"><span>{field.value.length} / <b>100</b></span></div>
															</React.Fragment>
														)
													}}
												</Field>
												<ErrorMessage name="title" render={(errorMessage) => (
													<InputError error={errorMessage} />
												)} />
											</Col>
										</Row>

										<Row className="mb-2 pl-16 pr-16" gutter={24}>
											<Col span={24}>
												<Field name="eventTime">
													{({ field }) => {
														const { setFieldValue } = useFormikContext();
														return (
															<React.Fragment>
																<div className="d-flex justify-content-between align-items-center">
																	<Icon component={EventTime} />
																	<RangePicker
																		suffixIcon={null}
																		cellRender={
																			(...params) => {
																				return (<span>OKK</span>)
																			}
																		}
																		presets={[
																			{
																				label: <span aria-label="Current Time to End of Day">Now ~ EOD</span>,
																				value: () => [dayjs(), dayjs().endOf('day')], // 5.8.0+ support function
																			},
																		]}
																		showTime
																		format="DD MMM'YY HH:mm"
																		onChange={(e) => {
																			setFieldValue("eventTime", e);
																		}}
																		bordered={false}
																		value={field.value}
																	/>
																</div>

															</React.Fragment>
														)
													}}
												</Field>
												<ErrorMessage name="eventTime" render={(errorMessage) => (
													<InputError error={errorMessage} />
												)} />
											</Col>
										</Row>

										<Row className="mb-2 pl-16 pr-16" gutter={24}>
											<Col span={24} className="">
												<Field name="eventUsers">
													{({ field }) => {
														return (
															<React.Fragment>
																<div className="d-flex justify-content-between align-items-center">
																	<Icon className="mr-1" component={SelectParticipants} />
																	<EventSelectUser onSearchUser={searchConnections} onSelect={onUserSelect} />
																</div>
																<div className="d-block event-user-list">
																	{
																		field.value.map((user) => (
																			<div className="mb-1 d-flex justify-content-between align-items-center">
																				<div>
																					<img className="mr-2 rounded-circle" height="24px" width="24px" src={user.profilePicURL} />
																					<span>{`${user.firstName || ""} ${user.lastName || ""}`}</span>
																				</div>
																				<CloseOutlined onClick={() => onUserRemove(user)} />
																			</div>
																		))
																	}
																</div>
															</React.Fragment>
														)
													}}
												</Field>
												<ErrorMessage name="eventUsers" render={(errorMessage) => (
													<InputError error={errorMessage} />
												)} />
											</Col>
										</Row>

										<Divider />

										<Row className="pl-16 pr-16 pb-12" gutter={24}>
											<Col span={24} className="">
												<span className="required">Add a note</span>
												<Field name="note">
													{({ field }) => {
														const { setFieldValue } = useFormikContext();
														return (
															<React.Fragment>
																<Input.TextArea onChange={e => setFieldValue("note", e.target.value)} value={field.value} rows={4} />
																<div className="event-text-limit"><span>{field.value.length} / <b>100</b></span></div>
															</React.Fragment>
														)
													}}
												</Field>
												<ErrorMessage name="note" render={(errorMessage) => (
													<InputError error={errorMessage} />
												)} />
											</Col>
										</Row>

										<div className="add-edit-event-footer">
											<Icon onClick={() => onUserRemove(taggedUser.user.userId)} className="filter-sroll-icon-right" component={ReminderIcon} />
											<Field name="reminder">
												{({ field }) => {
													const { setFieldValue } = useFormikContext();
													return (
														<React.Fragment>
															<Select
																bordered={false}
																defaultValue={field.value}
																value={field.value}
																style={{ width: '100%' }}
																onChange={(e) => setFieldValue('reminder', e)}
																options={[
																	{ value: 5, label: '5 minutes before' },
																	{ value: 10, label: '10 minutes before' },
																	{ value: 15, label: '15 minutes before' },
																	{ value: 30, label: '30 minutes before' },
																	{ value: 60, label: '1 hour before' },
																]}
															/>
														</React.Fragment>
													)
												}}
											</Field>
										</div>
										<div className="add-edit-event-submit">
											<Button type="primary" loading={isLoading} htmlType="submit">Save</Button>
										</div>
									</Form>
								</div>
							);
						}
					}
				</Formik>
			</Card>
		</div>
	);
}

const EventTime = () => (
	<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8.9925 1.5C4.8525 1.5 1.5 4.86 1.5 9C1.5 13.14 4.8525 16.5 8.9925 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 8.9925 1.5ZM9 15C5.685 15 3 12.315 3 9C3 5.685 5.685 3 9 3C12.315 3 15 5.685 15 9C15 12.315 12.315 15 9 15Z" fill="#595D61" />
		<path d="M9.375 5.25H8.25V9.75L12.1875 12.1125L12.75 11.19L9.375 9.1875V5.25Z" fill="#595D61" />
	</svg>
);

const SelectParticipants = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M9 13.75C6.66 13.75 2 14.92 2 17.25V19H16V17.25C16 14.92 11.34 13.75 9 13.75ZM4.34 17C5.18 16.42 7.21 15.75 9 15.75C10.79 15.75 12.82 16.42 13.66 17H4.34ZM9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM9 7C9.83 7 10.5 7.67 10.5 8.5C10.5 9.33 9.83 10 9 10C8.17 10 7.5 9.33 7.5 8.5C7.5 7.67 8.17 7 9 7ZM16.04 13.81C17.2 14.65 18 15.77 18 17.25V19H22V17.25C22 15.23 18.5 14.08 16.04 13.81ZM15 12C16.93 12 18.5 10.43 18.5 8.5C18.5 6.57 16.93 5 15 5C14.46 5 13.96 5.13 13.5 5.35C14.13 6.24 14.5 7.33 14.5 8.5C14.5 9.67 14.13 10.76 13.5 11.65C13.96 11.87 14.46 12 15 12Z" fill="#595D61" />
	</svg>
);

const ReminderIcon = () => (
	<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7.5 15.75H10.5C10.5 16.575 9.825 17.25 9 17.25C8.175 17.25 7.5 16.575 7.5 15.75ZM15.75 14.25V15H2.25V14.25L3.75 12.75V8.25C3.75 5.925 5.25 3.9 7.5 3.225V3C7.5 2.175 8.175 1.5 9 1.5C9.825 1.5 10.5 2.175 10.5 3V3.225C12.75 3.9 14.25 5.925 14.25 8.25V12.75L15.75 14.25ZM12.75 8.25C12.75 6.15 11.1 4.5 9 4.5C6.9 4.5 5.25 6.15 5.25 8.25V13.5H12.75V8.25Z" fill="#595D61" />
	</svg>
);
