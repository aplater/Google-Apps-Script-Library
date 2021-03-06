//==========================================================================
// Use this file to interact with Trello.com. Please expand with other methods as needed!
// API documentation: https://developers.trello.com/reference/
//==========================================================================

var TRELLO_API_KEY = "INSERT_YOUR_API_KEY";
var TRELLO_BASE_URL = "https://api.trello.com/1";
var TRELLO_MEMBER_TOKEN = "INSERT_YOUR_MEMBER_TOKEN";

function getBoardIDsForUser(username){
  return trelloGET("/members/" + username).idBoards;
}

function getBoardCards(boardID){
  return trelloGET("/boards/" + boardID + "/cards/");
}

function getListCards(listID){
  return trelloGET("/list/" + listID + "/cards/");
}

function addLabelToCard(cardID, labelID){
  trelloPOST("/cards/" + cardID + "/idLabels", {"value" : labelID});
}

function deleteLabelFromBoard(labelID){
  trelloDELETE("/labels/" + labelID);
}

function removeLabelFromCard(cardID, labelID){
  trelloDELETE("/cards/" + cardID + "/idLabels/" + labelID);
}

function createCard(cardTitle, listID){
  return trelloPOST("/cards", {"name" : cardTitle, "idList" : listID});
}

function createChecklist(cardID, checklistName){
  return trelloPOST("/cards/" + cardID + "/checklists", {"name" : checklistName});
}

function addItemToChecklist(checklistID, nameOfCheckItem){
  return trelloPOST("/checklists/" + checklistID + "/checkItems", {"name" : nameOfCheckItem});
}

function getChecklistsOnCard(cardID){
  return trelloGET("/cards/" + cardID + "/checklists/");
}

function getCheckItemsOnChecklist(checklistID){
  return trelloGET("/checklists/" + checklistID).checkItems;
}

function archiveCard(cardID){
  return trelloPUT("/cards/" + cardID, {"closed" : true});
}

function trelloGET(relativeUrl){
  var completeUrl = TRELLO_BASE_URL + relativeUrl + "?key=" + TRELLO_API_KEY + "&token=" + TRELLO_MEMBER_TOKEN;
  
  var jsonData = UrlFetchApp.fetch(completeUrl);
  return JSON.parse(jsonData.getContentText());
}

function trelloDELETE(relativeUrl, payload){  
  var completeUrl = TRELLO_BASE_URL + relativeUrl + '?key=' + TRELLO_API_KEY + '&token=' + TRELLO_MEMBER_TOKEN;
  var options = {"method" : "delete",
                 "muteHttpExceptions" : true,
                 "payload" : payload};
  
  var jsonData = UrlFetchApp.fetch(completeUrl, options);
  return JSON.parse(jsonData.getContentText()).id;
}

function trelloPOST(relativeUrl, payload){  
  var completeUrl = TRELLO_BASE_URL + relativeUrl + '?key=' + TRELLO_API_KEY + '&token=' + TRELLO_MEMBER_TOKEN;
  var options = {"method" : "post",
                 "muteHttpExceptions" : true,
                 "payload" : payload};
  
  var jsonData = UrlFetchApp.fetch(completeUrl, options);
  return JSON.parse(jsonData.getContentText()).id;
}

function trelloPUT(relativeUrl, payload){  
  var completeUrl = TRELLO_BASE_URL + relativeUrl + '?key=' + TRELLO_API_KEY + '&token=' + TRELLO_MEMBER_TOKEN;
  var options = {"method" : "put",
                 "muteHttpExceptions" : true,
                 "payload" : payload};
  
  var jsonData = UrlFetchApp.fetch(completeUrl, options);
  return JSON.parse(jsonData.getContentText()).id;
}
