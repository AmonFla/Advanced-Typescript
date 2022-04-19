import { User } from '../models/DataModel';

const baseUrl = 'http://localhost:8080/';
const userUrl = baseUrl + 'users';

export class DataService {

  public async getUsers(auth: string, nameQuery: string): Promise<User[]> {
    const url = userUrl + '?name=' + nameQuery;
    const options = {
      method: 'GET',
      headers:{
        Authorization: auth,
      },
    };
    const result = await fetch(url, options);
    const resultJson = await result.json();
    return resultJson;
  }

  public async deleteUsers(auth: string, user:User): Promise<void> {
    const url = userUrl + '?id=' + user.id;
    const options = {
      method: 'DELETE',
      headers:{
        Authorization: auth,
      },
    };
    await fetch(url, options);
  }
    
}