const APIUtil = require('./api_util.js');

class UsersSearch {
  constructor(el){
    this.$el = $(el);
    this.input = this.$el.find('input');
    this.$ul = this.$el.find("ul.users");
    this.handleInput();
  }
  
  renderResults(data) {
    this.$ul.empty();
    data.forEach(user => {
      let $user = $(`<li><a href="${user.id}">${user.username}</a></li>`);
      
      this.$ul.append($user);
    });
    
  }
  
  handleInput() {
    this.input.on('input', (e) =>{
      APIUtil.searchUsers(this.input.val())
        .then(this.renderResults.bind(this));
    });
  }
}

module.exports = UsersSearch;