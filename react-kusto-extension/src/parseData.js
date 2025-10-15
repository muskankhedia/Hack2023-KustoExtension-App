export const parseData = (dataRec) => {

  console.log('dataRec: ', dataRec);

	const dataP = JSON.parse(dataRec);
  const dataReq = dataP[2];

  console.log('dataReq: ', dataReq);

  // Extract column names
  const columnNames = dataReq.Columns.map((col) => col.ColumnName).join(';');

  // Extract and format row data
  const rowData = dataReq.Rows.map((row) =>
    row.map((ele) => (typeof ele === 'object' ? JSON.stringify(ele) : ele)).join(';')
  ).join('\\n');

  // Combine column names and row data
  const finalData = columnNames + '\\n' + rowData;

    console.log('finalData: ', finalData);
    return finalData;
};