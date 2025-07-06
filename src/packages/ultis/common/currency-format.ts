const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

const FormatCurrency = (value: number) => currencyFormatter.format(value);

export { FormatCurrency };