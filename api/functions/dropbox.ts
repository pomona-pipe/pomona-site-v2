/* eslint-disable camelcase */
import { Dropbox } from 'dropbox/dist/Dropbox-sdk.min'
import fetch from 'isomorphic-fetch'
import ImgixClient from 'imgix-core-js'
import { writeFile, existsSync, rmdirSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

// create dropbox instance
const dropbox = (() => {
  const {
    DROPBOX_APP_KEY,
    DROPBOX_APP_SECRET,
    DROPBOX_ACCESS_TOKEN
  } = process.env
  return createDropbox(
    DROPBOX_ACCESS_TOKEN!,
    DROPBOX_APP_KEY!,
    DROPBOX_APP_SECRET!
  )
})()

// TODO: typing for filePath object: dropboxPath, savePath
export async function downloadDropboxFiles(filePaths: any[]) {
  //Assumes same folder for all files
  const saveFolder = resolve(dirname(filePaths[0].savePath))

  //If Folder Exists, Removes Folder
  if (existsSync(saveFolder)) {
    rmdirSync(saveFolder, { recursive: true })
  }

  // Create Folder
  mkdirSync(resolve(saveFolder), { recursive: true })

  //Download Dropbox files and save to file system
  for (const path of filePaths) {
    const { dropboxPath, savePath } = path
    const fileBuffer = ((await dropbox.filesDownload({ path: dropboxPath })) as any).fileBinary
    writeFile(savePath, fileBuffer, (err) => {
      if (err) {
        return console.log(`error: ${err}`)
      }
      console.log(`File saved: ${savePath}`)
    })

  }
}

export async function createFileResults(
  dropboxPath: string,
  fileTypes: FileType[],
  page: number,
  show: number,
  serverUrl: string
) {
  // build results
  const files = await getDropboxFilesByPage(
    dropboxPath,
    dropbox,
    page,
    show,
    fileTypes
  )
  const results: IPrismicResult[] = []
  // TODO: typing for filePath object: dropboxPath, savePath
  const filePaths: any[] = []
  for (const file of files) {
    const { id, client_modified, path_lower } = file
    const name = file.name.split(' ').join('_')
    const fileInfo = getFileInfo(name)
    const { type, folder } = fileInfo
    const filePath = `dropbox/${folder}/${name}`
    const fileUrl = `${serverUrl}/${filePath}`

    const thumbnail = getThumbnail(fileUrl, type, serverUrl)
    results.push({
      id,
      title: name,
      description: type,
      image_url: thumbnail,
      last_update: Number(new Date(client_modified)),
      blob: { fileUrl }
    })
    filePaths.push({ dropboxPath: path_lower!, savePath: `static/${filePath}` })
  }
  // structure response
  const response = {
    prismic: {
      results_size: results.length,
      results
    },
    filePaths
  }
  return response
}

function createDropbox(
  accessToken: string,
  clientId: string,
  clientSecret: string
) {
  // create dropbox instance
  const options: DropboxTypes.DropboxOptions = {
    fetch,
    accessToken,
    clientId
  }
  const dropbox = new Dropbox(options)
  dropbox.setClientSecret(clientSecret)
  return dropbox
}

async function getDropboxFilesByPage(
  path: string,
  dropbox: Dropbox,
  page: number,
  show: number,
  fileTypes: FileType[]
) {
  // structure ListFolder Arg
  const listFolderArg: DropboxTypes.files.ListFolderArg = {
    path,
    recursive: true,
    include_media_info: false,
    include_deleted: false,
    include_has_explicit_shared_members: false,
    include_mounted_folders: false,
    include_non_downloadable_files: false
  }
  // retrieve initial results
  const listFolderResult = await dropbox.filesListFolder(listFolderArg)
  const entries = listFolderResult.entries as DropboxTypes.files.FileMetadataReference[]
  const { cursor, has_more } = listFolderResult
  // retrieve remaining results
  if (has_more) {
    const remainingListFolderResult = await dropbox.filesListFolderContinue({
      cursor
    })
    const remainingEntries = remainingListFolderResult.entries as DropboxTypes.files.FileMetadataReference[]
    entries.push(...remainingEntries)
  }
  // filter just files
  let fileResults = entries.filter((entry) => entry['.tag'] === 'file')
  // filter file types
  fileResults = fileResults.filter((file) =>
    fileTypes.includes(getFileInfo(file.name).type)
  )
  // return correct page
  const start = page * show - show
  const end = start + show
  const pageResults = fileResults.slice(start, end)
  return pageResults
}

function getFileInfo(fileName: string): FileInfo {
  const suffix = fileName
    .split('.')
    .slice(-1)[0]
    .toLowerCase()
  switch (suffix) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: 'Image',
        folder: 'images'
      }
    case 'pdf':
      return {
        type: 'PDF',
        folder: 'pdfs'
      }
    case 'doc':
    case 'docx':
      return {
        type: 'Word Document',
        folder: 'docx'
      }
    case 'xls':
    case 'xlsx':
    case 'csv':
      return {
        type: 'Spreadsheet',
        folder: 'spreadsheets'
      }
    case 'ppt':
    case 'pptx':
      return {
        type: 'PowerPoint',
        folder: 'powerPoints'
      }
    default:
      return {
        type: 'File',
        folder: 'otherFiles'
      }
  }
}

function getThumbnail(fileUrl: string, fileType: FileType, serverUrl: string) {
  switch (fileType) {
    case 'Image':
      return getImgThumbnail(fileUrl)
    case 'PDF':
      return `${serverUrl}/icons/file-pdf.svg`
    case 'Word Document':
      return `${serverUrl}/icons/file-word.svg`
    case 'Spreadsheet':
      return `${serverUrl}/icons/file-excel.svg`
    case 'PowerPoint':
      return `${serverUrl}/icons/file-powerpoint.svg`
    default:
      return `${serverUrl}/images/file-image.svg`
  }
}

// FIXME: extract Imgix credentials into env vars (do not want to expose)
function getImgThumbnail(imgLink: string) {
  const client = new ImgixClient({
    domain: 'pomona-pipe.imgix.net',
    secureURLToken: 'w6G8DKrWqCVPqfrf'
  })
  return client.buildURL(`${imgLink}?w=80&h=80`)

}
