

var sunClass = ["rowIndex", "fontIcon", "uniCol", "nameCol","mfCol", "sheetCol"];   //, "Location"]
var sunHdr = ["#", "Font", "Unicode", "Name", "Contents", "Sheet"];   //, "Location"];

var contClass = ["rowIndex","mfCol", "nameCol", "uniCol"]
var contHdr = ["#","Contents", "Name", "Unicode"]

var pwClass = ["rowIndex","fontIcon", "nameCol", "uniCol", "mfCol"];
var pwHdr = ["#","Font", "Name", "Unicode", "Contents"];

var errClass = ["rowIndex", "uniCol", "nameCol", "mfCol", "mfCol", "nameCol"];
var errHdr = ["#", "Unicode", "Name", "Primary Word Contents", "Sun Dictionary Contents", "Location"];
/*
function replaceAll(string, search, replace) {
	return string.split(search).join(replace);
}
const arrayColumn = (arr, n) => arr.map(x => x[n]);
*/

function createTable(tableId, tableData, hdrList, classList) {
	//document.getElementById(outdiv).innerHTML = "";	// clear previous data
	var table = document.createElement('table');
	console.log('createTable', tableId);

	//const contListColumn = arrayColumn(contList, 2);  // create single column list for searching complex array
	//console.log('contListColumn',contListColumn)
	searchId = tableId;
	table.id = tableId;
	table.className = 'table table-sm table-striped table-hover table-sortable xreftable';
	var thead = document.createElement('THEAD');
	var tr = document.createElement('TR');
	for (var i = 0; i < hdrList.length; i++) {
		var txt = hdrList[i];
		var th = document.createElement("TH");
		th.className = classList[i];
		if (classList[i] == "rowIndex") th.setAttribute('data-sort', 'int');
		else th.setAttribute('data-sort', 'string');
		th.onclick = tablesort;
		th.appendChild(document.createTextNode(txt));
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);
	var cnt = 0;
	var tbody = document.createElement('TBODY');

	console.log('tableData',tableData);
	console.log('contlist',contList)
	for (var i = 0; i < tableData.length; i++) {  // get line data
		var tr = document.createElement('TR');	// row
		tr.className = "";
		var td = document.createElement("TD");
		td.appendChild(document.createTextNode(cnt));  // row number
		td.className = classList[0];
		tr.appendChild(td);
		tr.style.display = "";
		for (var j = 0; j < tableData[i].length; j++) {  // get column data
			var txt = tableData[i][j];
			var td = document.createElement("TD");
			td.className = classList[j+1];
			unicode = "";
			if (classList == sunClass) {
				if (j == 1) {
					unicode = txt;
					let errRow = errList.findIndex((elem)=>elem.includes(unicode));
					let errData = {};
					if (errRow > -1) {  // && cRow > -1 ) {
						errData = {
							Unicode: unicode,
							Name: errList[errRow][1],
							Contents_1: errList[errRow][2],
							Contents_2: errList[errRow][3],
							Location: errList[errRow][4],
							//ContentList: contList[cRow[0]]
						}
						tr.className = "uerror";
						dispModal(tr, errData);
					}		
				} // if j== 1	
			} //if (classList == tblClass) {
			td.innerHTML = txt;
			tr.appendChild(td);
			var td = document.createElement("TD");
		}  // for j loop
		cnt+=1;
		tbody.appendChild(tr);
	}	
	table.appendChild(tbody);
	console.log('Build table');
	return table;
}


function parseJSON(sheetData) {
	compareList = {}	    // compareList[unicode, made_from]
	//duplicateList = [];
	mfList = []
	sunList  = [];
	document.getElementById("sunoutput").innerHTML = "";
	console.log('parseJSON',Object.keys(sheetData));
	//console.log(typeof(sheetData),sheetData);
	let sheets = Object.entries(sheetData);
	let idx = 1;
	
	for (let [key, value] of sheets) {
		//console.log(`${key}`)   // ${value}`);
		//idx = sheets.indexOf(key);
		keyx = key+'('+idx+')';
		idx +=1;
		for (var j=0; j < value.length; j++) {
			row = value[j];
			if (row.length > 0) {
				//get items in row
				let unicode = "";
				let name_mf = "";
				for (var k = 0; k < row.length-1; k+=2) {
					let col_name = XLSX.utils.encode_col(k);
					let row_name = XLSX.utils.encode_row(j);
					let loc = row_name+':'+col_name;
					//console.log(loc,j,k,row[k], row[k+1]);
					if (row[k] && row[k+1]) {
						if (row_name == 1) {
							unicode = row[k+1].toString().trim();
							name_mf = row[k+2].toString().trim();
						} else {
							unicode = row[k].toString().trim();
							name_mf = row[k+1].toString().trim();
						}
						unicodestr = unicode.codePointAt(0).toString(16)
						let name = ""
						let mf = ""

						if (!name_mf.includes('(')) {		
							name = name_mf;			// base symbol
							mf = "";
						} else {
							name = row[k+1].toString().split('(')[0]
							+ row[k+1].toString().split(')')[1]
							
							//name = row[k+1].toString().split('(')[0];
							
							mf = row[k+1].toString().split('(')[1]
							mf = mf.split(')')[0];

							mf = mf.replace(')','').replace(', ',',')
						}

						sunList.push([unicode, unicodestr, name, mf, keyx+':'+loc]);
					}		
				}
			}
		} // for j
	}
}

