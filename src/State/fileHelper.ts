import { IFileData } from "./googlemanager";

export const loadFile = async (fileData: IFileData): Promise<IFileData> => {
  const response = await gapi.client.drive.files.get({
    alt: "media",
    fileId: fileData.fileId,
  });

  return {...fileData, data: response.body};
};

export const saveFile = async (fileData: IFileData): Promise<any> => {
  const response = await gapi.client.request({
    body: fileData.data,
    method: "PATCH",
    params: { uploadType: "media" },
    path: `/upload/drive/v3/files/${fileData.fileId}`,
  });

  return response;
};

export const createFile = async (fileName: string): Promise<IFileData> => {
  const response = await gapi.client.drive.files.create({
    fields: "id",
    resource: { name: fileName, parents: ["appDataFolder"] },
  });

  if (response
    && response.result
    && response.result.id
  ) {

    return {fileId: response.result.id, fileName};
  }

  return Promise.reject();
};

export const deleteFile = async (fileData: IFileData): Promise<any> => {
  const response = await gapi.client.drive.files.delete({
    fileId: fileData.fileId,
  });

  return response;
};

export const getFileIds = async (): Promise<IFileData[]> => {
  const response = await gapi.client.drive.files.list({
    fields: "files(name, id)",
    spaces: "appDataFolder",
  });

  if (response
    && response.result
    && response.result.files
    && response.result.files.length > 0
  ) {
    const newFiles: IFileData[] = [];
    response.result.files.forEach((file) => {
      if (file.name && file.id) {
        newFiles.push({fileId: file.id, fileName: file.name});
      }
    });

    return newFiles;
  }

  return Promise.reject();
};
