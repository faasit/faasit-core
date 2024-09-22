import type { URI } from 'vscode-uri'
import { types } from '../ir'

export interface FileSystemNode {
  readonly isFile: boolean
  readonly isDirectory: boolean
  readonly uri: URI
}

/**
 * Provides methods to interact with an abstract file system. The default implementation is based on the node.js `fs` API.
 * Copy from langium
 */
export interface FileSystemProvider {
  /**
   * Reads a document asynchronously from a given URI.
   * @returns The string content of the file with the specified URI.
   */
  readFile(uri: URI): Promise<string>
  /**
   * Reads a document synchronously from a given URI.
   * @returns The string content of the file with the specified URI.
   */
  readFileSync(uri: URI): string
  /**
   * Reads the directory information for the given URI.
   * @returns The list of file system entries that are contained within the specified directory.
   */
  readDirectory(uri: URI): Promise<FileSystemNode[]>
}

export interface StreamReader {
  next(): Promise<IteratorResult<string>>
  [Symbol.asyncIterator](): AsyncIterableIterator<string>
}

export interface CommandProcess {
  stdout: StreamReader | null
  stderr: StreamReader | null
  wait: () => Promise<{ exitcode: number }>

  // helpers
  readOut(cb: (v: string) => void): Promise<void>
  readErr(cb: (v: string) => void): Promise<void>
}

export interface PluginRuntime {
  runCommand(cmd: string, options?: { args?: string[], shell?: boolean, cwd?: string, stdio?: 'inherit' | 'pipe' }): CommandProcess

  joinPath(...path: string[]): string
  writeFile(path: string, content: string): Promise<void>
  removeFile(path: string): Promise<void>
  fileExists(path: string): Promise<boolean>
}

export interface PluginLogger {
  info(msg: string): void
  warn(msg: string): void
  error(msg: string, options?: { error?: Error | null }): void
}