function createErrorList() {
	pwList;
	errList = [];

	document.getElementById("erroutput").innerHTML = "";	// clear previous data
	console.log('createErrorList')
	for (let i =0; i < pwList.length; i++) {
		//add Contents column
		if (pwList[i].length < 4) pwList[i].push("");
	}
	// merge "Contents" column from comprehensive list with pw list to get Contents field
	for (let i =0; i < sunList.length; i++) {
		let slUnicode = sunList[i][1];
		let row = pwList.findIndex((elem)=>elem.includes(slUnicode));
		//console.log('row',row)

		if (row > -1) {			// if unicode exists in pwList
			//if (pwList[row].length < 4) pwList[row].push(" ");
			//let column = pwList[row].indexOf(slUnicode);
			let pwmf = pwList[row][3].trim().replace(/\s/g, "")   // contents from pwlist
			let slmf = sunList[i][3].trim().replace(/\s/g, "")    // contents from sun document
		
			if (!pwmf.includes(slmf)) {
				//console.log('not include', pwmf.length, pwmf, slmf)
				let  loc =  sunList[i][4]
				if (pwmf.length == 0) pwList[row][3] = slmf

				else {
					pwList[row][3] = pwmf + '<br>'+slmf;
					
					errList.push([pwList[row][2], pwList[row][1], pwmf, slmf, loc])
				}
			} 
			//console.log(pwList[row]);
		} else {
			//altList.push(sunList[i])
		}
	}
	console.log('createErrorList',errList);

	let table = createTable('errSearch', errList, errHdr, errClass);
	document.getElementById("erroutput").appendChild(table);
}
function createContList() {
	// sunList "Font", "Unicode", "Name", "Contents", "Sheet"
	// var contClass = ["rowIndex","mfCol", "nameCol", "uniCol"]
	console.log('createContList');
	contList;
	altList = []
	document.getElementById("contoutput").innerHTML = "";	// clear previous data
	for (let i =0; i < sunList.length; i++) {
		let slUnicode = sunList[i][1];
		let slmf = sunList[i][3].trim().replace(/\s/g, "") 
		let slname = sunList[i][2];
		if (slmf.length == 0) continue;
		// unicode must be in primary list
		let slrow = pwList.findIndex((elem)=>elem.includes(slUnicode));
		if (slrow > -1) {			// if unicode exists in pwlist
			let slmf = sunList[i][3].trim().replace(/\s/g, "") 
			let clrow = altList.findIndex((elem)=>elem.includes(slmf));
			if (clrow > -1) {
				clUnicode = altList[clrow][2]
				if (!clUnicode.includes(slUnicode)) {
					//contList[clrow][2] = contList[clrow][2] +", "+slUnicode;
					altList[clrow][2].push(slUnicode);
					//console.log('push',slUnicode);
				}
			} else {
				altList.push([slmf, slname, [slUnicode]])
				
			}
		}
	}
	console.log(altList);
	contList = []
	// only save if more than one entry
	for (let i =0; i < altList.length; i++) {
		if (altList[i][2].length > 1) {
			contList.push(altList[i])
		}
	}	
	console.log('contlist', contList);
	let table = createTable('contSearch', contList, contHdr, contClass);
	document.getElementById("contoutput").appendChild(table);
}

function sunTable(sunList) {
	console.log('sunTable', errList.length, contList.length);
	if (sunList.length == 0) {
		alert('SUN dictionary has not been loaded');
	} else {
		if (pwList.length > 0) {
			if (errList.length == 0)createErrorList("erroutput");
			if (contList.length == 0)createContList("contoutput");
		}
		document.getElementById("sunoutput").innerHTML = "";
		let table = createTable('sunSearch', sunList, sunHdr, sunClass);
		document.getElementById("sunoutput").appendChild(table);
		searchId = "sunSearch";
		search_Table();
	}
}

function pwTable(pwList) {
	console.log('pwTable', errList.length, contList.length);
	if (pwList.length == 0) {
		alert('Primary Word list has not been loaded');
	} else {
		if (sunList.length > 0) {
			if (errList.length == 0)createErrorList("erroutput");
			if (contList.length == 0)createContList("contoutput");
		}
		document.getElementById("pwoutput").innerHTML = "";
		let table = createTable('pwSearch', pwList, pwHdr, pwClass);
		document.getElementById("pwoutput").appendChild(table);
		searchId = "pwSearch";
		search_Table();

	}
}

// init showerror checkbox
document.getElementById("cbshowerr").checked = false;
// hide entries without error
function showErrors() {
	console.log('showErrors');
	var errIn =  document.getElementById("cbshowerr");
	var table = document.getElementById("sunSearch");
	if (table) {
		var tr = table.getElementsByTagName("tr");
		console.log(tr)
		for (var i = 1; i < tr.length; i++) {
			//let clName = tr[i].className;
			//console.log(i, tr[i], clName);
			if (errIn.checked) {
				if (tr[i].className == 'uerror') {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}
			} else {
				tr[i].style.display = '';
			}
		}
	}
}   
