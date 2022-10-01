const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
//formats datetime-local input's input
const formatDateTime = (dateTime) => {
	const [date, time] = dateTime.split("T");
	//y/m/d
	const splitDate = date.split("-");
	const newDate = `${splitDate[2]} ${months[parseInt(splitDate[1])]} ${
		splitDate[0]
	}`;
	return `${newDate} | ${time}`;
};

export { formatDateTime };
