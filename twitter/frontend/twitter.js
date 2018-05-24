const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');


window.UsersSearch = UsersSearch;
window.FollowToggle = FollowToggle;

$(() => {
  const $buttons = $('button.follow-toggle');
  $buttons.each((i, el) => {
    let test = new FollowToggle(el);
  });
  const $el = $('nav.users-search');
  const $usersSearch = new UsersSearch($el);
  window.$usersSearch = $usersSearch;
});

