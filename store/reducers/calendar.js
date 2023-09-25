import { REMOVE_CALENDAR_EVENT, SET_CALENDAR_EVENT_LIST, UPSERT_CALENDAR_EVENT, } from '../actions';

const initialState = {
  list: [],
};

const eventFormator = (event) => ({
  ...event,
  start: event.startTime,
  end: event.endTime,
  calendarEventUsers: (event.calendarEventUsers || []).map(eu => ({ ...eu, userDetails: ({ ...eu.userDetails, userId: eu.userDetails.id }) }))
});

const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CALENDAR_EVENT_LIST:
      const newEvents = (payload || []).filter(ne => state.list.findIndex(ee => ee.id == ne.id) == -1);
      const currentEvents = state.list.map((ee) => {
        const index = (payload || []).findIndex(ne => ee.id == ne.id);
        if (index == -1) return ee;
        return payload[index];
      });
      return { ...state, list: [...currentEvents, ...newEvents].map(eventFormator) };

    case UPSERT_CALENDAR_EVENT:
      const index = state.list.findIndex(e => e.id == payload.id);
      return {
        ...state,
        list: index == -1
          ? [...state.list, payload].map(eventFormator)
          : state.list.map(e => e.id == payload.id ? eventFormator(payload) : eventFormator(e))
      };

    case REMOVE_CALENDAR_EVENT:
      return { ...state, list: state.list.filter(e => e.id != payload) };

    default:
      return state;
  }
};

export default calendarReducer;
