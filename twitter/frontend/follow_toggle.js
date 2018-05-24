const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render = this.render.bind(this);
    this.handleClick();
  }
  
  render() {
    if (this.$el.text() === 'Unfollow') {
      this.$el.text("unfollowing");
      this.$el.prop("disabled", true);
    } else if (this.$el.text() === 'unfollowing') {
      this.$el.text('Follow!');
      this.$el.prop("disabled", false);
    } else if (this.$el.text() === 'Follow!') {
      this.$el.text("following");
      this.$el.prop("disabled", true);
    } else if (this.$el.text() === 'following') {
      this.$el.text('Unfollow');
      this.$el.prop("disabled", false);
    }

  }
  
  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      this.render();
      if (this.followState === false) {
        APIUtil.followUser(this.userId)
          .then(this.followPromise.bind(this)); 
      } else {
        APIUtil.unfollowUser(this.userId)
          .then(this.followPromise.bind(this));
      }
    });
  }
  
  followPromise(response) {
    if(this.followState){
      this.followState = false;
    }else {
      this.followState = true;
    }
    this.render();
  }
}

module.exports = FollowToggle;