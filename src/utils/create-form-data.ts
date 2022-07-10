export class CreateFormData {
  static createFormData(obj: any) {
    const objEntries = Object.entries(obj);
    const formData = new FormData();

    for (const objEntry of objEntries) {
      if (objEntry[1] instanceof File) formData.append(objEntry[0], objEntry[1]);
      else formData.append(objEntry[0], String(objEntry[1]));
    }

    return formData;
  }

  static createFormDataRemoveEmpty(obj: any) {
    const objEntries = Object.entries(obj);
    const formData = new FormData();

    for (const objEntry of objEntries) {
      if (objEntry[1] instanceof File) formData.append(objEntry[0], objEntry[1]);
      if (objEntry[1] !== '' && objEntry[1] !== undefined) {
        formData.append(objEntry[0], String(objEntry[1]));
      }
    }

    return formData;
  }
}
