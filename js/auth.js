/*
global $
global firebase
global db
*/
var user = firebase.auth().currentUser;	// may start out as undefined
var dbhandler = db.ref();
var provider = new firebase.auth.GithubAuthProvider();


$(document).ready(start => {
	/*window.fbAsyncInit = function() {
		FB.init({
		  appId      : '242234869514899',
		  cookie     : true,
		  xfbml      : true,
		  version    : 'v2.8'
		});
		FB.AppEvents.logPageView();   
	};

	(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));*/
	
	
	// FIXME: causing issues bc async
	firebase.auth().onAuthStateChanged(function(_user) {
		console.log('auth state changed');
		if(_user) {
			//Logged in
			user = _user;
			$('#message').html(`Welcome, ${_user.displayName}!`);
			$('#git-login').hide();
			$('#logout').show();
			$('#comment-box').show();
			$('#commentsGoHere').show();
			$('#comment-text').show();
			$('#comment-submit').show();
			$('#comment-login').hide();
		} else {
		   	$('#git-login').show();
		   	$('#logout').hide();
			$('#message').html('Login');
			$('#commentsGoHere').hide();
			$('#comment-text').hide();
			$('#comment-submit').hide();
			$('#comment-login').show();
		}
	});
	
	$("#git-login").click(function(evt){
	    firebase.auth().signInWithPopup(provider).then(function(result) {
		      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
		      //var token = result.credential.accessToken;
		      // The signed-in user info.
		      user = result.user;
		    
		    $('#message').html(`User ID: ${user.uid} email: ${user.email}`);
		});
	});
	
	$('#logout').click(function(evt){
	    firebase.auth().signOut();
	    $('#message').html(`Logged Out.`);
	});
});