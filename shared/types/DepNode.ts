export type DepNode = {
  data: {
    id: string;
    label: string;
  };
  dependencies: string[];
  dependents: string[];
}