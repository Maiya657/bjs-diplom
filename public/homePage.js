"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function() {
	const logoutCallback = (logoutResponse) => {
		if (logoutResponse.success === true) {
			location.reload();
		};
	};
	ApiConnector.logout(logoutCallback);
};

const currentCallback = (currentResponse) => {
	if (currentResponse.success) {
		ProfileWidget.showProfile(currentResponse.data);
	}
}
ApiConnector.current(currentCallback);

function getCurrencyRates() {
	const ratesBoard = new RatesBoard();
	const ratesBoardCallback = (ratesResponse) => {
		if (ratesResponse.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(ratesResponse.data);
		}
	}
	ApiConnector.getStocks(ratesBoardCallback);
}

getCurrencyRates();

setInterval(() => {
	getCurrencyRates();
}, 60000)

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	const addMoneyCallback = (addMoneyResponse) => {
		if (addMoneyResponse.success) {
			ProfileWidget.showProfile(addMoneyResponse.data);
			moneyManager.setMessage(addMoneyResponse.success, 'Успех');
		} else {
			moneyManager.setMessage(addMoneyResponse.success, addMoneyResponse.error);
		}
	}
	ApiConnector.addMoney(data, addMoneyCallback);
}

moneyManager.conversionMoneyCallback = function(data) {
	const conversionMoneyCallback = (convertMoneyResponse) => {
		if (convertMoneyResponse.success) {
			ProfileWidget.showProfile(convertMoneyResponse.data);
			moneyManager.setMessage(convertMoneyResponse.success, 'Успех');
		} else {
			moneyManager.setMessage(convertMoneyResponse.success, convertMoneyResponse.error);
		}
	}
	ApiConnector.convertMoney(data, conversionMoneyCallback)
}

moneyManager.sendMoneyCallback = function(data) {
	const sendMoneyCallback = (sendMoneyResponse) => {
		if (sendMoneyResponse.success) {
			ProfileWidget.showProfile(sendMoneyResponse.data);
			moneyManager.setMessage(sendMoneyResponse.success, 'Успех');
		} else {
			moneyManager.setMessage(sendMoneyResponse.success, sendMoneyResponse.error);
		}
	}
	ApiConnector.transferMoney(data, sendMoneyCallback);
}

const favoritesWidget = new FavoritesWidget();

const favoritesWidgetCallback = (favoritesResponse) => {
	if (favoritesResponse.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(favoritesResponse.data);
		moneyManager.updateUsersList(favoritesResponse.data);
	}
}
ApiConnector.getFavorites(favoritesWidgetCallback);

favoritesWidget.addUserCallback = function(data) {
	const addUserCallback = (addUserResponse) => {
		if (addUserResponse.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(addUserResponse.data);
			favoritesWidget.setMessage(addUserResponse.success, 'Успех');
		} else {
			favoritesWidget.setMessage(addUserResponse.success, addUserResponse.error);
		}
	}
	ApiConnector.addUserToFavorites(data, addUserCallback);
}

favoritesWidget.removeUserCallback = function(data) {
	const removeUserCallback = (removeUserResponse) => {
		if (removeUserResponse.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(removeUserResponse.data);
			favoritesWidget.setMessage(removeUserResponse.success, 'Успех');
		} else {
			favoritesWidget.setMessage(removeUserResponse.success, removeUserResponse.error);
		}
	}
	ApiConnector.removeUserFromFavorites(data, removeUserCallback);
}