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
//formats date input input
const formatInputDate = (date) => {
	//[year, month, day]
	const split = date.split("-");
	const newDate = `${split[2]} ${months[parseInt(split[1]) - 1]} ${split[0]}`;
	return newDate;
};

//formats date object
const formatDate = (date) => {
	const split = String(date).split(" ");
	const newDate = `${split[2]} ${split[1]} ${split[3]}`;
	return newDate;
};

export { formatDate, formatInputDate };
