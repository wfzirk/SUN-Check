// https://github.com/ZulNs/Draggable-Resizable-Dialog
_showDialogButton = document.getElementById('show-dialog');
_statusDialog = document.getElementById('dialog-status');
_modelContent = document.getElementById('modalcontent');

var dialog;
function showDialog(val) {
	if (!dialog) {
		if (val == 'help') var id = 'hdialog';
		else var id = 'dialog';
		// Instanciate the Dialog Box
		dialog = new DialogBox(id, callbackDialog);
	}
	// Show Dialog Box
	dialog.showDialog();

	// Receive result from Dialog Box
	function callbackDialog(btnName) {
		//_showDialogButton.disabled = false;
		//_showDialogButton.focus();
		//if (btnName == 'close')
		//	_statusDialog.textContent = 'Dialog hidden...';
		//else
		//	_statusDialog.textContent = btnName + ' button clicked...';
	}
}

// (https://zulns.github.io/Draggable-Resizable-Dialog/)
const mdlHdr = ["Item", "Value"];	
function dispModal(btn, errData) {
	btn.onclick = function(e) {
		//showDialog();
		console.log(errData);
		let table = document.createElement('table');
		table.id = "mdlTable";
		let thead = document.createElement('THEAD');
		let tr = document.createElement('TR');
		for (var i in mdlHdr) {
			let th = document.createElement("TH");
			th.appendChild(document.createTextNode(mdlHdr[i]));
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		let tbody = document.createElement('TBODY');
			let keys = Object.keys(errData);
			//console.log(keys);
			for (const [key, value] of Object.entries(errData)) {
				//console.log(key, value);


				tr = document.createElement('TR');	// row
				var td = document.createElement("TD");
				td.appendChild(document.createTextNode(key));
				tr.appendChild(td);
				td = document.createElement("TD");
				td.appendChild(document.createTextNode(value));
				tr.appendChild(td);
				tbody.appendChild(tr);	
			}	

		tbody.appendChild(tr);
		table.appendChild(tbody);
		
		//console.log(table.outerHTML);
		_modelContent.innerHTML = table.outerHTML;
		showDialog('');
	}	
}

var hdialog;
function helpDialog() {
	if (!dialog) {
		var id = 'dialog';
		// Instanciate the Dialog Box
		hdialog = new DialogBox(id, callbackDialog);
		hd = document.getElementById('dialog');
		hdtitle = document.getElementById('htitlebar');
		hdtitle.style.width = '800px';
		hdtitle.innerHTML = 'SUN Checking Help';
		//hdtitle.style.color = 'blue';
		//hd.className += ' hdialog';
		//hd.style.color = 'blue';
		hd.style.width = '800px';
		//hd.style.height = '300px';
		//hd.style.left = '10px';
		//btn = document.getElementById('buttonpane');
		//btn.style.width = '800px';
	}
	// Show Dialog Box
	hdialog.showDialog();

	// Receive result from Dialog Box
	function callbackDialog(btnName) {

	}
}

function mdlHelp() {
	console.log(mdlHelp);
	function loadHTML() {
		  fetch('help.html')
			  .then(response => response.text())
			  .then(text => document.getElementById('modalcontent').innerHTML = text);
		}
	//let div = document.createElement('div');
	//div.id = "mdlDiv";
	loadHTML()
	
	//_modelContent.innerHTML = div.outerHTML;
		helpDialog('');
}
