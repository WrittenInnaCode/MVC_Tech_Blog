module.exports = {
    // Create a custom helper 'format_date' that takes in a timestamp, formats it as M/D/YYYY
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getDay()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
  };