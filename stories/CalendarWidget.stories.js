import EventCalendarWidget from "pages/events/events-calendar-widget-ui";
import moment from "moment";

export default {
  title: "Components/EventCalendarWidget",
  component: EventCalendarWidget,
  argTypes: {
    handleClick: { action: "handleClick" },
  },
};

const currentDate = moment();

const getWeekRangeAndMonth = (date) => {
  const weekRange = [];
  let startDate = date.clone().startOf('isoWeek');
  const endDate = date.clone().endOf('isoWeek');

  while (startDate.isBefore(endDate)) {
    weekRange.push(startDate);
    startDate = startDate.clone().add(1, 'days');
  }
  return  {
    weekRange,
    month: weekRange[weekRange.length - 1].month()
  }
}

const { weekRange, month } = getWeekRangeAndMonth(currentDate);

export const sampleCreateActivity = {
  args: {
    dateEvents: [{
      createdAt: "2023-09-16T11:50:43.147Z",
      end: moment.utc().add(2, 'hours').format(),
      id: "acfab889-5825-4f41-8040-ee3b006c8efe",
      meeting: null,
      note: "Sed in libero ut nibh",
      reminder: 10,
      start: moment.utc().format(),
      title: "Demo eventt",
      updatedAt: "2023-09-22T17:58:31.201Z",
    }],
    month: month,
    onChangeMonth: () => { },
    onChangeSelectedDate: () => { },
    onChangeWeekRange: () => { },
    selectedDate: currentDate,
    weekRange: weekRange,
  },
};
