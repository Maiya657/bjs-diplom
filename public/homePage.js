"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function() {
	ApiConnector.logout((logoutResponse) => {
		if (logoutResponse.success === true) {
			location.reload();
		};
	});
};

ApiConnector.current((currentResponse) => {
	if (currentResponse.success) {
		ProfileWidget.showProfile(currentResponse.data);
	}
});

function getCurrencyRates() {
	const ratesBoard = new RatesBoard();
	ApiConnector.getStocks((ratesResponse) => {
		if (ratesResponse.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(ratesResponse.data);
		}
	});
}

getCurrencyRates();

setInterval(() => {
	getCurrencyRates();
}, 60000)

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (addMoneyResponse) => {
		if (addMoneyResponse.success) {
			ProfileWidget.showProfile(addMoneyResponse.data);
			moneyManager.setMessage(addMoneyResponse.success, `Пополнение счета на сумму ${data.amount} ${data.currency} выполнено успешно`);
		} else {
			moneyManager.setMessage(addMoneyResponse.success, addMoneyResponse.error);
		}
	});
}

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (convertMoneyResponse) => {
		if (convertMoneyResponse.success) {
			ProfileWidget.showProfile(convertMoneyResponse.data);
			moneyManager.setMessage(convertMoneyResponse.success, `Конвертация ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} выполнена успешно`);
		} else {
			moneyManager.setMessage(convertMoneyResponse.success, convertMoneyResponse.error);
		}
	});
}

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (sendMoneyResponse) => {
		if (sendMoneyResponse.success) {
			ProfileWidget.showProfile(sendMoneyResponse.data);
			moneyManager.setMessage(sendMoneyResponse.success, `Перевод ${data.amount} ${data.currency} выполнен успешно`);
		} else {
			moneyManager.setMessage(sendMoneyResponse.success, sendMoneyResponse.error);
		}
	});
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((favoritesResponse) => {
	if (favoritesResponse.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(favoritesResponse.data);
		moneyManager.updateUsersList(favoritesResponse.data);
	}
});

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (addUserResponse) => {
		if (addUserResponse.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(addUserResponse.data);
			favoritesWidget.setMessage(addUserResponse.success, `Пользователь ${data.name} добавлен в избранное`);
			moneyManager.updateUsersList(addUserResponse.data);
		} else {
			favoritesWidget.setMessage(addUserResponse.success, addUserResponse.error);
		}
	});
}

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (removeUserResponse) => {
		if (removeUserResponse.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(removeUserResponse.data);
			favoritesWidget.setMessage(removeUserResponse.success, `Пользователь №${data} удален из избранного`);
			moneyManager.updateUsersList(removeUserResponse.data);
		} else {
			favoritesWidget.setMessage(removeUserResponse.success, removeUserResponse.error);
		}
	});
}