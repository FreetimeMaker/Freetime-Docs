declare module '@localSearchIndex' {
  const indexes: Record<string, (() => Promise<{ default: string }>) | undefined>
  export default indexes
}
