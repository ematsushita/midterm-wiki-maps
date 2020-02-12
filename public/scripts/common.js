// toggleFav toggles the favourite status of a list in the db when the user clicks the heart
// it also changes the display of the heart
const toggleFav = function(listId, userId) {
  return $.post(`/favourites/${listId}`, `userId=${userId}`, () => {})
    .then((res) => {
      const favIcon = $(`.heart-icon-${listId}`);
      favIcon.toggleClass("favourited-heart");
      return res;
    });
};
