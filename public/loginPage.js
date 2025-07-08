"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(returnData.error);
		}
	});
}

userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (returnData) => {
		if (returnData.success === true) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage(returnData.error);
		}
	});
}