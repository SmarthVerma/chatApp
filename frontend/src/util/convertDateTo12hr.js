function convertTo12HourFormatInIST(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Convert UTC time to IST time by adding 5 hours and 30 minutes
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(date.getTime() + istOffset);

    // Extract hours, minutes, and seconds
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const seconds = istDate.getUTCSeconds();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zeros to minutes and seconds if necessary
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;

    // Construct the time string
    const timeString = `${hours}:${minutesStr}: ${ampm}`;

    // Construct the date string
    const dateString = istDate.toUTCString().split(' ').slice(0, 4).join(' ');

    // Combine date and time
    return `${timeString} `;
}

export {convertTo12HourFormatInIST}