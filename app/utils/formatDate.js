const moment = require("moment");

export const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
}
export default formatDate;