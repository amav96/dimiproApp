export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) return "";
  const date: Date = new Date(dateTime);
  const dia: number = date.getDate();
  const ano: number = date.getFullYear();

  const hora: number = date.getHours();
  const minutos: number = date.getMinutes();
  if (!dia || !ano) return dateTime;

  const dateFormat = `${("0" + date.getDate()).slice(-2).slice(-2)}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${ano}`;

  return `${dateFormat} ${`0${hora}`.slice(-2)}:${`0${minutos}`.slice(-2)}`;
};

export const formatTypeDate = (rawData: Date): string | Date => {
  if (!rawData) return "";
  const dia: number = rawData.getDate();
  const ano: number = rawData.getFullYear();

  const hora: number = rawData.getHours();
  const minutos: number = rawData.getMinutes();
  if (!dia || !ano) return rawData;
  const dateFormat = `${("0" + rawData.getDate()).slice(-2).slice(-2)}-${("0" +
    (rawData.getMonth() + 1)
  ).slice(-2)}-${ano}`;

  if(hora === 0 && minutos === 0){
    return `${dateFormat}`;
  }
  return `${dateFormat} ${`0${hora}`.slice(-2)}:${`0${minutos}`.slice(-2)}`;
};

export const formatDate = (onlyDate: string): string => {
  if (!onlyDate) return "";
  if (onlyDate.indexOf("/") > -1) {
    return onlyDate;
  }
  const date: Date = new Date(onlyDate);
  const ano: number = date.getFullYear();
  const dateFormat = `${("0" + date.getDate()).slice(-2).slice(-2)}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${ano}`;

  return dateFormat;
};

export const removeAccents = (str: string): string => {
  if (!str) {
    return "";
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const getValuesInArrayObjects = (Array: Array<object>, trackBy: string = 'id') => {
  let buildArray : Array<number | string> = [];
  Array.forEach((val) => {
    if(val.hasOwnProperty(trackBy)) {
      buildArray.push(val[trackBy as keyof object])
    }
  })
  return buildArray
}