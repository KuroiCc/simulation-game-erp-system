const FOLDER_ID = "0AEy2n6Az7CMUUk9PVA";
const SSID = "1eiTJgfaf5cOlXPLhcxi2_3_ss8hMOXPzk5xm8TE_Ro8";
var DB = getSS(SSID);

function doGet() {
  return HtmlService.createTemplateFromFile("index").evaluate();
}

var testPost
function doPost(e){
  switch(e.parameter.nowAction){
    case "buy":
      var sheetName = "在庫変動予定表　" + e.parameter.itme;
      var sheet = DB.getSheetByName(sheetName);
      //var sheet2 = DB.getSheetByName("発注履歴");
      
      
      var changeDate = Number(e.parameter.date) +  Number(e.parameter.nouki);
      var LastRow = sheet.getLastRow() + 1;
      var ssExp = "=C" + sheet.getLastRow() + "+B" + LastRow;
      sheet.appendRow([changeDate, e.parameter.num, ssExp]);
      //sheet2.appendRow([e.parameter.date, e.parameter.itme, e.parameter.nouki, e.parameter.price, e.parameter.num]);
      
      var sortRange = "A2:D" + LastRow;
      rangeSort(sheet, sortRange, 1, true);
      testPost = sheetName + changeDate + e.parameter.num + ssExp + sortRange;
      break;
     
    case "doBuy":
      var newFlieName = "T" + e.parameter.date + "-G01-発注書";
      var newfileId = copySS("1mne7hvV-JPlypyJN4AkQ9TCldXO-WK7BCLj7R3HhMio", "1gj5NjuzNeR8qJWYOXbnr6TcJ_rOUI7Qw", newFlieName);
      var newSS = getSS(newfileId);
      var newSSsheet = newSS.getSheets()[0];
      newSSsheet.getRange(4, 6).setValue("T" + e.parameter.date);
      //var tDate = newSSsheet.getDataRange().getValues();
      
      //var needDate = new Array();
      //var t = new Array();
      //for(var i in tDate){
      //  if(tDate[i][0]==e.parameter.date){
      //    t = [tDate[i][1], tDate[i][2], tDate[i][3], tDate[i][4], Number(tDate[i][3]) * Number(tDate[i][4])];
      //    needDate.push(t);
      //  }
      //}
      //needDate = [["消しゴム",2,50,50,250],["消しゴム",2,50,50,250]];
      //var under = 6 + needDate.length
      //newSSsheet.getRange("B7:F" + under).setValues(needDate);
      //break;
      
   
  }
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function getSS(id){
  return SpreadsheetApp.openById(id);
}

function getData(sheet, row, column, numRows, numColumns){
  var values = sheet.getRange(row, column, numRows, numColumns).getValues();
  return values;
}

function rangeSort(sheet, sortRange, columnPosition, ascending){
  var range = sheet.getRange(sortRange);
  var strSort = {column: columnPosition, ascending: ascending}
  range.sort(strSort);
}

function copySS(fileId, folderId, newFlieName){
  // テンプレートファイル
  var templateFile = DriveApp.getFileById(fileId);
  // 出力フォルダ
  var OutputFolder = DriveApp.getFolderById(folderId);
  
  var newfile = templateFile.makeCopy(newFlieName, OutputFolder);
  return newfile.getId();
}

/*
function getLastTenData(ss, name, numColumns){
  var sheet = ss.getSheetByName(name);
  var values = sheet.getRange(sheet.getLastRow() - 10, 1, 10, numColumns).getValues();
  return values;
}*/

//以下テストコード
function getByName(){
  var teamDrives = Drive.Teamdrives.list().items
  return teamDrives
}

function getAllFileList(){
  const files = DriveApp.getFolderById(FOLDER_ID).getFiles();
  var a = files.next();
  const filename = files.next().getName();
  return filename;
}


var ttt
!function tt(){
  ttt = "test";
}()

function t(){
  return ttt;
}