import * as XLSX from 'xlsx';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const updateExcel = async (surveyType, data) => {
  const storage = getStorage();
  const fileName = `${surveyType}Survey.xlsx`;
  const fileRef = ref(storage, fileName);

  let workbook;
  try {
    const url = await getDownloadURL(fileRef);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    workbook = XLSX.read(data, { type: 'array' });
  } catch (error) {
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Surveys');
  }

  const worksheet = workbook.Sheets['Surveys'];
  XLSX.utils.sheet_add_json(worksheet, [data], { skipHeader: true, origin: -1 });
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  await uploadBytes(fileRef, blob);
};

export default updateExcel;