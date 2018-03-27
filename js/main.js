/*
global $
global db
global filterXSS
*/
'use strict';

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

console.log("Main JS loaded.");


// Any things (that happen i.e. function calls) that rely on things in the DOM goes in here
$(document).ready(start => {
	
	getComments(
		loadComments,
		(error) => console.log(error)
	);
	
	$('#comment-submit').click(function() {
		let comment = {
			body: $('#comment-text').val(),
			user: {
				name: user.displayName,
				id: user.uid
			},
			date: getDate()
		};
		db.ref("Comments").push(comment);
		location.reload();
	});
});

function getComments(success, failure) {
	return db.ref("Comments").once("value").then(
		function(snapshot) {
			success(snapshot.val());
		},
		function(error) {
			failure(error);
		}
	);
}

function loadComments(comments) {
	console.log(comments);
	let frag = document.createDocumentFragment();
	for(let comment in comments) {
		if(comments.hasOwnProperty(comment)) {
			let clone = document.importNode($('#commentTemplate')[0].content, true);
			clone.querySelector('td').dataset['id'] = comment;
			clone.querySelector('.cDate').innerHTML = filterXSS(comments[comment].date);
			clone.querySelector('.cUser').innerHTML = filterXSS(comments[comment].user.name);
			clone.querySelector('.cComment').innerHTML = filterXSS(comments[comment].body);
			frag.appendChild(clone);
		}
	}
	$('#commentsGoHere').append(frag);
}

function getDate() {
	let date = new Date();
	let monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];
	
	let day = date.getDate();
	let monthIndex = date.getMonth();
	let year = date.getFullYear();
	let minutes = '0';
	if(date.getMinutes() > 9) minutes = date.getMinutes();
	else minutes = '0' + date.getMinutes();
	let time = '0';
	if(date.getHours() > 12) time = date.getHours()-12 + ':' + minutes + ' pm';
	else time = date.getHours() + ':' + minutes + ' pm';
	
	return monthNames[monthIndex] + ' ' + day + ' ' + year + ' ' + time;
}