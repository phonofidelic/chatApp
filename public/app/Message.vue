<template>
	<li v-on:click="this.openReply" 
		class="message" 
		:class="{ active: isActive }">
		<div>{{text}}
			<span class="has-reply" 
				  v-show="replies.lentgth > 0">*
			</span>
		</div>
		<div class="replies" 
			 v-show="isActive" 
			 v-for="reply in replies">{{reply.text}}
		</div>
	</li>
</template>

<script>
	module.exports ={
		data: function() {
			return {
				currentReply: '',
				isActive: false
			}
		},
		props: ['text', '_id', 'created-at', 'replies'],
		template: '<li v-on:click="this.openReply" class="message" :class="{ active: isActive }"><div>{{text}}<span class="has-reply" v-show="replies.lentgth > 0">*</span></div><div class="replies" v-show="isActive" v-for="reply in replies">{{reply.text}}</div></li>',
		methods: {
			openReply: function() {
				console.log('openReply', this);
				var self = this;
				// set currentRoute to selected message
				app.currentRoute = '/messages/'+this._id+'/replies';
				app.currentRouteId = this.id;
				console.log('currentRoute:', app.currentRoute);
				// app.messages.forEach(function(message) {
				// 	message.isActive = true;
				// });
				this.isActive = !this.isActive;
			},
			getReplies: function() {
				// var self = this;
				this.$http.get('/messages/'+this.id+'/replies').then(function(response) {
					console.log('replies:', response);
					// response.data.replies.forEach(function(reply) {
					// 	this.replies.push(reply);
					// });
	 			});
			},
			test: function() {
				console.log('test')
			}
		}
	}
</script>