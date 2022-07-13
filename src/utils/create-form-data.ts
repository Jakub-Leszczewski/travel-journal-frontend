import { log } from 'util';

export class CreateFormData {
  static createFormData(obj: any, excludedKey?: any[]) {
    const objEntries = Object.entries(obj);
    const formData = new FormData();

    for (const objEntry of objEntries) {
      if (objEntry[1] instanceof File) formData.append(objEntry[0], objEntry[1]);
      else if (!excludedKey?.includes(objEntry[0])) formData.append(objEntry[0], String(objEntry[1]));
    }

    return formData;
  }

  static createFormDataRemoveEmpty(obj: any, removeKeyExcluded?: string[]) {
    const objEntries = Object.entries(obj);
    const formData = new FormData();

    for (const objEntry of objEntries) {
      if (objEntry[1] instanceof File) formData.append(objEntry[0], objEntry[1]);
      if (removeKeyExcluded?.includes(objEntry[0]) || (objEntry[1] !== '' && objEntry[1] !== undefined)) {
        formData.append(objEntry[0], String(objEntry[1]));
      }
    }

    return formData;
  }
}
