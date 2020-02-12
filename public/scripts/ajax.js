const getPoints = function() {
  return $.get(`../points/${listId}`, data => data);
};

