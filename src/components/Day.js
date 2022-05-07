import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    monthIndex,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  function getOtherMonthClass() {
    return dayjs().month(monthIndex).format("MM") !== day.format("MM")
      ? "bg-gray-100 border-gray-200"
      : "";
  }

  return (
    <div className={`border border-gray-200 flex flex-col ${getOtherMonthClass()}`}
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className={`hidden md:inline font-bold text-xs md:text-sm mt-1`}>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={` text-xs md:text-sm mt-2 font-bold md:hidden`}>
          {day.format("ddd").toUpperCase()}
        </p>
        <p
          className={`text-xs md:text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer md:overflow-y-auto scrollbar scrollbar-thumb-gray-400  scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-md"
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 text-gray-800 text-xs rounded mb-1 truncate text-center md:text-left mx-1`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
