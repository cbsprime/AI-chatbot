//Attach wave effect to buttons and other elements
Waves.attach(".btn");
Waves.init();

//PORTFOLIO INFO START

//Insert products info here
const products = [{ "title": "Designing for Success: Creating Business Value with Mobile UX", 
					"description" : " Measured the user experience (UX) of an e-commerce website before and after it was optimized for mobile devices and used Google Analytics to follow user behavior. The company observed a 10.4% increase in number of mobile transactions, with a 32% increase in the average value of these transactions.", 
					"banner" : "https://i.imgur.com/n1ShCxl.jpg",
					"url" : "https://digitalcommons.wpi.edu/cgi/viewcontent.cgi?referer=http://georgikdz.com/&httpsredir=1&article=1041&context=uxdmrl-pubs" },
					{ "title": "App-Like Mobile Optimization and User Experience", 
					"description" : "Developed two mobile designs for an e-commerce website and tested their impact the on user experience. Mobile unique traffic visits increased by 27%; Sales increased by 25.3% due to improvements in the workflow.", 
					"banner" : "https://i.imgur.com/Hk5a600.png", 
					"url" : "https://digitalcommons.wpi.edu/cgi/viewcontent.cgi?referer=http://georgikdz.com/&httpsredir=1&article=1038&context=uxdmrl-pubs"}];
//Insert projects info here
const projects = [{ "title": "Athgothon 2015 - 6th Global Innovation Forum @World Bank's HQ", 
					"description" : "Led an international team of 6 during the business development of a new social enterprise. Pitched the venture to a panel of 5 judges and 200 delegates from 42 countries.", 
					"banner" : "https://i.imgur.com/oIi8Hf2.png",
					"url" : "https://prezi.com/ydflx3_nher5/team-abyasa-final-presentation/" },
					{ "title": "Startup Weekend EDU", 
					"description" : "Built amobile app that makes practicing a foreign language mobile, casual and fun over the course of one weekend with other start-up enthusiasts. Received coaching from experienced industry professionals to validate the idea and proved there was a problem area. Pitched the idea to a panel of judges.",
					"banner" : "https://i.imgur.com/Lr03i2X.png",
					"url" : "http://georgikdz.com/documents/presentation-boston-startup-weekend-edu.pdf" },
					{ "title": "Engineers for the Greater Good", 
					"description" : "Developed a social entrepreneurship project aiming to prevent loss of tomato seedlings to monsoon rains in Nashik, India. Our team solved this problem by designing a floating greenhouse to protect the seedlings of small-scale Indian from the severe weather through a controlled nursery environment and shelter.", 
					"banner" : "https://i.imgur.com/oO6NvJF.png",
					"url" : "http://georgikdz.com/documents/presentation-engineers-for-the-greater-good-at-northeaster-university.pdf" },
					{ "title": "Good Morning App", 
					"description" : "The “Good Morning” Application Package is a set of four independent applications, each bringing a specific aspect to your morning experience. Course project for BUS 3010 - Creating Value Through Innovation class.", 
					"banner" : "https://i.imgur.com/M7qfpeR.png",
					"url" : "https://www.youtube.com/watch?v=YUcm5vwMRUQ"}];

//PORTFOLIO INFO END


//REACT COMPONENTS START

//Class for individual products/projects card
class Card extends React.Component {
  render() {
  	return (

  		<div className="card animated bounceIn">
		    <div className="pageImg d-flex align-items-center">
		      <a href={this.props.url} target="_blank"><img src={this.props.banner}></img></a>
		    </div>
		    <div className="pageInfo">
		      <a href={this.props.url} className="pageTitle" target="_blank"><h1>{this.props.title}</h1></a>
		      <p className="pageDescription">{this.props.description}</p>
		    </div>
		</div>

  	);
  }
}

//Class for groups of cards
class Cards extends React.Component {
	render() {
		var cards = [];
		if (this.props.type == "products") {
			for (var i = 0; i < products.length; i++ ) {
				cards.push(<Card key={i} banner={products[i].banner} title={products[i].title} description={products[i].description} url={products[i].url} />)
			}
		} else {
			for (var i = 0; i < projects.length; i++ ) {
				cards.push(<Card key={i} banner={projects[i].banner} title={projects[i].title} description={projects[i].description} url={projects[i].url} />)
			}
		}

		return (
			<div className="cards d-flex flex-row justify-content-center flex-wrap" id={"cards-"+this.props.type}>{cards}</div>
		);
	}
}

//Class for messages made by the bot
class MessageBot extends React.Component {
	render() {
		
		var props = this.props.message;
		var ids = this.props.id;
		var messages = [];

		for (var i = 0; i < props.length; i++ ) {
			messages.push(<li key={i} className="chatBubble" id={ids[i]}>{props[i]}</li>);
		}

		return (

			<div className="chatContainer animated slideInUp d-flex flex-row justify-content-start align-items-end">
				<div className="thumbnail" id={"pic-"+ids[0]}>
					<img src="https://i.imgur.com/1kzUTUe.png"></img>
				</div>
				<ul className="chatBubbles">
					{messages}
				</ul>
			</div>

		);
	}
}

//Class for messages made by user
class MessageUser extends React.Component {
	render() {
		return (
			<div className="chatBubble chatReply animated slideInUp chatContainer align-self-end" id={this.props.id}>{this.props.message}</div>
		);
	}
}

//REACT COMPONENTS END

