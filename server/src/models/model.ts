interface Model {
  schema: any;
  insert: (args: any) => Promise<void>;
  truncate: () => Promise<void>;
}

export default Model;
