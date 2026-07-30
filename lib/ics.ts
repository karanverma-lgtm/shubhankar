"use client";

export function downloadIcsCalendar() {
  const title = "Shubhankar & Shourya Wedding";
  const description = "Join us in celebrating the wedding of Shubhankar & Shourya in Gurgaon!";
  const location = "Gurgaon, Haryana, India";

  // Event Date: Saturday 21st November 2026 (18:00 IST)
  const startDate = "20261121T180000";
  const endDate = "20261121T235900";

  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shubhankar and Shourya Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `STATUS:CONFIRMED`,
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Shubhankar_Shourya_Wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
