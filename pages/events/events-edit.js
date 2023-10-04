import React, { useState, useEffect, } from 'react';
import moment from 'moment';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from "yup";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import SvgIcon from '@mui/material/SvgIcon';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderDigitalClockTimeView } from '@mui/x-date-pickers/timeViewRenderers';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch, } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { DatePicker } from "components/form-fields";
import dayjs from 'dayjs';

import { selectUserInfo } from "store/selectors/user";
import {
	addUpdateEvents,
	searchConnections,
	updateEvents,
} from "store/actions";
import { CustomInputField } from "components/add-post-ui/custom-text-field";
import TimePickerField from 'components/form-fields/TimePicker';
// import CkEditorField from "components/form-fields/ck-editor-field";

let formRef;
const reminderOption = [
	{ value: 5, label: '5 minutes before' },
	{ value: 10, label: '10 minutes before' },
	{ value: 15, label: '15 minutes before' },
	{ value: 30, label: '30 minutes before' },
	{ value: 60, label: '1 hour before' },
];
export default function AddEditEvents({ selectedEvent, reloadEvents, position, closePopup }) {
	const userInfo = useSelector(selectUserInfo);
	const [isLoading, setIsLoading] = useState(false);
	const [isStartOpen, setIsStartOpen] = useState(false);
	const [isEndOpen, setIsEndOpen] = useState(false);
	const [modalPosition, setModalPosition] = useState(position);
	const [userOptions, serUserOptions] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: selectedEvent.title ?? "",
			eventUsers: (selectedEvent.eventUsers || []).map(eu => eu.userDetails) ?? [],
			eventTime: selectedEvent.eventTime ?? [],
			note: selectedEvent.note ?? "",
			reminder: selectedEvent.reminder ?? 10,
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required('Required').max(100, "Title should not be more than 100"),

			eventTime: Yup.array().required('Required')
				.test('max', 'Event time required', function test(value) {
					return value.length >= 2
				}),
		}),
		onSubmit: handleSubmit,
	});

	const handleSubmit = async () => {
		const validateRes = await formik.validateForm();
		if (Object.keys(validateRes).length > 0) {
			return;
		}
		const values = formik.values;
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
		setModalPosition(JSON.parse(JSON.stringify(position)));
	}, [position])

	const handleCancel = () => {
		formRef.resetForm();
		closePopup(false);
	};

	const modalStyles = {
		position: "absolute",
		left: modalPosition.left + 'px',
		top: modalPosition.top + 'px',
		backgroundColor: 'white',
		zIndex: 1,
	};

	const onUserSelect = (user) => {
		if (!formik.values.eventUsers.some((selectedUser) => selectedUser.id == user.id)) {
			formik.setFieldValue("eventUsers", [...formik.values.eventUsers, user]);
		}
	}

	const onUserRemove = (user) => {
		formik.setFieldValue("eventUsers", formik.values.eventUsers.filter((selectedUser) => selectedUser.id != user.id));
	}

	const getStartTimeLabel = (date) => {
		return date.format("dddd, DD MMMM YYYY HH:mm");
	}

	const getEndTimeLabel = (date) => {
		return date.format("HH:mm");
	}

	const handleUserSearch = async (value) => {
		const payload = { "page": 1, "pagesize": 20, "search": value };
		const users = await searchConnections(payload);
		if (!Array.isArray(users)) {
			serUserOptions([]);
			return;
		};

		serUserOptions(users);
	};

	return (
		<div style={modalStyles}>
			<div className="add-edit-event-wrapper">
				<div className="add-edit-event-header d-flex justify-content-between align-items-center">
					<SvgIcon fontSize="10px">
						{headerIcon()}
					</SvgIcon>
					<SvgIcon onClick={handleCancel} fontSize="10px">
						{headerCloseIcon()}
					</SvgIcon>
				</div>
				<Formik
					onSubmit={handleSubmit}
				>
					{
						props => {
							formRef = props;
							return (
								<div>
									<Form className="add-edit-event-form">
										<div style={{ padding: "16px" }}>
											<Grid container>
												<Grid xs={12}>
													<CustomInputField
														placeholder="Enter Title"
														// label="Title"
														label={<span className="event-form-label">Title*</span>}
														defaultValue={formik.values?.title}
														formik={formik}
														formikKey={`title`}
													/>
													<div className="event-text-limit"><span>{formik.values.title.length} / <b>100</b></span></div>
												</Grid>
											</Grid>

											<Grid container>
												<Grid xs={12}>
													<div className="d-flex align-items-center bottom-spacer-16">
														<SvgIcon fontSize="small">
															{eventTime()}
														</SvgIcon>
														<LocalizationProvider dateAdapter={AdapterDayjs}>
															<DateTimePicker
																open={isStartOpen}
																className="calendar-event-datetime-selector"
																label="Start"
																// value={dayjs(formik.values.eventTime[0]?.utc().format())}
																viewRenderers={{
																	hours: renderDigitalClockTimeView,
																	minutes: renderDigitalClockTimeView,
																	seconds: renderDigitalClockTimeView,
																}}
																// onAccept={(newValue) => formik.setFieldValue("eventTime", [moment(newValue.format()), formik.values.eventTime[1]])}
																closeOnSelect
																disablePast
																openPickerIcon={null}
																onClose={(e) => setIsStartOpen(false)}
															/>
														</LocalizationProvider>
														{
															formik.values.eventTime[0]
															&& (
																<span
																	className="start-time-label"
																	onClick={() => setIsStartOpen(true)}
																>
																	{getStartTimeLabel(formik.values.eventTime[0])}
																</span>
															)
														}
														<LocalizationProvider dateAdapter={AdapterDayjs}>
															<DateTimePicker
																className="calendar-event-datetime-selector"
																open={isEndOpen}
																label="End"
																viewRenderers={{
																	hours: renderDigitalClockTimeView,
																	minutes: renderDigitalClockTimeView,
																	seconds: renderDigitalClockTimeView,
																}}
																// value={dayjs(formik.values.eventTime[1]?.utc().format())}
																// onAccept={(newValue) => formik.setFieldValue("eventTime", [formik.values.eventTime[0], moment(newValue.format())])}
																closeOnSelect
																disablePast
																onClose={() => setIsEndOpen(false)}
															/>
														</LocalizationProvider>
														{
															formik.values.eventTime[1]
															&& (
																<span
																	className="end-time-label"
																	onClick={() => setIsEndOpen(true)}
																>
																	&nbsp;-&nbsp;{getEndTimeLabel(formik.values.eventTime[1])}
																</span>
															)
														}
													</div>
													<DatePicker
														label={<span className="event-form-label">Start Date*</span>}
														className="bottom-spacer-16"
														placeholder="Start Date*"
														value={formik.values.eventTime[0]?.format("DD-MM-YYYY")}
														onChange={(newValue) => {
															const newDate = moment(newValue.format());
															if (formik.values.eventTime[0]) {
																newDate.hours(formik.values.eventTime[0].hours());
															}
															formik.setFieldValue("eventTime", [newDate, formik.values.eventTime[1]])
														}}
														size="small"
													/>
													<TimePickerField
														label={<span className="event-form-label">Start Time*</span>}
														className="bottom-spacer-16 event-time-selector"
														placeholder="Start Time*"
														value={dayjs(formik.values.eventTime[0]?.valueOf())}
														onAccept={(newValue) => {
															const newDate = moment(newValue.format());
															formik.setFieldValue("eventTime", [newDate, formik.values.eventTime[1]])
														}}
													/>
													<DatePicker
														label={<span className="event-form-label">End Date*</span>}
														className="bottom-spacer-16"
														placeholder="End Date*"
														value={formik.values.eventTime[1]?.format("DD-MM-YYYY")}
														onChange={(newValue) => {
															const newDate = moment(newValue.format());
															if (formik.values.eventTime[1]) {
																newDate.hours(formik.values.eventTime[1].hours());
															}
															formik.setFieldValue("eventTime", [formik.values.eventTime[0], newDate])
														}}
													/>
													<TimePickerField
														label={<span className="event-form-label">End Time*</span>}
														className="bottom-spacer-16 event-time-selector"
														placeholder="End Time*"
														value={dayjs(formik.values.eventTime[1]?.valueOf())}
														onAccept={(newValue) => {
															const newDate = moment(newValue.format());
															formik.setFieldValue("eventTime", [formik.values.eventTime[0], newDate])
														}}
													/>
												</Grid>
											</Grid>

											<Grid container>
												<Grid xs={12}>
													<Autocomplete
														disablePortal
														id="user-select"
														required={true}
														options={userOptions}
														popupIcon={<SvgIcon fontSize="small">{selectParticipants()}</SvgIcon>}
														renderInput={(params) => <CustomInputField
															{...params}
															endAdornment={<SvgIcon fontSize="small">{selectParticipants()}</SvgIcon>}
															placeholder="Enter Invite Participants"
															label={<span className="event-form-label">Invite Participants</span>}
															onChange={(e) => handleUserSearch(e)}
															InputLabelProps={{
																shrink: true,
															}}
														/>}
														getOptionLabel={(option) => option.firstName}
														renderOption={(props, option) => (<div {...props} className="event-user-search" onClick={(e) => {
															props.onClick(e);
															onUserSelect(option)
														}}>
															<img style={{
																borderRadius: "25px"
															}} height="30px" width="30px" src={option.profilePicURL} />
															<span>{`${option.firstName || ""} ${option.lastName || ""}`}</span>
														</div>)
														}
													/>
													{
														formik.values.eventUsers.length > 0
														&& <div className="d-block event-user-list">
															{
																formik.values.eventUsers.map((user) => (
																	<div className="mb-1 d-flex justify-content-between align-items-center selected-event-user">
																		<div>
																			<img className="mr-2 rounded-circle" height="28px" width="28px" src={user.profilePicURL} />
																			<span>{`${user.firstName || ""} ${user.lastName || ""}`}</span>
																		</div>
																		<CloseIcon onClick={() => onUserRemove(user)} />
																	</div>
																))
															}
														</div>
													}
												</Grid>
											</Grid>
										</div>

										<Divider />

										<div style={{ padding: "16px" }}>
											<Grid container>
												<Grid xs={12}>
													<div className="note-label">
														<span> Add a note </span>
													</div>
													<CustomInputField
														placeholder="Note"
														label="Note"
														formik={formik}
														formikKey={`note`}
														rows={4}
														textarea
													/>
													<div className="event-text-limit"><span>{formik.values.note.length} / <b>100</b></span></div>
													{/* <CkEditorField
														className="event-note-editor"
														name="note"
														formik={formik}
														count={1000}
														countName="shortDescriptionCount"
														allowImageUpload={false}
														toolbarItem={["bold", "italic", "underline", "|", "bulletedList", "numberedList",]}
														placeHolder="Type the content here!"
													/> */}
												</Grid>
											</Grid>
										</div>

										<div className="add-edit-event-footer">
											<SvgIcon onClick={() => onUserRemove(taggedUser.user.userId)} className="filter-sroll-icon-right" fontSize="small">
												{reminderIcon()}
											</SvgIcon>
											<Select
												variant="standard"
												IconComponent={KeyboardArrowDownOutlinedIcon}
												className="event-reminder-select"
												disableUnderline
												value={formik.values.reminder}
												onChange={(e) => formik.setFieldValue('reminder', e.target.value)}
											>
												{
													reminderOption.map(o => (<MenuItem value={o.value}>{o.label}</MenuItem>))
												}
											</Select>
										</div>
										<div className="add-edit-event-submit">
											<Button disabled={isLoading} onClick={handleSubmit} variant="contained" size="medium" htmlType="submit">Save</Button>
										</div>
									</Form>
								</div>
							);
						}
					}
				</Formik>
			</div>
		</div>
	);
}

