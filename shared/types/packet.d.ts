type Packet = {
  name: string;
  description: string;
  version: string;
  versions: string[];
  dependencies: Dependency[];
  dependents: Dependency[];
  devDependencies: Dependency[];
  devDependents: Dependency[];
  url: strung;
}

type PacketResponse = {
  data: {
    project: Packet;
  }
}