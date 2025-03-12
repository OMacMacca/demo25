export const objectToCSV = (
    arr,
    headers = extractHeaders(arr),
    omitHeaders = false,
    delimiter = ','
    ) => {
    const headerRow = serializeRow(headers, delimiter);
    const bodyRows = arr.map(obj =>
      serializeRow(
        headers.map(key => obj[key]),
        delimiter
      )
    );
    return omitHeaders
        ? bodyRows.join('\n')
        : [headerRow, ...bodyRows].join('\n');
    };

const extractHeaders = (aObj) =>
    [...aObj.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => acc.add(key));
        return acc;
    }, new Set())]

const serializeRow = (row, delimiter = ',') => row.join(delimiter)

const arrayToCSV = (arr, delimiter = ',') =>
    arr.map(row => serializeRow(row, delimiter)).join('\n');