const eventTime = () => (
	<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.1163 1.68744C5.45891 1.68744 1.68745 5.46733 1.68745 10.1247C1.68745 14.7821 5.45891 18.562 10.1163 18.562C14.7821 18.562 18.562 14.7821 18.562 10.1247C18.562 5.46733 14.7821 1.68744 10.1163 1.68744ZM10.1247 16.8745C6.39545 16.8745 3.37491 13.854 3.37491 10.1247C3.37491 6.39543 6.39545 3.37489 10.1247 3.37489C13.854 3.37489 16.8745 6.39543 16.8745 10.1247C16.8745 13.854 13.854 16.8745 10.1247 16.8745Z" fill="#49454E" />
		<path d="M10.5466 5.90607H9.28099V10.9684L13.7106 13.6262L14.3433 12.5884L10.5466 10.3356V5.90607Z" fill="#49454E" />
	</svg>
);

const selectParticipants = () => (
	<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M9 13.9995C6.66 13.9995 2 15.1695 2 17.4995V19.2495H16V17.4995C16 15.1695 11.34 13.9995 9 13.9995ZM4.34 17.2495C5.18 16.6695 7.21 15.9995 9 15.9995C10.79 15.9995 12.82 16.6695 13.66 17.2495H4.34ZM9 12.2495C10.93 12.2495 12.5 10.6795 12.5 8.74945C12.5 6.81945 10.93 5.24945 9 5.24945C7.07 5.24945 5.5 6.81945 5.5 8.74945C5.5 10.6795 7.07 12.2495 9 12.2495ZM9 7.24945C9.83 7.24945 10.5 7.91945 10.5 8.74945C10.5 9.57945 9.83 10.2495 9 10.2495C8.17 10.2495 7.5 9.57945 7.5 8.74945C7.5 7.91945 8.17 7.24945 9 7.24945ZM16.04 14.0595C17.2 14.8995 18 16.0195 18 17.4995V19.2495H22V17.4995C22 15.4795 18.5 14.3295 16.04 14.0595ZM15 12.2495C16.93 12.2495 18.5 10.6795 18.5 8.74945C18.5 6.81945 16.93 5.24945 15 5.24945C14.46 5.24945 13.96 5.37945 13.5 5.59945C14.13 6.48945 14.5 7.57945 14.5 8.74945C14.5 9.91945 14.13 11.0095 13.5 11.8995C13.96 12.1195 14.46 12.2495 15 12.2495Z" fill="#79767A" />
	</svg>
);

