import { Component, OnInit } from "@angular/core";
import { User } from "./user.model";
import { DataService } from "./data.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styles: [
		`
			.custom-action-btn {
				min-width: 100px;
			}
		`
	]
})
export class AppComponent implements OnInit {
	users$: User[];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		return this.dataService.getUsers().subscribe(data => (this.users$ = data));
	}

	title: String = "comland";

	userInputs = {
		name: "",
		email: "",
		phone: "",
		gender: ""
	};

	nameInvalid = false;
	emailInvalid = false;

	clearInputFields() {
		this.userInputs = {
			name: "",
			email: "",
			phone: "",
			gender: ""
		};
	}

	onDelete(i: number) {
		this.users$ = this.users$.filter((_user, index) => index !== i);
	}

	onSubmit() {
		// Validate name
		this.nameInvalid = this.userInputs.name ? false : true;

		// Validate email
		const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.emailInvalid =
			this.userInputs.email &&
			!emailRe.test(this.userInputs.email.toLowerCase())
				? true
				: false;

		// Return if invalid fields
		if (this.nameInvalid || this.emailInvalid) return;

		// Clear validations
		this.emailInvalid = false;
		this.nameInvalid = false;

		// Update local state
		this.users$.push(this.userInputs);

		// Post to API
		this.dataService.postUser(this.userInputs);

		// Clear input fields
		this.clearInputFields();
	}
}
