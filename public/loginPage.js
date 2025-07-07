"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
	const loginCallback = (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			this.setLoginErrorMessage(returnData.error);
		}
	};
	ApiConnector.login(data, loginCallback);
}

userForm.registerFormCallback = function(data) {
	const registerCallback = (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			this.setRegisterErrorMessage(returnData.error);
		}
	};
	ApiConnector.register(data, registerCallback);
}