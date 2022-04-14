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

export const flattenObj = <T>(obj: T) => {
  // The object which contains the
  // final result
  const result: FlattenObject = {};

  // loop through the object "ob"
  for (const i in obj) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        // Store temp in result
        result[j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = obj[i];
    }
  }
  return result;
};
