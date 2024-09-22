import { URI } from '../utils/uri'

export const FsProto = "faasit-fs"

export const DocumentUri = URI.parse(`${FsProto}:///core.ft`)

// functions (a temporary solution, use pacakge import is better)
const FileFunctions = `
shape trigger {}
block http_trigger {}
block event {}
block function {}
block application {}
block provider {}
block usecase {}
block workflow {}
`

export const FileCore = `

scalar type {}
scalar any {}
scalar int {}
scalar float {}
scalar bool {}
scalar string {}
scalar empty {}

// generic types
scalar map {}
scalar array {}
scalar pair {}
scalar tuple {}

${FileFunctions}
`.trim()
