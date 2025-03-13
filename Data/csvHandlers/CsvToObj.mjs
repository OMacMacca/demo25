export const CSVtoObject = (data, delimiter = ',') => {
    data = data + ""
    const rows = data.split('\n');
    const headers = deserializeRow(rows.shift(), delimiter);
    return rows.map((row) => {
    const values = deserializeRow(row, delimiter);
    return headers.reduce((obj, key, index) => {
        obj[key] = values[index];
        return obj;
    }, {});
    }); 
};

const deserializeRow = (row, delimiter = ',') => {
    const values = [];
    let index = 0, matchStart = 0, isInsideQuotations = false;
    while (true) {
        if (index === row.length) {
            values.push(row.slice(matchStart, index));
            break;
        }
        const char = row[index];
        if (char === delimiter && !isInsideQuotations) {
            values.push(
                row
                    .slice(matchStart, index)
                    .replace(/^"|"$|/g, '')
                    .replace(/""/g, '"')
                    .replace(/\\n/g, '\n')
            );
            matchStart = index + 1;
        }
        if (char === '"')
            if (row[index + 1] === '"') index += 1;
                else isInsideQuotations = !isInsideQuotations;
                index += 1;
    }
    return values;
};

