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

interface FlattenObject {
  [key: string]: string | number | unknown;
}

interface NestedObject {
  [key: string]: string | number | FlattenObject | unknown;
}

export const flattenObj = <T>(obj: T) => {
  const result: FlattenObject = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        result[`${i}.${j}`] = temp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
};

export const flattenObjToNestedObj = <T>(obj: T) => {
  const result: NestedObject = {};

  for (const key in obj) {
    const [i, j] = key.split(".");
    if (j) {
      if (!result[i]) result[i] = {};

      const temp = result[i] as NestedObject;
      temp[j] = obj[key];
    } else {
      result[i] = obj[key];
    }
  }

  return result;
};
