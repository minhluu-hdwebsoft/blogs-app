interface FlattenObject {
  [key: string]: string | number | unknown;
}

export const flattenObj = <T>(obj: T) => {
  const result: FlattenObject = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        result[`${i}.${j}_like`] = temp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
};

export const cleanObject = <T>(obj: T) => {
  const resultObj = {} as T;

  for (const key in obj) {
    // check Truthy value
    if (obj[key]) {
      resultObj[key] = obj[key];
    }
  }

  return resultObj;
};

export const tryParseJson = (jsonString: string): unknown => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
};