//REACT RENDERING + ANIMATIONS START

const totalMessages = 14; //Number of total messages goes here
var messagesRemaining = 9; //Number of messages remaining after intro

const outroMessage = "Thanks for hanging out with me! If you want to see Georgi's complete portfolio or chat with him, visit www.georgikdz.com or drop him a line at gkardzhaliysky@gmail.com 🙃";
const outroID = "outro";

$(document).on("click", "#btnProducts", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProd1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Show me Georgi's publications!" id={"chat-"+idProd1}/>, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Here ya go 😎"];
	var idProd2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProd2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render products cards
	ReactDOM.render(<Cards type="products" />, document.getElementById('products'));
	$(".replyButtons").before($("#products").html());	

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["Anything else?"];
		var idProd3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProd3 = outroID;
	}

	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProd3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProd1).slideToggle();
	setTimeout(function(){ $("#btnProducts").remove();; }, 400);
	setTimeout(function(){ $("#chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-products .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); }, 3400);

});

$(document).on("click", "#btnProjects", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProj1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me about Georgi's awesome projects" id={"chat-"+idProj1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Sure thing"];
	var idProj2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProj2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render projects cards
	ReactDOM.render(<Cards type="projects" />, document.getElementById('projects'));
	$(".replyButtons").before($("#projects").html());

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["What else would you like to know about Georgi? 🤔"];
		var idProj3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProj3 = outroID;
	}
	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProj3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());


	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProj1).slideToggle();
	setTimeout(function(){ $("#btnProjects").remove(); }, 400);
	setTimeout(function(){ $("#chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-projects .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); }, 3400);

});

$(document).on("click", "#btnAboutMe", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idAbout1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me more about Georgi 🙂" id={"chat-"+idAbout1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());
	//Set messages for 'about me' reply
	var aboutMe1 = "Does this mean we're now friends? 😁";
	var id1 = "chat-"+(totalMessages - messagesRemaining).toString();
	var aboutMe2 = "Georgi Kardzhaliyski is from Bulgaria, a country in Eastern Europe. He has a very long last name, doesn't he? Let me help you with the pronouncuation! His name is pronounced GEE-yor-gee KARRD-za-lisk-ee. Oh, you can see his last name under two publications in Human-Computer Interaction (HCI) conferences in Milan and Crete."
	/*Oh, he's writing a script about a TV series. Check out his blog, www.georgikd.com/blog, to read his stories. He'd love to hear your feedback!*/
	var id2 = "chat-"+(totalMessages - messagesRemaining + 1).toString();
	var aboutMe3 = "Btw, Georgi is currently actively looking for a Customer Success / Advocate or Junior Product Manager position in the Greater Boston Area. He's open to relocation. If you have any leads, shoot him an email at gkardzhaliysky@gmail.com! 👍";
	var id3 = "chat-"+(totalMessages - messagesRemaining + 2).toString();
	var botFollowUp = "Anyhow, wanna see Georgi's work?";
	var botGoodbye = "Thanks for hanging out with me! 👋"
	var id4	 = "chat-"+(totalMessages - messagesRemaining + 3).toString();

	//Only include bot follow up if this is not the final prompt
	if ($(".replyButtons").children().length > 1) {
		var messages = [aboutMe1, aboutMe2, aboutMe3,botFollowUp];
		var ids = [id1, id2, id3, id4];
	} else {
		var messages = [aboutMe1, aboutMe2, aboutMe3,botGoodbye];
		var ids = [id1, id2, id3, id4];
	}

	//Render 'about me' replies
	ReactDOM.render(<MessageBot message={messages} id={ids} />, document.getElementById('aboutMe'));
	messagesRemaining = messagesRemaining - ids.length;
	$(".replyButtons").before($("#aboutMe").html());
	
	//Animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idAbout1).slideToggle();
	setTimeout(function(){ $("#btnAboutMe").remove(); }, 400);
	setTimeout(function(){ $("#"+id1).slideToggle(); }, 1000);
	setTimeout(function(){ $(".container .thumbnail").last().slideToggle(); }, 1000);
	setTimeout(function(){ $("#"+id2).slideToggle(); }, 2000);
	setTimeout(function(){ $("#"+id3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#"+id4).slideToggle(); }, 4000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 4000);
	setTimeout(function(){ updateScroll(); }, 4400);

});

//REACT RENDERING + ANIMATIONS END

//INTRO ANIMATION START

//function to detect when animations end
var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

setTimeout(function(){$("#chat-1, #pic-intro").slideToggle()}, 200);
$('#chat-1').one(animationEnd, function(){
	setTimeout(function(){$("#chat-2").slideToggle()}, 100);
	$('#chat-2').one(animationEnd, function(){
		setTimeout(function(){$("#chat-3").slideToggle()}, 100);
		$('#chat-3').one(animationEnd, function(){
			setTimeout(function(){$("#chat-4").slideToggle()}, 100);
			$('#chat-4').one(animationEnd, function(){
				$(".replyButtons").css("visibility", "visible");
				$(".replyButtons").addClass("animated fadeIn");
			});
		});
	});
});

//INTRO ANIMATION END

//FUNCTIONS

//scroll to bottom of page
function updateScroll() {
	if ($(".container").height() > $(window).height()) {
		$(".container").removeClass("fixed-bottom");
	}
	$(document).scrollTop($(".container")[0].scrollHeight);
}