"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
	ApiConnector.login(data, (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			this.setLoginErrorMessage(returnData.error);
		}
	});
}

userForm.registerFormCallback = function(data) {
	ApiConnector.register(data, (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			this.setRegisterErrorMessage(returnData.error);
		}
	});
}