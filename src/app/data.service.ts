import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";

@Injectable({
	providedIn: "root"
})
export class DataService {
	apiUrl = "https://jsonplaceholder.typicode.com";

	constructor(private _http: HttpClient) {}

	getUsers() {
		return this._http.get<User[]>(`${this.apiUrl}//users?_limit=3`);
	}

	postUser(user: Object) {
		this._http
			.post<any>(`${this.apiUrl}/posts`, user)
			.subscribe(data => console.log(data));
	}
}
