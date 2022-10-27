import { fetch } from '../fetch';

const host = 'https://code.devops.fds.com';
const apiProjects = `${host}/api/v4/projects`;

class Repo {
  async getByName(name: string) {
    const responseText = await fetch(`${apiProjects}?simple=true&search_namespaces=true&search=${encodeURI(name)}`);
    const data = JSON.parse(responseText);
    return data;
  }


  async getBranches(id: string) {
    const url = `${apiProjects}/${id}/repository/branches?simple=true`;
    const result = JSON.parse(await fetch(url));
    return result;
  }

  async getPackageJSON(id: string, branch: string) {
    return this.getFile(id, 'package.json', branch)
  }

  async getFile(projectId: string, filename: string, branch: string) {
    const url = `${apiProjects}/${projectId}/repository/files/${filename}/raw?ref\=${branch}`;
    const result = JSON.parse(await fetch(url));
    return result;
  }
}

export const repo = new Repo();