/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'cfonts' {
  const exports: {
    say: (
      INPUT: string,
      SETTINGS?: object,
      debug?: boolean,
      debugLevel?: number,
      size?: {
        width: number
        height: number
      }
    ) => void
    render: (
      input: string,
      SETTINGS?: any,
      debug?: boolean,
      debugLevel?: number,
      size?: {
        width: number
        height: number
      }
    ) => {
      string: string
      array: string[]
      lines: number
      options: any
    }
    Cli: (inputOptions?: object, inputArgs?: any[]) => void
  }

  export default exports
}
