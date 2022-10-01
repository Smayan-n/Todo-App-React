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
const formatDate = (date) => {
	//[year, month, day]
	const split = date.split("-");
	const newDate = `${split[2]} ${months[parseInt(split[1]) - 1]} ${split[0]}`;
	return newDate;
};

export { formatDate };