const reminderIcon = () => (
	<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.1247 18.6004C11.0528 18.6004 11.8121 17.8411 11.8121 16.913H8.43724C8.43724 17.8411 9.19659 18.6004 10.1247 18.6004ZM15.187 13.5381V9.31944C15.187 6.7292 13.8118 4.56082 11.3903 3.98709V3.41336C11.3903 2.71306 10.825 2.14777 10.1247 2.14777C9.4244 2.14777 8.8591 2.71306 8.8591 3.41336V3.98709C6.44604 4.56082 5.06233 6.72076 5.06233 9.31944V13.5381L3.37488 15.2255V16.0692H16.8745V15.2255L15.187 13.5381ZM13.4996 14.3818H6.74978V9.31944C6.74978 7.227 8.02381 5.52267 10.1247 5.52267C12.2256 5.52267 13.4996 7.227 13.4996 9.31944V14.3818Z" fill="#49454E" />
	</svg>
);

const headerIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 1.33334C11.0203 1.33334 11.3594 1.47382 11.6095 1.72387C11.8595 1.97392 12 2.31305 12 2.66668C12 3.0203 11.8595 3.35944 11.6095 3.60949C11.3594 3.85953 11.0203 4.00001 10.6667 4.00001C10.313 4.00001 9.97391 3.85953 9.72386 3.60949C9.47381 3.35944 9.33333 3.0203 9.33333 2.66668C9.33333 2.31305 9.47381 1.97392 9.72386 1.72387C9.97391 1.47382 10.313 1.33334 10.6667 1.33334ZM10.6667 6.66668C11.0203 6.66668 11.3594 6.80715 11.6095 7.0572C11.8595 7.30725 12 7.64639 12 8.00001C12 8.35363 11.8595 8.69277 11.6095 8.94282C11.3594 9.19287 11.0203 9.33334 10.6667 9.33334C10.313 9.33334 9.97391 9.19287 9.72386 8.94282C9.47381 8.69277 9.33333 8.35363 9.33333 8.00001C9.33333 7.64639 9.47381 7.30725 9.72386 7.0572C9.97391 6.80715 10.313 6.66668 10.6667 6.66668ZM5.33333 12C5.68696 12 6.02609 12.1405 6.27614 12.3905C6.52619 12.6406 6.66667 12.9797 6.66667 13.3333C6.66667 13.687 6.52619 14.0261 6.27614 14.2762C6.02609 14.5262 5.68696 14.6667 5.33333 14.6667C4.97971 14.6667 4.64057 14.5262 4.39052 14.2762C4.14048 14.0261 4 13.687 4 13.3333C4 12.9797 4.14048 12.6406 4.39052 12.3905C4.64057 12.1405 4.97971 12 5.33333 12ZM10.6667 12C11.0203 12 11.3594 12.1405 11.6095 12.3905C11.8595 12.6406 12 12.9797 12 13.3333C12 13.687 11.8595 14.0261 11.6095 14.2762C11.3594 14.5262 11.0203 14.6667 10.6667 14.6667C10.313 14.6667 9.97391 14.5262 9.72386 14.2762C9.47381 14.0261 9.33333 13.687 9.33333 13.3333C9.33333 12.9797 9.47381 12.6406 9.72386 12.3905C9.97391 12.1405 10.313 12 10.6667 12ZM5.33333 1.33334C5.68696 1.33334 6.02609 1.47382 6.27614 1.72387C6.52619 1.97392 6.66667 2.31305 6.66667 2.66668C6.66667 3.0203 6.52619 3.35944 6.27614 3.60949C6.02609 3.85953 5.68696 4.00001 5.33333 4.00001C4.97971 4.00001 4.64057 3.85953 4.39052 3.60949C4.14048 3.35944 4 3.0203 4 2.66668C4 2.31305 4.14048 1.97392 4.39052 1.72387C4.64057 1.47382 4.97971 1.33334 5.33333 1.33334ZM5.33333 6.66668C5.68696 6.66668 6.02609 6.80715 6.27614 7.0572C6.52619 7.30725 6.66667 7.64639 6.66667 8.00001C6.66667 8.35363 6.52619 8.69277 6.27614 8.94282C6.02609 9.19287 5.68696 9.33334 5.33333 9.33334C4.97971 9.33334 4.64057 9.19287 4.39052 8.94282C4.14048 8.69277 4 8.35363 4 8.00001C4 7.64639 4.14048 7.30725 4.39052 7.0572C4.64057 6.80715 4.97971 6.66668 5.33333 6.66668Z" fill="#79767A" />
	</svg>
);

const headerCloseIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4.26667 12.6667L3.33334 11.7333L7.06667 8.00001L3.33334 4.26668L4.26667 3.33334L8 7.06668L11.7333 3.33334L12.6667 4.26668L8.93334 8.00001L12.6667 11.7333L11.7333 12.6667L8 8.93334L4.26667 12.6667Z" fill="#79767A" />
	</svg>
);
