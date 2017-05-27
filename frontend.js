(function(){

	var app = angular.module('phoneBook', []);

	app.controller('mainControl', ['$http', '$timeout', function($http, $timeout){

		var self = this;

		self.updated = false;
		self.added = false;
		self.deleted = false;

		var refresh = function(){
			$http.get('/contactList').then(function(response){
				self.contacts = response.data;
				self.contact = {};
			});
		};

		refresh();

		self.editingOnly = function(){
			if(self.contact._id) return false;
			else return true;
		};

		self.addContact = function(){
			$http.post('/contactList', self.contact).then(function(response){
				self.added = true;
				refresh();
			});
			$timeout(function(){self.added = false;}, 1000);
		};

		self.deleteContact = function(id){
			$http.delete('/contactList/' + id).then(function(response){
				self.deleted = true;
				refresh();
			});
			$timeout(function(){self.deleted = false;}, 1000);
		};

		self.editContact = function(contact){
			self.contact = contact;
		};

		self.updateContact = function(){
			$http.put('/contactList/' + self.contact._id, self.contact).then(function(response){
				self.updated = true;
				refresh();
			});
			$timeout(function(){self.updated = false;}, 1000);
		};

		self.clearField = function(){
			self.contact = {};
		}

	}]);

}) ();