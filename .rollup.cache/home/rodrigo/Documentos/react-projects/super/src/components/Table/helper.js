export var currencyFormat = function (num) {
    return "$".concat(parseInt(typeof num === "number" ? num.toString() : num, 10)
        .toFixed(0) // always two decimal digits
        .replace(".", ",") // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
};
export var formatFecha = function (fecha) {
    return new Date(fecha).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};
//# sourceMappingURL=helper.js.map